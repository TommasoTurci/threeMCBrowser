<template>
  <nav class="navbar navbar-expand-md navbar-dark" style="background:#12122a; border-bottom:1px solid #333355;">
    <div class="container-fluid">

      <router-link class="navbar-brand d-flex align-items-center gap-2" to="/">
        <span class="text-white fw-bold">Three.js</span>
      </router-link>

      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
        aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      
      <div class="collapse navbar-collapse" id="navMenu">
        <ul class="navbar-nav ms-auto gap-md-1">
          <li class="nav-item">
            <router-link class="nav-link" active-class="router-link-active"
              to="/introduction">Introduzione</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="router-link-active"
              to="/deep-dive">Approfondimento</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="router-link-active" to="/browser">Esplora Blocchi</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" active-class="router-link-active" to="/collection">La Mia
              Collezione</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default { name: 'NavBar' }
</script>
