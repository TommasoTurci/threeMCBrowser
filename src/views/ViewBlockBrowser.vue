<template>
  <div>
    <header class="hero-section page-hero">
      <div class="container">
        <div class="page-header-row with-margin">
          <h1 class="page-title push-right">Sfoglia blocchi</h1>
          <label for="mod-select" class="sr-only">Seleziona un mod</label>
          <select id="mod-select" class="form-select form-select-sm input-dark mod-select" v-model="activeMod" @change="loadMod"
            :disabled="loading">
            <option value="minecraft">Minecraft (Vanilla)</option>
            <option v-for="mod in modList" :key="mod.mod_id" :value="mod.mod_id">
              {{ mod.name }}
            </option>
          </select>
          <button class="btn btn-outline-secondary btn-sm" @click="forceRefresh" :disabled="loading">Ricarica</button>
        </div>
        <label for="search-query" class="sr-only">Cerca blocchi</label>
        <input id="search-query" v-model="searchQuery" type="search" class="form-control input-dark search-input" placeholder="Cerca..."
          :disabled="loading" />
      </div>
    </header>

    <div class="container page-content">

      <div v-if="loading" class="loading-text">
        Caricamento blocchi...
      </div>

      <template v-else>

        <div v-if="filteredBlocks.length" class="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-3">
          <div class="col" v-for="block in filteredBlocks" :key="block.full_id">
            <button class="block-card block-tile" @click="selectedBlock = block">

              <span v-if="isInCollection(block.full_id)" class="badge bg-success position-absolute in-collection-badge">
                ✓
              </span>

              <img :src="`https://blocksitems.com/api/v1/blocks/${block.full_id}/icon?size=64`"
                :alt="`${block.display_name} icon`" width="48" height="48" loading="lazy" class="pixel-icon" />
              <p class="block-name">
                {{ block.display_name }}
              </p>
            </button>
          </div>
        </div>

        <div v-else-if="!error" class="text-center py-5 ">
          Nessun blocco trovato sotto il nome "<strong class="text-white">{{ searchQuery }}</strong>"
        </div>

      </template>

    </div>

    <BlockModal :show="!!selectedBlock" :block="selectedBlock" @close="selectedBlock = null"
      @block-added-to-collection="selectedBlock = { ...selectedBlock }" />
  </div>
</template>

<script src='../scripts/BlockBrowser.js'></script>
