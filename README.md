# threeMCBrowser

Web application sviluppata con **Vue.js** per esplorare e collezionare blocchi di **Minecraft** tramite un'interfaccia interattiva.

Il progetto permette di consultare un catalogo di blocchi, visualizzarne informazioni dettagliate, creare una collezione personale e visualizzare anteprime 3D utilizzando **Three.js**.

Include inoltre una sezione didattica dedicata ai concetti base della grafica 3D nel browser tramite WebGL.

---

## Funzionalità principali

- Sezione educativa sui principali concetti di rendering 3D
- Esplorazione dei blocchi Minecraft
- Ricerca e filtro dei blocchi disponibili
- Visualizzazione delle informazioni dei blocchi
- Creazione e gestione di una collezione personale
- Aggiunta di note personalizzate ai blocchi
- Anteprima 3D tramite Three.js

---

## Tecnologie utilizzate

### Frontend
- **Vue.js** (Single File Components)
- **Vue Router** per la navigazione
- **Vite** per sviluppo e build

### Grafica 3D
- **Three.js** per rendering WebGL

### UI
- **Bootstrap**
- CSS personalizzato per il tema grafico

### API
- API esterna per il recupero di icone e informazioni dei blocchi

### Development
- npm
- Vite dev server

---

## Struttura del progetto

La posizione dei file principali:

- `src/main.js` - entry point dell'app
- `src/App.vue` - layout globale
- `src/router/index.js` - configurazione delle rotte
- `src/views/BlockBrowser.vue` - browser dei blocchi
- `src/views/Collection.vue` - gestione della collezione personale
- `src/views/DeepDive.vue` - sezione educativa Three.js
- `src/components/BlockModal.vue` - finestra dettagli blocco
- `src/components/BlockPreview.vue` - anteprima 3D
- `src/scripts/BlockBrowser.js` - logica del browser
- `src/scripts/Collection.js` - gestione collezione
- `src/scripts/DeepDive.js` - scene Three.js
- `src/css/style.css` - stili globali

---

## Avvio del progetto

### Ambiente di sviluppo

```bash
npm install
npm run dev
```

Design e prototipo
Il design e il flusso dell’interfaccia sono stati prototipati in Figma.

🔗 Prototipo Figma
https://shadow-swirl-78404106.figma.site/

Nella cartella ```/project``` è possibile trovare altra documentazione relativa alla fase di progettazione, come alcuni stadi di mockup precedenti al confronto con il gruppo di utenti.
