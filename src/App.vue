<template>
  <div id="app" class="min-h-screen flex flex-col bg-gray-900">
      <NavBar />
      <router-view />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar
  }
}
</script>

<style>
#app {
}
</style>
