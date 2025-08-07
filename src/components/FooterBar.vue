<template>
    <v-footer color="teal darken-4">
      <v-row justify="center" no-gutters>
        <v-btn
          v-for="link in links"
          :key="link.text"
          router :to="link.route"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
          active-class="border"
        >
          {{ link.text }}
        </v-btn>
        <v-col class="text-center mt-4" cols="12">
            <strong>dissertation-sankale</strong> &copy; {{ new Date().getFullYear() }}
        </v-col>
      </v-row>
    </v-footer>
  </template>
  <script setup>
    import { ref } from 'vue';

    const links = ref([
          {text:'Home', route:'/'},
          {text:'About Us', route:'/about-us'},
          {text:'Contact Us', route:'/contact-us'},
          {text:'Login', route:'/login'},
        ]);
  </script>