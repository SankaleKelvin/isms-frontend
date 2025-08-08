<template>
  <v-app class="d-flex flex-column fill-height">
    <NavBar />
    <v-main class="flex-grow-1">
      <RouterView />
    </v-main>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterBar.vue'
</script>

<style>
.html, body, #app{
  height: 100%; 
  margin: 0;
}
</style>