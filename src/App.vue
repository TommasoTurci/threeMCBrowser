<template>
  <NavBar />
  <main id="main-content">
    <router-view />
  </main>
</template>

<script>
import NavBar from './views/NavBar.vue'
export default {
  name: 'App',
  components: { NavBar },
}
</script>
