<template>
  <div>
    <header class="hero-section page-hero-center">
      <div class="container">
        <h1 class="display-4 fw-bold text-white mb-3">Three.js</h1>
        <p class="lead text-light hero-subtitle">
          Una libreria JavaScript per il rendering di grafica 3D nel browser tramite WebGL.
        </p>
      </div>
    </header>

    <div class="container page-content-lg">

      <section aria-labelledby="what-is" class="section-block">
        <h2 id="what-is" class="section-title">Cos'è Three.js?</h2>
        <div class="row g-4">
          <div class="col-12 col-md-7">
            <p>
              Three.js è una libreria JavaScript open-source che rende
              la grafica 3D nel browser accessibile a qualsiasi sviluppatore web.
              Si basa su WebGL, l'API di basso livello del browser per il rendering
              accelerato dalla GPU e ne astrae la complessità.
            </p>
            <p>
              Prima di Three.js, creare un semplice cubo rotante su una pagina web richiedeva centinaia di righe di
              codice WebGL, anche per chi necessitava di render basilari.
              Con Three.js, lo stesso risultato si ottiene in meno di 20 righe. La libreria offre un'infrastruttura
              completa per gestire il 3D, inclusi la scena,
              la fotocamera, l'illuminazione, le geometrie, i materiali e il loop di animazione.
            </p>
          </div>
          <div class="col-12 col-md-5">
            <div class="card-box p-4">
              <h3 class="h6  mb-3">Informazioni</h3>
              <ul class="list-unstyled mb-0 small">
                <li class="mb-2"><span class="text-white">Prima versione:</span> aprile 2010</li>
                <li class="mb-2"><span class="text-white">Autore:</span> Ricardo Cabello (mr.doob)</li>
                <li class="mb-2"><span class="text-white">Renderer:</span> WebGL 1 &amp; 2, WebGPU (sperimentale)</li>
                <li class="mb-2"><span class="text-white">Pacchetto:</span> <code>npm install three</code></li>
                <li><span class="text-white">Licenza:</span> MIT</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="webgl" class="section-block">
        <h2 id="webgl" class="section-title">Perché non usare WebGL direttamente?</h2>
        <div class="row g-3">
          <div class="col-12 col-md-4">
            <article class="simple-card h-100">
              <h3 class="h6 text-warning mb-2">WebGL diretto</h3>
              <p class="small mb-0 ">
                Richiede di scrivere manualmente shader GLSL, gestire buffer, calcolare matrici
                e configurare ogni stato della GPU a mano. Un semplice triangolo rotante
                richiede circa 100 righe di codice ripetitivo.
              </p>
            </article>
          </div>
          <div class="col-12 col-md-4">
            <article class="card-box h-100 highlight-card">
              <h3 class="h6 text-info mb-2">Three.js</h3>
              <p class="small mb-0 ">
                Astrae tutta la complessità. Si descrive cosa si vuole: un cubo con un
                materiale blu sotto una luce direzionale e Three.js gestisce le chiamate GPU.
              </p>
            </article>
          </div>
          <div class="col-12 col-md-4">
            <article class="card-box p-3 h-100">
              <h3 class="h6 text-success mb-2">Il risultato</h3>
              <p class="small mb-0 ">
                Sviluppo più rapido, codice meno soggetto a errori, una vasta comunità di esempi
                e accesso diretto a WebGL quando necessario.
              </p>
            </article>
          </div>
        </div>
      </section>

      <div class="text-center pt-3">
        <router-link to="/deep-dive" class="btn btn-info btn-lg px-5">
          Concetti Base
        </router-link>
      </div>

    </div>
  </div>
</template>