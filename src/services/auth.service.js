// src/services/auth.service.js

import { ref, computed } from 'vue'
import TokenService from './token.service'
import api from './api'

// 🔑 Singleton reactive state
const user = ref(null)
const abilities = ref({})
const loading = ref(false)
const error = ref(null)

// ✅ Composable function
export function useAuth() {

  // Computed: is user authenticated?
  const isAuthenticated = computed(() => !!user.value)

  // Computed: is user admin?
  const isAdmin = computed(() => user.value?.role?.name === 'admin')

  // Computed: current user and abilities
  const currentUser = computed(() => user.value)
  const userAbilities = computed(() => abilities.value)

  // Ability checker
  function can(ability) {
    return abilities.value?.[ability] === true
  }

  // Initialize from TokenService on app load
  function initialize() {
    const savedUser = TokenService.getUser()
    const savedAbilities = TokenService.getAbilities()
    if (savedUser) {
      user.value = savedUser
      abilities.value = savedAbilities || {}
    }
  }

  // Login
  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      if (!credentials.username || !credentials.password) {
        throw new Error('Username and password are required')
      }

      const response = await api.post('api/auth/signin', credentials)
      const { token, user: userData, abilities: userAbilities } = response.data

      if (token && userData) {
        user.value = userData
        abilities.value = userAbilities || {}

        TokenService.setToken(token)
        TokenService.setUser(userData)
        TokenService.setAbilities(userAbilities)

        return response
      } else {
        throw new Error('Invalid response format from server')
      }

    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Register
  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      return await api.post('register', userData)
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Logout
  function logout() {
    user.value = null
    abilities.value = {}
    TokenService.removeToken()
  }

  // Profile update
  async function updateProfile(profileData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put('update-profile', profileData)
      user.value = response.data.user || response.data
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  // Return service API
  return {
    user,
    loading,
    error,
    abilities: userAbilities,
    isAuthenticated,
    isAdmin,
    currentUser,
    can,
    initialize,
    login,
    register,
    logout,
    updateProfile
  }
}


// ✅ Global service that always uses the singleton state
const globalAuthService = {
  initialize() {
    const { initialize } = useAuth()
    initialize()
  },
  isAuthenticated() {
    const { isAuthenticated } = useAuth()
    return isAuthenticated.value
  },
  isAdmin() {
    const { isAdmin } = useAuth()
    return isAdmin.value
  },
  getCurrentUser() {
    const { currentUser } = useAuth()
    return currentUser.value
  },
  getAbilities() {
    const { abilities } = useAuth()
    return abilities.value
  },
  can(ability) {
    const { can } = useAuth()
    return can(ability)
  },
  login(credentials) {
    const { login } = useAuth()
    return login(credentials)
  },
  register(userData) {
    const { register } = useAuth()
    return register(userData)
  },
  logout() {
    const { logout } = useAuth()
    logout()
  },
  updateProfile(profileData) {
    const { updateProfile } = useAuth()
    return updateProfile(profileData)
  }
}

export default globalAuthService
