<template>
  <v-app>
    <NavBar />
    <v-content>
      <Router-View />
    </v-content>
    <Footer />
  </v-app>
</template>

<script setup>
import NavBar from './components/NavBar.vue'
import Footer from './components/FooterBar.vue'
</script>

<style>
.main-content{
  padding-top: 20px; 
  min-height: 90vh; 
  flex-grow: 1;
}
</style>