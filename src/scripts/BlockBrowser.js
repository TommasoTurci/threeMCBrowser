import BlockModal from '../views/BlockModal.vue'
import fallbackBlocks from '../data/blocks.json'

const LS_PREFIX = 'blocks_cache_'
const LS_MODS = 'blocks_modlist'
const LS_COLLECTION = 'collection'
const API_BASE = 'https://blocksitems.com/api/v1'

export default {
  name: 'ViewBlockBrowser',
  components: { BlockModal },
  data() {
    return {
      activeMod: 'minecraft',
      blocks: [],
      modList: [],
      searchQuery: '',
      loading: false,
      error: null,
      selectedBlock: null,
    }
  },
  computed: {
    filteredBlocks() {
      const q = this.searchQuery.trim().toLowerCase()
      if (!q) return this.blocks
      return this.blocks.filter(b =>
        b.display_name.toLowerCase().includes(q) ||
        b.full_id.toLowerCase().includes(q)
      )
    },
  },
  async mounted() {
    await this.loadModList()
    await this.loadMod()
  },
  methods: {
    readStoredJson(key, fallback = null) {
      const raw = localStorage.getItem(key)
      if (!raw) return fallback

      try {
        return JSON.parse(raw)
      } catch (_) {
        return fallback
      }
    },

    async fetchJson(url) {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res.json()
    },

    getDataList(json) {
      return Array.isArray(json?.data) ? json.data : []
    },

    async fetchBlockPage(page) {
      try {
        const json = await this.fetchJson(
          `${API_BASE}/blocks/by-mod/${encodeURIComponent(this.activeMod)}?limit=100&page=${page}`
        )
        return this.getDataList(json)
      } catch (_) {
        return []
      }
    },

    async loadModList() {
      const cachedMods = this.readStoredJson(LS_MODS, [])
      if (cachedMods.length) {
        this.modList = cachedMods.filter(mod => mod.block_count > 0)
        return
      }

      try {
        const json = await this.fetchJson(`${API_BASE}/mods?limit=100`)
        const mods = this.getDataList(json).filter(mod => mod.block_count > 0 && mod.mod_id !== 'minecraft')
        this.modList = mods
        localStorage.setItem(LS_MODS, JSON.stringify(mods))
      } catch (_) { }
    },


    async loadMod() {
      const cacheKey = LS_PREFIX + this.activeMod
      const cachedBlocks = this.readStoredJson(cacheKey, [])

      if (cachedBlocks.length) {
        this.blocks = cachedBlocks
        this.error = null
        return
      }

      await this.fetchAllPages(cacheKey)
    },

    async forceRefresh() {
      localStorage.removeItem(LS_PREFIX + this.activeMod)
      await this.fetchAllPages(LS_PREFIX + this.activeMod)
    },

    async fetchAllPages(cacheKey) {
      this.loading = true
      this.error = null
      this.blocks = []

      try {
        const firstJson = await this.fetchJson(
          `${API_BASE}/blocks/by-mod/${encodeURIComponent(this.activeMod)}?limit=100&page=1`
        )
        const totalPages = firstJson.pages || 1
        let all = this.getDataList(firstJson)

        const BATCH = 5
        for (let p = 2; p <= totalPages; p += BATCH) {
          const batch = []

          for (let i = p; i < p + BATCH && i <= totalPages; i++) {
            batch.push(this.fetchBlockPage(i))
          }

          const results = await Promise.all(batch)
          all = all.concat(results.flat())
          this.blocks = all
        }

        const seen = new Set()
        const clean = all.filter(b => {
          if (!b.full_id || seen.has(b.full_id)) return false
          seen.add(b.full_id)
          return !!b.icon_hash
        })

        this.blocks = clean
        localStorage.setItem(cacheKey, JSON.stringify(clean))
      } catch (err) {
        this.blocks = fallbackBlocks
        this.error = `API error: ${err.message}. Showing local fallback data.`
      } finally {
        this.loading = false
      }
    },

    isInCollection(fullId) {
      const collection = this.readStoredJson(LS_COLLECTION, [])
      return collection.some(item => item.full_id === fullId)
    },
  },
}