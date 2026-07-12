import * as THREE from 'three'
import { h } from 'vue'

const LS_COLLECTION = 'collection'
const MC_ASSETS = 'https://raw.githubusercontent.com/InventivetalentDev/minecraft-assets/1.21.1/assets'
const API_BASE = 'https://blocksitems.com/api/v1'

export const BlockPreview = {
  name: 'BlockPreview',
  props: {
    block: { type: Object, required: true },
    size: { type: Number, default: 280 },
  },
  render() {
    return h('canvas', {
      ref: 'canvasRef',
      width: this.size,
      height: this.size,
      'aria-label': `3D render of ${this.block.display_name}`,
      style: 'display:block; margin:0 auto;',
    })
  },
  data() {
    return { renderer: null, animFrameId: null }
  },
  mounted() {
    this.initScene()
  },
  beforeUnmount() {
    cancelAnimationFrame(this.animFrameId)
    this.renderer?.dispose()
  },
  watch: {
    block() {
      cancelAnimationFrame(this.animFrameId)
      this.renderer?.dispose()
      this.initScene()
    },
  },
  methods: {
    async initScene() {
      const canvas = this.$refs.canvasRef
      if (!canvas) return

      const scene = new THREE.Scene()
      scene.background = new THREE.Color(0x0f0f1a)

      const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
      camera.position.set(1.8, 1.4, 1.8)
      camera.lookAt(0, 0, 0)

      this.renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
      this.renderer.setSize(this.size, this.size)
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

      const light = new THREE.PointLight(0xffffff, 2)
      const ambient = new THREE.AmbientLight(0xffffff, 0.5)
      light.position.set(0, 1.5, 0)
      scene.add(light)
      scene.add(ambient)

      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(1, 1, 1),
        await this.buildTexturedMaterials()
      )
      scene.add(mesh)

      const animate = () => {
        this.animFrameId = requestAnimationFrame(animate)
        mesh.rotation.y += 0.001
        mesh.rotation.x += 0.001
        this.renderer.render(scene, camera)
      }
      animate()
    },

    async buildTexturedMaterials() {
      let textures = null
      let parent = ''

      try {
        const res = await fetch(`${API_BASE}/blocks/${encodeURIComponent(this.block.full_id)}/model`)
        if (res.ok) {
          const modelData = (await res.json()).data?.model_data
          textures = modelData?.textures || null
          parent = (modelData?.parent || '').replace('minecraft:', '')
        }
      } catch (_) { }

      const loader = new THREE.TextureLoader()
      loader.crossOrigin = 'anonymous'

      const loadTex = (texPath) => new Promise(resolve => {
        if (!texPath) return resolve(null)
        const url = this.texPathToUrl(texPath)
        loader.load(url, texture => {
          texture.magFilter = THREE.NearestFilter
          texture.minFilter = THREE.NearestFilter
          resolve(texture)
        }, undefined, () => resolve(null))
      })

      const fallback = new THREE.Color(this.block.primary_color || '#888888')
      const transparent = !!this.block.is_transparent

      const makeMaterial = async (texPath) => {
        const mat = new THREE.MeshPhongMaterial({ transparent, opacity: transparent ? 0.7 : 1.0 })
        const texture = await loadTex(texPath)
        if (texture) mat.map = texture
        else mat.color = fallback
        return mat
      }

      let faces
      if (!textures) {
        faces = Array(6).fill(null)
      } else if (parent.includes('cube_all')) {
        const t = textures.all
        faces = [t, t, t, t, t, t]
      } else if (parent.includes('cube_column')) {
        const end = textures.end
        const side = textures.side
        faces = [side, side, end, end, side, side]
      } else if (parent.includes('orientable')) {
        const top = textures.top
        const front = textures.front
        const side = textures.side || textures.all
        faces = [side, side, top, side, front, side]
      } else {
        const all = textures.all || textures.particle || Object.values(textures)[0]
        faces = [
          textures.east || all,
          textures.west || all,
          textures.up || textures.top || all,
          textures.down || textures.bottom || all,
          textures.south || all,
          textures.north || all,
        ]
      }

      return Promise.all(faces.map(texture => makeMaterial(texture)))
    },

    texPathToUrl(texPath) {
      if (!texPath) return null
      const [namespace, ...rest] = texPath.split(':')
      const path = rest.length ? rest.join(':') : namespace
      const ns = rest.length ? namespace : 'minecraft'
      return `${MC_ASSETS}/${ns}/textures/${path}.png`
    },
  },
}

export default {
  name: 'BlockModal',
  components: { BlockPreview },
  props: {
    show: { type: Boolean, default: false },
    block: { type: Object, default: null },
  },
  emits: ['close', 'block-added-to-collection'],
  data() {
    return {
      detail: null,
      loading: false,
      addedToCollection: false,
      addingToCollection: false,
    }
  },
  watch: {
    block(newBlock) {
      if (newBlock) {
        this.fetchDetail(newBlock.full_id)
        this.updateCollectionStatus()
      }
    },
    show(isOpen) {
      if (!isOpen) {
        this.addedToCollection = false
      }
    },
  },
  methods: {
    async fetchDetail(fullId) {
      this.detail = null
      this.loading = true
      try {
        const res = await fetch(`https://blocksitems.com/api/v1/blocks/${encodeURIComponent(fullId)}`)
        if (res.ok) {
          const json = await res.json()
          this.detail = json.data
        }
      } catch (error) {
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    updateCollectionStatus() {
      if (!this.block) {
        this.addedToCollection = false
        return
      }
      try {
        const collection = JSON.parse(localStorage.getItem(LS_COLLECTION) || '[]')
        this.addedToCollection = collection.some(item => item.full_id === this.block.full_id)
      } catch (_) {
        this.addedToCollection = false
      }
    },

    async addToCollection() {
      if (!this.block) return
      this.addingToCollection = true
      try {
        const collection = JSON.parse(localStorage.getItem(LS_COLLECTION) || '[]')

        if (collection.some(item => item.full_id === this.block.full_id)) {
          this.addedToCollection = true
          this.addingToCollection = false
          return
        }

        const newItem = {
          id: Math.random().toString(36).substr(2, 9),
          full_id: this.block.full_id,
          display_name: this.block.display_name,
          nickname: '',
          notes: '',
          primary_color: this.block.primary_color || '#888888',
          destroy_speed: this.detail?.destroy_speed ?? this.block.destroy_speed,
          light_emission: this.block.light_emission ?? 0,
          is_transparent: this.block.is_transparent ?? false,
          has_collision: this.block.has_collision !== false,
        }

        collection.push(newItem)
        localStorage.setItem(LS_COLLECTION, JSON.stringify(collection))

        this.addedToCollection = true
        this.$emit('block-added-to-collection', newItem)
      } catch (err) {
        console.error('Errore aggiungendo il blocco:', err)
      } finally {
        this.addingToCollection = false
      }
    },
  },
}