<template>
  <div>
    <header class="hero-section page-hero">
      <div class="container page-header-row">
        <h1 class="page-title push-right">La mia collezione</h1>
        <button class="btn btn-info btn-sm" @click="openAddModal">+ Aggiungi blocco</button>
      </div>
    </header>

    <div class="container page-content">

      <p v-if="!collection.length"></p>

      <div v-else class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-4">
        <div class="col" v-for="item in collection" :key="item.id">
          <article class="block-card p-3 h-100" @click="openEditModal(item)">
            <div class="d-flex align-items-center gap-3 mb-3">
              <img :src="`https://blocksitems.com/api/v1/blocks/${item.full_id}/icon?size=64`"
                :alt="`${item.display_name} icon`" width="48" height="48" class="pixel-icon" loading="lazy" />
              <div class="overflow-hidden">
                <p class="text-white mb-0 text-truncate fw-bold">{{ item.display_name }}</p>
                <code class=" small">{{ item.full_id }}</code>
              </div>
            </div>

            <p v-if="item.notes" class="small  mb-3">{{ item.notes }}</p>

            <div class="d-flex flex-wrap gap-2 mb-3">
              <span class="stat-badge">Durezza: {{ item.destroy_speed ?? '?' }}</span>
              <span class="stat-badge">Emissione di luce: {{ item.light_emission ?? 0 }}</span>
              <span class="stat-badge" v-if="item.is_transparent">Trasparente</span>
            </div>

            <button class="btn btn-outline-danger btn-sm w-100" @click.stop="confirmDelete(item)">Rimuovi</button>
          </article>
        </div>
      </div>
    </div>

    <div v-if="showForm" class="modal-backdrop" @click.self="closeForm" @keydown.esc="closeForm">
      <div class="modal-box modal-lg p-4">
        <button class="btn-close btn-close-white float-end" @click="closeForm"></button>

        <h2 class="h5 text-info mb-4">{{ editingItem ? 'Modifica blocco' : 'Aggiungi blocco' }}</h2>

        <div class="row g-3">
          <div v-if="editingItem" class="col-md-5 d-flex flex-column align-items-center justify-content-center">
            <div class="threejs-canvas-wrapper">
              <BlockPreview :block="blockForCube" :size="200" />
            </div>
          </div>

          <div :class="editingItem ? 'col-md-7' : 'col-12'">
            <form @submit.prevent="saveItem">
              <div class="mb-3">
                <label for="form-full-id" class="form-label  small">ID Blocco:</label>
                <input id="form-full-id" v-if="!editingItem" v-model.trim="form.full_id" type="text" class="form-control input-dark"
                  :class="{ 'is-invalid': formErrors.full_id }" placeholder="e.g. minecraft:stone" />
                <div v-else class="d-flex align-items-center gap-2">
                  <img :src="`https://blocksitems.com/api/v1/blocks/${form.full_id}/icon?size=64`"
                    :alt="`${form.display_name} icon`" width="40" height="40" class="pixel-icon" />
                  <code class=" small">{{ form.full_id }}</code>
                </div>
                <div v-if="formErrors.full_id" class="invalid-feedback">{{ formErrors.full_id }}</div>
              </div>

              <div class="mb-3">
                <label for="form-display-name" class="form-label  small">Nome</label>
                <input id="form-display-name" v-model.trim="form.display_name" type="text" class="form-control input-dark"
                  :class="{ 'is-invalid': formErrors.display_name }" placeholder="e.g. Stone" />
                <div v-if="formErrors.display_name" class="invalid-feedback">{{ formErrors.display_name }}</div>
              </div>

              <div class="mb-3">
                <label for="form-notes" class="form-label  small">Appunti</label>
                <textarea id="form-notes" v-model.trim="form.notes" class="form-control input-dark" rows="2"
                  placeholder="Perché ti piace questo blocco?"></textarea>
              </div>

              <div v-if="editingItem" class="mb-3">
                <div v-if="blockDetailLoading" class=" small">Caricamento...</div>
                <dl v-else class="row row-cols-2 g-2 mb-0 small">
                  <div class="col stat-badge">
                    <dt class=" mb-0">Durezza</dt>
                    <dd class="mb-0 fw-bold">{{ blockDetail?.destroy_speed ?? editingItem?.destroy_speed ?? '?' }}</dd>
                  </div>
                  <div class="col stat-badge">
                    <dt class=" mb-0">Resistenza alle esplosioni</dt>
                    <dd class="mb-0 fw-bold">{{ blockDetail?.explosion_resistance ?? '?' }}</dd>
                  </div>
                  <div class="col stat-badge">
                    <dt class=" mb-0">Emissione di luce</dt>
                    <dd class="mb-0 fw-bold">{{ editingItem?.light_emission ?? 0 }} / 15</dd>
                  </div>
                  <div class="col stat-badge">
                    <dt class=" mb-0">Trasparente</dt>
                    <dd class="mb-0 fw-bold">{{ editingItem?.is_transparent ? 'Yes' : 'No' }}</dd>
                  </div>
                  <div class="col stat-badge">
                    <dt class=" mb-0">Collisione</dt>
                    <dd class="mb-0 fw-bold">{{ editingItem?.has_collision !== false ? 'Yes' : 'No' }}</dd>
                  </div>
                  <div class="col stat-badge">
                    <dt class=" mb-0">Richiede uno strumento</dt>
                    <dd class="mb-0 fw-bold">{{ blockDetail?.requires_correct_tool ? 'Yes' : 'No' }}</dd>
                  </div>
                </dl>
              </div>

              <div class="d-flex gap-2 mt-3">
                <button type="submit" class="btn btn-info flex-grow-1">{{ editingItem ? 'Salva' : 'Aggiungi' }}</button>
                <button type="button" class="btn btn-outline-secondary" @click="closeForm">Annulla</button>
                <button v-if="editingItem" type="button" class="btn btn-outline-danger"
                  @click="confirmDelete(editingItem)">Elimina</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="deleteTarget" class="modal-backdrop" @keydown.esc="deleteTarget = null">
      <div class="modal-box modal-sm p-4 text-center">
        <button class="btn-close btn-close-white float-end" @click="deleteTarget = null"></button>

        <h2 class="h5 text-danger mb-4">Eliminare "{{ deleteTarget.display_name }}"?</h2>
        <div class="d-flex gap-3 justify-content-center">
          <button class="btn btn-danger px-4" @click="deleteItem">Elimina</button>
          <button class="btn btn-outline-secondary px-4" @click="deleteTarget = null">Annulla</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script src='../scripts/Collection.js'></script>