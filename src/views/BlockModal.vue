<template>
  <div v-if="show" class="modal-backdrop" @click.self="$emit('close')" @keydown.esc="$emit('close')">
    <div class="modal-box modal-lg p-4">
      <button class="btn-close btn-close-white float-end" @click="$emit('close')"></button>

      <h2 class="h5 text-info mb-4">{{ block?.display_name }}</h2>

      <div class="row g-3">
        <div class="col-md-5 d-flex flex-column align-items-center justify-content-center">
          <h3 class="h6 text-info mb-3">Anteprima 3D</h3>
          <div class="threejs-canvas-wrapper">
            <BlockPreview v-if="block" :block="block" :size="200" />
          </div>
        </div>

        <div class="col-md-7">
          <div class="d-flex align-items-center gap-2 mb-3">
            <img
              :src="`https://blocksitems.com/api/v1/blocks/${block?.full_id}/icon?size=64`"
              :alt="`Icon of ${block?.display_name}`"
              width="40"
              height="40"
              style="image-rendering: pixelated;"
            />
            <code class=" small">{{ block?.full_id }}</code>
          </div>

          <div v-if="loading" class=" py-3 small">Attendere...</div>

          <dl v-else class="row row-cols-2 g-2 mb-3 small">
            <div class="col stat-badge">
              <dt class=" mb-0">Durezza</dt>
              <dd class="mb-0 fw-bold">{{ detail?.destroy_speed ?? block?.destroy_speed ?? '?' }}</dd>
            </div>
            <div class="col stat-badge">
              <dt class=" mb-0">Resistenza alle esplosioni</dt>
              <dd class="mb-0 fw-bold">{{ detail?.explosion_resistance ?? '?' }}</dd>
            </div>
            <div class="col stat-badge">
              <dt class=" mb-0">Emissione luminosa</dt>
              <dd class="mb-0 fw-bold">{{ block?.light_emission ?? 0 }} / 15</dd>
            </div>
            <div class="col stat-badge">
              <dt class=" mb-0">Trasparente</dt>
              <dd class="mb-0 fw-bold">{{ block?.is_transparent ? 'Sì' : 'No' }}</dd>
            </div>
            <div class="col stat-badge">
              <dt class=" mb-0">Collisione</dt>
              <dd class="mb-0 fw-bold">{{ block?.has_collision !== false ? 'Sì' : 'No' }}</dd>
            </div>
            <div class="col stat-badge">
              <dt class=" mb-0">Richiede strumento</dt>
              <dd class="mb-0 fw-bold">{{ detail?.requires_correct_tool ? 'Sì' : 'No' }}</dd>
            </div>
          </dl>

          <div class="mt-4">
            <button v-if="!addedToCollection" class="btn btn-info btn-sm w-100" @click="addToCollection"
              :disabled="addingToCollection">
              {{ addingToCollection ? 'Attendere...' : '+ Aggiungi alla Collezione' }}
            </button>
            <p v-else class="text-success small mb-0">Aggiunto alla collezione!</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="../scripts/BlockModal.js"></script>