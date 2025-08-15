<template>
  <v-main>
    <v-container fluid fill-height class="login-background">
      <v-row justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card elevation="10" class="pa-6 rounded-lg">
            <v-form @submit.prevent="handleLogin" ref="form">
              <div class="text-center mb-6">
                <h1 class="text-h4 font-weight-bold teal--text text--darken-2">Welcome Back</h1>
                <p class="text-subtitle-1 mt-2">Log in to your ISMS account</p>
              </div>
              <v-alert v-if="error" type="error" class="mb-4">{{ error }}</v-alert>
              <v-text-field
                v-model="username"
                label="Email"
                prepend-inner-icon="mdi-email"
                required
                outlined
                dense
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                prepend-inner-icon="mdi-lock"
                :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPassword ? 'text' : 'password'"
                @click:append="showPassword = !showPassword"
                :rules="passwordRules"
                required
                outlined
                dense
              ></v-text-field>
              <div class="d-flex justify-space-between align-center mb-2">
                <v-checkbox
                  v-model="rememberMe"
                  label="Remember me"
                  color="teal darken-2"
                  hide-details
                  dense
                ></v-checkbox>
                <a href="#" class="teal--text text--darken-2 text-body-2">Forgot password?</a>
              </div>
              <v-btn
                block
                color="teal darken-2"
                dark
                class="mt-4"
                large
                type="submit"
                :loading="loading"
              >
                Log In
              </v-btn>
              <div class="text-center mt-6">
                <p>
                  Don't have an account?
                  <router-link to="/sign-up" class="teal--text text--darken-2 font-weight-medium"
                    >Sign Up</router-link
                  >
                </p>
              </div>
            </v-form>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script setup>
import { ref } from 'vue'
import { useAuth } from '../services/auth.service'
import { useRouter } from 'vue-router'

const router = useRouter()
const { login, loading, error } = useAuth()

// Form fields
const username = ref('')
const password = ref('')
const showPassword = ref(false)
const rememberMe = ref(false)
const form = ref(null)

// Validation rules
const emailRules = [
  (v) => !!v || 'Email is required',
  (v) => /.+@.+\..+/.test(v) || 'Email must be valid',
]

const passwordRules = [(v) => !!v || 'Password is required']

// Login handler with form validation

async function handleLogin() {
  const isValid = form.value?.validate()
  if (!isValid) return

  try {
    const loggedInUser = await login({
      username: username.value,
      password: password.value,
    })
    if (loggedInUser) {
      router.push('/welcome')
    }
  } catch (err) {
    console.error('Login failed', err)
  }
}
</script>
