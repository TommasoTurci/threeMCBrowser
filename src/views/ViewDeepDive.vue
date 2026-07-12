<template>
  <div>
    <header class="hero-section page-hero-center">
      <div class="container">
        <h1 class="display-5 fw-bold text-white mb-3">Come funziona Three.js</h1>
      </div>
    </header>

    <div class="container page-content-lg">

      <section class="section-block">
        <h2 class="section-title">Cos'è Three.js</h2>
        <div class="row g-4 align-items-start">
          <div class="col-md-7">
            <p class="">
              Three.js è una libreria JavaScript open source che semplifica la creazione di grafica <strong
                class="text-white">3D</strong> nel
              browser sfruttando WebGL (e più recentemente WebGPU). Invece di
              lavorare
              direttamente con le API molto complesse di WebGL, Three.js offre un'interfaccia ad alto livello che
              permette
              di concentrarsi sulla costruzione della scena.
            </p>
            <p class=" mb-0">
              In pratica, Three.js è alla grafica 3D ciò che React è al DOM: un livello di astrazione che rende lo
              sviluppo
              molto più produttivo.
            </p>
          </div>
          <div class="col-md-5">
            <div class="card-box p-3">
              <p class="small text-info fw-bold mb-2">Il ciclo di rendering</p>
              <div class="d-flex flex-wrap align-items-center gap-1">
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Scena</span>
                </div>
                <span class="text-info small">→</span>
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Camera</span>
                </div>
                <span class="text-info small">→</span>
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Luci</span>
                </div>
                <span class="text-info small">→</span>
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Mesh</span>
                </div>
                <span class="text-info small">→</span>
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Renderer</span>
                </div>
                <span class="text-info small">→</span>
                <div class="card-box p-2 text-center small" style="min-width:72px; border-color:var(--border-input)">
                  <span class="text-white">Canvas</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-scena">
        <h2 id="sec-scena" class="section-title">La Scena</h2>
        <div class="row g-4 align-items-center">
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="0" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">Un cubo wireframe in una scena Three.js</p>
            </div>
          </div>
          <div class="col-md-7">
            <p class="">
              La <code class="text-info">Scene</code> è il contenitore che raccoglie tutto: mesh, luci, fotocamere e
              helper.
              Tutti gli oggetti sono organizzati in un Scene Graph ad albero, dove
              ogni nodo ha posizione, rotazione e scala, e le trasformazioni si propagano automaticamente ai figli.
            </p>
            <pre class="code-block rounded p-3 small code-pre">const scene = new THREE.Scene()
        scene.background = new THREE.Color(0x111122)</pre>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-camera">
        <h2 id="sec-camera" class="section-title">La Camera</h2>
        <div class="row g-4 align-items-center">
          <div class="col-md-7">
            <p class="">
              La camera rappresenta il punto di vista. La più usata è <code class="text-info">PerspectiveCamera</code>:
              simula l'occhio umano, gli oggetti lontani appaiono più piccoli.
              <code class="text-info">OrthographicCamera</code> mantiene invece la stessa dimensione indipendentemente
              dalla distanza, ideale per CAD, mappe e giochi isometrici.
            </p>
            <pre class="code-block rounded p-3 small code-pre">const cam = new THREE.PerspectiveCamera(
        75,
        w / h,
        0.1,
        1000
        )</pre>
          </div>
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="1" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">La camera orbita attorno a un cubo fisso</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-geo">
        <h2 id="sec-geo" class="section-title">Geometry</h2>
        <div class="row g-4 align-items-start">
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="2" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">Le geometrie predefinite si alternano ogni 1,5 s</p>
            </div>
          </div>
          <div class="col-md-7">
            <p class="">
              La geometria definisce la forma tramite vertici, normali, coordinate UV e triangoli.
              Internamente la GPU lavora quasi esclusivamente con triangoli.
              Three.js include dozzine di geometrie predefinite.
            </p>
            <pre class="code-block rounded p-3 small code-pre">const geo = new THREE.BoxGeometry(1, 1, 1)</pre>
            <pre class="code-block rounded p-3 small code-pre">const geo = new THREE.SphereGeometry(0.65, 16, 16)</pre>
            <pre class="code-block rounded p-3 small code-pre">const geo = new THREE.CircleGeometry(0.65, 32)</pre>
            <pre
              class="code-block rounded p-3 small code-pre">const geo = new THREE.CylinderGeometry(0.4, 0.4, 1.2, 16)</pre>
            <pre class="code-block rounded p-3 small code-pre">const geo = new THREE.ConeGeometry(0.65, 1.3, 16)</pre>
            <pre
              class="code-block rounded p-3 small code-pre">const geo = new THREE.TorusGeometry(0.5, 0.2, 12, 24)</pre>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-mat">
        <h2 id="sec-mat" class="section-title">Materiali</h2>
        <div class="row g-4 align-items-start">
          <div class="col-md-7">
            <p class=" mb-3">
              Il materiale descrive come appare la superficie: colore, texture, lucentezza, trasparenza.
              Uniti in una <code class="text-info">Mesh</code>, geometria e materiale formano l'oggetto visibile.
            </p>
            <div class="table-responsive">
              <table class="table table-dark table-bordered small mb-0">
                <thead>
                  <tr>
                    <th>Materiale</th>
                    <th>Luce</th>
                    <th>Adatto per</th>
                    <th>Performance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code class="text-info">MeshBasicMaterial</code></td>
                    <td>No</td>
                    <td>Wireframe, debug, overlay</td>
                    <td>Più veloce</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">MeshLambertMaterial</code></td>
                    <td>Sì</td>
                    <td>Low-poly, scene di grandi dimensioni</td>
                    <td>Veloce</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">MeshPhongMaterial</code></td>
                    <td>Sì</td>
                    <td>Superfici lucide</td>
                    <td>Medio</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">MeshStandardMaterial</code></td>
                    <td>Sì</td>
                    <td>Rendering PBR realistico</td>
                    <td>Lento</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">MeshToonMaterial</code></td>
                    <td>Sì</td>
                    <td>Cel-shading, estetica stilizzata</td>
                    <td>Medio</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="3" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">Stessa sfera, materiali diversi a ciclo</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-luci">
        <h2 id="sec-luci" class="section-title">Le Luci</h2>
        <div class="row g-4 align-items-center">
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="4" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">Una PointLight colorata orbita una sfera grigia</p>
            </div>
          </div>
          <div class="col-md-7">
            <p class=" mb-3">
              I materiali che reagiscono alla luce (Lambert, Phong, Standard, Toon) hanno bisogno di almeno una sorgente
              luminosa per dimostrare le proprie proprietà.
            </p>
            <div class="table-responsive">
              <table class="table table-dark table-bordered small mb-0">
                <thead>
                  <tr>
                    <th>Luce</th>
                    <th>Descrizione</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><code class="text-info">AmbientLight</code></td>
                    <td>Illumina tutto uniformemente, senza ombre.</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">DirectionalLight</code></td>
                    <td>Simula il sole: raggi paralleli, ombre nette.</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">PointLight</code></td>
                    <td>Irradia in tutte le direzioni da un punto singolo.</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">SpotLight</code></td>
                    <td>Come un faro: cono di luce orientabile.</td>
                  </tr>
                  <tr>
                    <td><code class="text-info">HemisphereLight</code></td>
                    <td>Miscela luce del cielo e riflesso del terreno.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-anim">
        <h2 id="sec-anim" class="section-title">Loop di Animazione</h2>
        <div class="row g-4 align-items-center">
          <div class="col-md-7">
            <p class="">
              <code class="text-info">requestAnimationFrame</code> chiama la funzione di render circa 60 volte al
              secondo,
              sincronizzato con il refresh del monitor per animazioni fluide senza sprechi di CPU.
            </p>
            <pre class="code-block rounded p-3 small code-pre">function anima() {
        requestAnimationFrame(anima)
        mesh.rotation.y += 0.01
        renderer.render(scene, camera)
        }
        anima()</pre>
          </div>
          <div class="col-md-5">
            <div class="card-box p-2">
              <canvas scena="5" class="rounded w-100" style="aspect-ratio:1/1; display:block;"></canvas>
              <p class="small  text-center mt-2 mb-0">La velocità di rotazione pulsa ciclicamente</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-pbr">
        <h2 id="sec-pbr" class="section-title">Texture & PBR</h2>
        <div class="row g-4">
          <div class="col-md-6">
            <div class="card-box p-4 h-100">
              <h3 class="h6 text-info mb-2">Texture</h3>
              <p class="small  mb-0">
                Un'immagine applicata alla geometria tramite coordinate UV. Modifica l'aspetto della superficie del modello.
              </p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-box p-4 h-100">
              <h3 class="h6 text-info mb-2">PBR (Physically Based Rendering)</h3>
              <p class="small  mb-3">
                <code class="text-info">MeshStandardMaterial</code> usa un modello di visualizzazione basato sull'ottica.
                Ogni superficie è definita da:
              </p>
              <div class="table-responsive">
                <table class="table table-dark table-bordered small mb-0">
                  <thead>
                    <tr>
                      <th>Proprietà</th>
                      <th>Descrizione</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><code class="text-info">Color</code></td>
                      <td>Colore base della superficie (albedo).</td>
                    </tr>
                    <tr>
                      <td><code class="text-info">Metalness</code></td>
                      <td>Quanto la superficie si comporta come un metallo.</td>
                    </tr>
                    <tr>
                      <td><code class="text-info">Roughness</code></td>
                      <td>Quanto la superficie è ruvida o levigata.</td>
                    </tr>
                    <tr>
                      <td><code class="text-info">Normal Map</code></td>
                      <td>Simula dettagli di superficie senza aggiungere geometria.</td>
                    </tr>
                    <tr>
                      <td><code class="text-info">AO Map</code></td>
                      <td>Ombreggiatura da occlusione ambientale nelle cavità.</td>
                    </tr>
                    <tr>
                      <td><code class="text-info">Emissive</code></td>
                      <td>Colore emesso dalla superficie, indipendente dalla luce.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-shader">
        <h2 id="sec-shader" class="section-title">Shader</h2>
        <div class="row g-3">
          <div class="col-md-6">
            <div class="card-box p-4 h-100">
              <h3 class="h6 text-info mb-2">Vertex Shader</h3>
              <p class="small  mb-0">Eseguito una volta per ogni vertice. Calcola la posizione finale
                nello
                spazio schermo.</p>
            </div>
          </div>
          <div class="col-md-6">
            <div class="card-box p-4 h-100">
              <h3 class="h6 text-info mb-2">Fragment Shader</h3>
              <p class="small  mb-0">Eseguito una volta per ogni pixel. Calcola il colore finale. Three.js
                permette shader personalizzati con <code>ShaderMaterial</code>.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-perf">
        <h2 id="sec-perf" class="section-title">Performance</h2>
        <div class="row g-3">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Frustum Culling</p>
              <p class="small  mb-0">Evita di renderizzare oggetti fuori dall'inquadratura.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">InstancedMesh</p>
              <p class="small  mb-0">Lo stesso oggetto viene caricato una singola volta, ma può venir visualizzato migliaia di volte.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">LOD</p>
              <p class="small  mb-0">Modelli più semplici vengono visualizzati per gli oggetti lontani dalla camera.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Texture Compression</p>
              <p class="small  mb-0">Riduce memoria e tempi di caricamento comprimendo le texture a runtime, per poi salvarle in cache per le prossime visite alla pagina.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Draco / Meshopt</p>
              <p class="small  mb-0">Compressione mesh che alleggerisce i modelli 3D, rimuovendo vertici in eccesso e riducendo la floating point precision dei suddetti quando necessario.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Dispose</p>
              <p class="small  mb-0">Strumento tramite il quale il programmatore può deallocare manualmente geometrie, materiali e texture non più necessari.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section-block" aria-labelledby="sec-eco">
        <h2 id="sec-eco" class="section-title">Ecosistema</h2>
        <div class="row g-3">
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">React Three Fiber</p>
              <p class="small  mb-0">Integrazione dichiarativa di Three.js con React.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Drei</p>
              <p class="small  mb-0">Raccolta di componenti e helper pronti all'uso per R3F.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">glTF / .glb</p>
              <p class="small  mb-0">Formato standard per modelli 3D con mesh, materiali e animazioni.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Rapier / Cannon-es</p>
              <p class="small  mb-0">Motori fisici integrabili nella scena.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">GSAP</p>
              <p class="small  mb-0">Animazioni avanzate di proprietà e oggetti Three.js.</p>
            </div>
          </div>
          <div class="col-12 col-sm-6 col-lg-4">
            <div class="card-box p-3 h-100">
              <p class="small fw-bold text-info mb-1">Blender</p>
              <p class="small  mb-0">Principale strumento di modellazione, esporta in glTF.</p>
            </div>
          </div>
        </div>
      </section>

      <div class="text-center pt-2 pb-4">
        <router-link to="/browser" class="btn btn-info btn-lg px-5">Esplora Blocchi</router-link>
      </div>

    </div>
  </div>
</template>

<script src='../scripts/DeepDive.js'></script>