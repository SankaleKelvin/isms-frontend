<template>
  <v-navigation-drawer
    v-model="drawer"
    color="teal-darken-1"
    dark
    app
    v-if="isAuthenticated || !hideForUnauthenticated"
  >
    <v-layout column align-center>
      <v-flex class="my-2 mx-auto text-center">
        <v-avatar size="100">
          <v-img :src="userAvatar"></v-img>
        </v-avatar>
        <p class="white--text subheading mt-1 text-center">{{ userName }}</p>
      </v-flex>
    </v-layout>
    <v-list flat>
      <v-list-item
        v-for="path in filteredPaths"
        :key="path.text"
        router
        :to="path.route"
        active-class="border"
      >
        <v-list-item-content class="d-flex align-center">
          <v-icon>{{ path.icon }}</v-icon>
          <span class="ml-2">{{ path.text }}</span>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
  <v-app-bar color="teal darken-4">
    <v-app-bar-nav-icon
      @click.stop="drawer = !drawer"
      v-if="isAuthenticated || !hideForUnauthenticated"
    ></v-app-bar-nav-icon>

    <v-toolbar-title class="text-uppercase">
      <span class="font-weight-light">DISSERTATION-TEST-FUllAutomation-Task</span>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <v-menu offset-y>
      <template v-slot:activator="{ props }">
        <v-btn text v-bind="props">
          <v-icon left>mdi-chevron-down</v-icon>
          <span>Menu</span>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="path in filteredPaths"
          :key="path.text"
          router
          :to="path.route"
          active-class="border"
        >
          <v-list-item-title>{{ path.text }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>

    <!-- Add logout button if authenticated -->
    <v-btn v-if="isAuthenticated" text @click="handleLogout" class="ml-2">
      <v-icon left>mdi-logout</v-icon>
      <span>Logout</span>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAuth } from '../services/auth.service'
import { useRouter } from 'vue-router'

const props = defineProps({
  hideForUnauthenticated: {
    type: Boolean,
    default: true,
  },
})

const drawer = ref(true)
const router = useRouter()

// Use the authentication service
const { isAuthenticated, currentUser, isAdmin, logout, loadUserInfo } = useAuth()

// Load user info on component mount
onMounted(async () => {
  // await loadUserInfo()
})

// Computed properties for user info
const userName = computed(() => {
  return currentUser.value ? currentUser.value.name || 'User' : 'Guest'
})

const userAvatar = computed(() => {
  return currentUser.value && currentUser.value.user_photo
    ? currentUser.value.user_photo
    : 'https://picsum.photos/1920/1080?random'
})

// Handle logout
function handleLogout() {
  logout()
  router.push('/login')
}

// Define all possible navigation paths with required roles
const allPaths = [
  // Public paths
  { icon: 'mdi-home', text: 'Home', route: '/', public: true },
  { icon: 'mdi-magnify', text: 'Search', route: '/search', public: true },
  { icon: 'mdi-heart', text: 'About Us', route: '/about-us', public: true },
  { icon: 'mdi-mail', text: 'Contact Us', route: '/contact-us', public: true },

  // Authentication paths (show login when not authenticated, profile when authenticated)
  { icon: 'mdi-lock', text: 'Login', route: '/login', showWhenLoggedOut: true },
  { icon: 'mdi-account', text: 'My Profile', route: '/profile', requiresAuth: true },

  // Customer paths
  { icon: 'mdi-map', text: 'Locations', route: '/location', requiresAuth: true },

  // Customer paths
  { icon: 'mdi-food', text: 'Menu', route: '/menu', requiresAuth: true },
  { icon: 'mdi-cart', text: 'My Orders', route: '/orders', requiresAuth: true },

  // Admin/Backend paths
  {
    icon: 'mdi-store',
    text: 'Restaurant Management',
    route: '/admin/restaurants',
    requiresAdmin: true,
  },
  { icon: 'mdi-map-marker', text: 'Locations', route: '/admin/locations', requiresAdmin: true },
  {
    icon: 'mdi-account-group',
    text: 'User Management',
    route: '/admin/users',
    requiresAdmin: true,
  },
  {
    icon: 'mdi-clipboard-list',
    text: 'Order Management',
    route: '/admin/orders',
    requiresAdmin: true,
  },
  { icon: 'mdi-cash-register', text: 'Payments', route: '/admin/payments', requiresAdmin: true },
  { icon: 'mdi-chart-bar', text: 'Reports', route: '/admin/reports', requiresAdmin: true },
]

// Filter paths based on authentication status and user role
const filteredPaths = computed(() => {
  return allPaths.filter((path) => {
    // Public paths are always visible
    if (path.public) return true

    // Paths that should only show when logged out
    if (path.showWhenLoggedOut && !isAuthenticated.value) return true

    // Paths that require authentication
    if (path.requiresAuth && isAuthenticated.value) {
      // Admin-only paths
      if (path.requiresAdmin) {
        return isAdmin.value
      }
      return true
    }

    return false
  })
})
</script>

<style scoped>
.border {
  border-left: 4px solid #0ba518;
}
</style>
