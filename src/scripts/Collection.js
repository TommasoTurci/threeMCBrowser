import { BlockPreview } from './BlockModal.js'
import fallbackBlocks from '../data/blocks.json'

const LS_KEY = 'collection'

export default {
  name: 'ViewCollection',
  components: { BlockPreview },
  data() {
    return {
      collection: [],
      showForm: false,
      editingItem: null,
      form: { full_id: '', display_name: '', notes: '' },
      formErrors: {},
      deleteTarget: null,
      blockDetail: null,
      blockDetailLoading: false,
    }
  },
  watch: {
    editingItem(item) {
      if (item) this.fetchBlockDetail(item.full_id)
      else this.blockDetail = null
    },
  },
  computed: {
    blockForCube() {
      if (!this.editingItem) return null
      return {
        full_id: this.editingItem.full_id,
        display_name: this.editingItem.display_name,
        primary_color: '#888888',
        light_emission: this.editingItem.light_emission ?? 0,
        is_transparent: this.editingItem.is_transparent ?? false,
      }
    },
  },
  mounted() { this.loadCollection() },
  methods: {
    loadCollection() {
      try {
        const raw = localStorage.getItem(LS_KEY)
        this.collection = raw
          ? JSON.parse(raw)
          : fallbackBlocks.map((b, i) => ({ ...b, id: Date.now() + i, notes: '' }))
        if (!raw) this.persist()
      } catch (_) { this.collection = [] }
    },

    persist() { localStorage.setItem(LS_KEY, JSON.stringify(this.collection)) },

    openAddModal() {
      this.editingItem = null
      this.form = { full_id: '', display_name: '', notes: '' }
      this.formErrors = {}
      this.showForm = true
    },

    openEditModal(item) {
      this.editingItem = item
      this.form = { full_id: item.full_id, display_name: item.display_name, notes: item.notes || '' }
      this.formErrors = {}
      this.showForm = true
    },

    async fetchBlockDetail(fullId) {
      this.blockDetail = null
      this.blockDetailLoading = true
      try {
        const res = await fetch(`https://blocksitems.com/api/v1/blocks/${encodeURIComponent(fullId)}`)
        if (res.ok) this.blockDetail = (await res.json()).data
      } catch (_) { }
      this.blockDetailLoading = false
    },

    saveItem() {
      if (!this.validate()) return
      if (this.editingItem) {
        const idx = this.collection.findIndex(b => b.id === this.editingItem.id)
        if (idx !== -1) this.collection[idx] = { ...this.collection[idx], display_name: this.form.display_name, notes: this.form.notes }
      } else {
        this.collection.push({
          id: Date.now(), full_id: this.form.full_id, display_name: this.form.display_name,
          notes: this.form.notes, primary_color: this.form.primary_color,
          light_emission: 0, is_transparent: false, destroy_speed: null,
        })
      }
      this.persist()
      this.closeForm()
    },

    confirmDelete(item) {
      this.deleteTarget = item
      this.closeForm()
    },
    deleteItem() {
      this.collection = this.collection.filter(b => b.id !== this.deleteTarget.id)
      this.persist()
      this.deleteTarget = null
    },

    validate() {
      const errors = {}
      if (!this.form.full_id) errors.full_id = 'L\'id del blocco è obbligatorio'
      if (!this.form.display_name) errors.display_name = 'Il nome è obbligatorio'
      this.formErrors = errors
      return !Object.keys(errors).length
    },

    closeForm() {
      this.showForm = false
      this.editingItem = null
      this.formErrors = {}
    },
  },
}