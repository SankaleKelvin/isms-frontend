<template>
  <v-container fluid class="welcome-background">
    <v-row justify="center" align="center" class="pt-16">
      <v-col cols="12" sm="10" md="8" lg="6">
        <v-card class="welcome-card" elevation="10">
          <!-- Welcome header -->
          <v-card-title class="text-center teal darken-2 white--text py-4">
            <h1 class="text-h3 font-weight-bold w-100">WELCOME TO ISMS</h1>
          </v-card-title>

          <!-- User profile section -->
          <v-card-text v-if="isAuthenticated" class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img :src="userPhotoUrl" alt="User Photo" cover></v-img>
            </v-avatar>

            <div class="text-uppercase text-h4 font-weight-bold my-2">
              {{ userName }}
            </div>

            <div class="text-uppercase text-h6 font-weight-medium grey--text text--darken-1 mb-2">
              {{ userEmail }}
            </div>

            <div class="text-uppercase text-body-1 teal--text text--darken-2 font-weight-medium">
              {{ userRole }}
            </div>

            <v-divider class="my-6"></v-divider>

            <!-- Welcome message -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%">
              Thank you for joining ISMS. We're excited to have you on board! Explore our diverse
              security services and installations.
            </p>

            <!-- Action buttons -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn block color="teal darken-1" dark large router to="/menu">
                  <v-icon left>mdi-food</v-icon>
                  Browse Menu
                </v-btn>
              </v-col>

              <v-col cols="12" sm="6" v-if="can('view-dashboard')">
                <v-btn block outlined color="teal darken-1" large router to="/profile">
                  <v-icon left>mdi-account-edit</v-icon>
                  Edit Profile
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <!-- Guest view -->
          <v-card-text v-else class="text-center py-8">
            <v-avatar size="150" class="mb-4">
              <v-img src="https://picsum.photos/1920/1080?random" alt="Guest" cover></v-img>
            </v-avatar>

            <div class="text-h4 font-weight-bold my-2">HELLO, GUEST</div>

            <v-divider class="my-6"></v-divider>

            <!-- Welcome message for guests -->
            <p class="text-body-1 text-center mx-auto" style="max-width: 80%">
              Welcome to ISMS. Please log in or register to access our Security Services and
              Installations.
            </p>

            <!-- Action buttons for guests -->
            <v-row class="mt-8">
              <v-col cols="12" sm="6">
                <v-btn block color="teal darken-1" dark large router to="/login">
                  <v-icon left>mdi-login</v-icon>
                  Login
                </v-btn>
              </v-col>

              <v-col cols="12" sm="6">
                <v-btn block outlined color="teal darken-1" large router to="/register">
                  <v-icon left>mdi-account-plus</v-icon>
                  Register
                </v-btn>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../services/auth.service'
import globalAuthService from '../services/auth.service'

const router = useRouter()
const { isAuthenticated, currentUser, can } = useAuth()

const getImageUrl = (path) => `http://localhost:8000/storage/${path}`

// 🔍 Add logging
console.log('Component mounted: checking auth...')

onMounted(async () => {
  try {
    console.log('[INIT] Calling globalAuthService.initialize()')
    await globalAuthService.initialize()

    console.log('[AUTH] isAuthenticated:', isAuthenticated.value)
    console.log('[AUTH] currentUser:', currentUser.value)
  } catch (err) {
    console.error('[ERROR] Failed to initialize auth:', err)
  }
})

// Computed properties for user info
const userName = computed(() => {
  const name = currentUser.value?.name || currentUser.value?.username
  console.log('[USER] userName:', name)
  return name || 'GUEST USER'
})

const userEmail = computed(() => {
  const email = currentUser.value?.email || 'guest@example.com'
  console.log('[USER] userEmail:', email)
  return email
})

const userRole = computed(() => {
  const role = currentUser.value?.role?.name || currentUser.value?.roles?.[0] || 'Customer'
  console.log('[USER] userRole:', role)
  return role
})

const userPhotoUrl = computed(() => {
  if (currentUser.value?.user_photo) {
    const url = `http://localhost:8000/storage/${currentUser.value.user_photo}`
    console.log('[USER] userPhotoUrl:', url)
    return url
  } else {
    return 'https://picsum.photos/1920/1080?random'
  }
})
</script>


<style scoped>
.welcome-background {
  background: linear-gradient(135deg, #e0f2f1 0%, #b2dfdb 50%, #80cbc4 100%);
  min-height: 100vh;
  padding-top: 2rem;
  padding-bottom: 2rem;
}

.welcome-card {
  border-radius: 16px;
  overflow: hidden;
}
</style>
