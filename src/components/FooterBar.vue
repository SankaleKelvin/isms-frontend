<template>
  <v-footer color="teal darken-4" class="footer" app>
    <v-row justify="center" no-gutters>
      <template v-for="link in filteredPaths" :key="link.text">
        <!-- Action button (e.g., logout) -->
        <v-btn
          v-if="link.action"
          @click="link.action()"
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
          active-class="border"
        >
          {{ link.text }}
        </v-btn>

        <!-- Route button -->
        <v-btn
          v-else
          :to="link.route"
          router
          class="mx-2"
          color="white"
          rounded="xl"
          variant="text"
          active-class="border"
        >
          {{ link.text }}
        </v-btn>
      </template>

      <v-col class="text-center mt-4" cols="12">
        <strong>dissertation-sankale</strong> &copy;
        {{ new Date().getFullYear() }}
      </v-col>
    </v-row>
  </v-footer>
</template>

<script setup>
import { computed } from 'vue'
import { useAuth } from '@/services/auth.service'

const { isAuthenticated, isAdmin, logout } = useAuth()

// Define all possible navigation paths
const allPaths = [
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us', public: true },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us', public: true },
  { icon: 'mdi-lock', text: 'Login', route: '/login', showWhenLoggedOut: true },
  { icon: 'mdi-account', text: 'Logout', action: logout, requiresAuth: true },
]

const filteredPaths = computed(() => {
  return allPaths.filter((path) => {
    if (path.public) return true
    if (path.showWhenLoggedOut && !isAuthenticated.value) return true
    if (path.requiresAuth && isAuthenticated.value) {
      if (path.requiresAdmin) return isAdmin.value
      return true
    }
    return false
  })
})
</script>

<style scoped>
.footer {
  min-height: 110px;
  padding: 15px 0;
}
</style>
