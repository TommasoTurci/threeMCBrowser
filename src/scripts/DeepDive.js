import * as THREE from 'three'

export default {
  name: 'ViewDeepDive',
  mounted() {
    this.$nextTick(() => this.initDemos())
  },
  beforeUnmount() {
    this._cleanups?.forEach(fn => fn())
  },
  methods: {
    initDemos() {
      this._cleanups = []

      {
        const canvas = this.$el.querySelector('canvas[scena="0"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshBasicMaterial({ color: 0x5decf5, wireframe: true })
          )
          scene.add(mesh)

          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            mesh.rotation.y += 0.005
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }

      {
        const canvas = this.$el.querySelector('canvas[scena="1"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          scene.add(new THREE.AmbientLight(0xffffff, 0.5))
          const dl = new THREE.DirectionalLight(0xffffff, 1)
          dl.position.set(3, 5, 3)
          scene.add(dl)

          scene.add(new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x5decf5 })
          ))

          let t = 0
          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            t += 0.015
            camera.position.set(Math.sin(t) * 3, 0.8, Math.cos(t) * 3)
            camera.lookAt(0, 0, 0)
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }

      {
        const canvas = this.$el.querySelector('canvas[scena="2"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          scene.add(new THREE.AmbientLight(0xffffff, 0.5))
          const dl = new THREE.DirectionalLight(0xffffff, 1)
          dl.position.set(3, 5, 3)
          scene.add(dl)

          const geos = [
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.SphereGeometry(0.65, 16, 16),
            new THREE.ConeGeometry(0.65, 1.3, 16),
            new THREE.CylinderGeometry(0.4, 0.4, 1.2, 16),
            new THREE.TorusGeometry(0.5, 0.2, 12, 24),
          ]
          let gi = 0
          const mesh = new THREE.Mesh(geos[0], new THREE.MeshPhongMaterial({ color: 0x5decf5 }))
          scene.add(mesh)

          const iv = setInterval(() => {
            gi = (gi + 1) % geos.length
            mesh.geometry = geos[gi]
          }, 1500)

          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            mesh.rotation.y += 0.01
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            clearInterval(iv)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }

      {
        const canvas = this.$el.querySelector('canvas[scena="3"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          scene.add(new THREE.AmbientLight(0xffffff, 0.4))
          const dl = new THREE.DirectionalLight(0xffffff, 1.2)
          dl.position.set(3, 5, 3)
          scene.add(dl)

          const mats = [
            new THREE.MeshBasicMaterial({ color: 0x5decf5 }),
            new THREE.MeshLambertMaterial({ color: 0x5decf5 }),
            new THREE.MeshPhongMaterial({ color: 0x5decf5, shininess: 120 }),
            new THREE.MeshStandardMaterial({ color: 0x5decf5, roughness: 0.2, metalness: 0.6 }),
            new THREE.MeshToonMaterial({ color: 0x5decf5 }),
          ]
          let mi = 0
          const mesh = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), mats[0])
          scene.add(mesh)

          const iv = setInterval(() => {
            mi = (mi + 1) % mats.length
            mesh.material = mats[mi]
          }, 1500)

          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            mesh.rotation.y += 0.008
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            clearInterval(iv)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }

      {
        const canvas = this.$el.querySelector('canvas[scena="4"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          scene.add(new THREE.AmbientLight(0xffffff, 0.05))
          scene.add(new THREE.Mesh(
            new THREE.SphereGeometry(0.7, 32, 32),
            new THREE.MeshPhongMaterial({ color: 0xccccdd })
          ))

          const light = new THREE.PointLight(0x5decf5, 5, 10)
          scene.add(light)

          let t = 0
          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            t += 0.025
            light.position.set(Math.sin(t) * 2.2, Math.sin(t * 0.7), Math.cos(t) * 2.2)
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }

      {
        const canvas = this.$el.querySelector('canvas[scena="5"]')
        if (canvas) {
          const w = canvas.offsetWidth || 300
          const h = w
          canvas.width = w
          canvas.height = h

          const scene = new THREE.Scene()
          scene.background = new THREE.Color(0x0f0f1a)

          const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100)
          camera.position.set(0, 0, 3)
          camera.lookAt(0, 0, 0)

          const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
          renderer.setSize(w, h)

          scene.add(new THREE.AmbientLight(0xffffff, 0.4))
          const dl = new THREE.DirectionalLight(0xffffff, 1)
          dl.position.set(3, 5, 3)
          scene.add(dl)

          const mesh = new THREE.Mesh(
            new THREE.BoxGeometry(1, 1, 1),
            new THREE.MeshPhongMaterial({ color: 0x5decf5 })
          )
          scene.add(mesh)

          let speed = 0.005
          let growing = true
          let id
          const loop = () => {
            id = requestAnimationFrame(loop)
            speed += growing ? 0.0003 : -0.0003
            if (speed > 0.06) growing = false
            if (speed < 0.003) growing = true
            mesh.rotation.y += speed
            mesh.rotation.x += speed * 0.4
            renderer.render(scene, camera)
          }
          loop()

          this._cleanups.push(() => {
            cancelAnimationFrame(id)
            renderer.forceContextLoss()
            renderer.dispose()
          })
        }
      }
    },
  },
}