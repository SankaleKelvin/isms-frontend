// src/services/auth.service.js

import { ref, computed } from 'vue'
import { jwtDecode } from 'jwt-decode'
import TokenService from './token.service'
import api from './api'
import router from '../router/index'

// 🔑 Singleton reactive state
const user = ref(null)
const loading = ref(false)
const error = ref(null)

// 🔐 Get user from JWT
function decodeUserFromToken() {
  const token = TokenService.getAccessToken()
  if (!token) return null

  try {
    const decoded = jwtDecode(token)
    return {
      username: decoded.sub,
      roles: decoded.roles || [],
      exp: decoded.exp,
    }
  } catch (err) {
    console.error('[auth.service] Failed to decode token:', err)
    return null
  }
}

// ✅ Composable auth function
export function useAuth() {
  const isAuthenticated = computed(() => {
    return TokenService.isAuthenticated()
  })

  const currentUser = computed(() => user.value)

  const isAdmin = computed(() => {
    return user.value?.roles?.includes('ROLE_ADMIN')
  })

  function can(role) {
    return user.value?.roles?.includes(role)
  }

  function initialize() {
    const decodedUser = decodeUserFromToken()
    if (decodedUser) {
      user.value = decodedUser
      console.log('[AUTH] Initialized with user:', decodedUser)
    } else {
      console.warn('[AUTH] No valid token found during initialization.')
      user.value = null
    }
  }

  async function login(credentials) {
    loading.value = true
    error.value = null

    try {
      const { username, password } = credentials
      if (!username || !password) {
        throw new Error('Username and password are required')
      }

      const response = await api.post(
        'api/auth/signin',
        { username, password },
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )

      const { access_token, refresh_token } = response.data

      if (access_token && refresh_token) {
        TokenService.setAccessToken(access_token)
        TokenService.setRefreshToken(refresh_token)

        const decodedUser = decodeUserFromToken()
        if (decodedUser) {
          user.value = decodedUser
          console.log('[LOGIN] User authenticated:', decodedUser)
        }

        router.push('/welcome')
        return response
      } else {
        throw new Error('Missing tokens in server response')
      }
    } catch (err) {
      error.value = err.response?.data?.message || err.message || 'Login failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  async function register(userData) {
    loading.value = true
    error.value = null
    try {
      return await api.post('api/auth/signup', userData)
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  function logout() {
    TokenService.removeTokens()
    user.value = null
    router.push('/login')
  }

  async function updateProfile(profileData) {
    loading.value = true
    error.value = null
    try {
      const response = await api.put('api/user/update-profile', profileData)
      // If backend returns updated user, use it. Otherwise fallback to decoding.
      user.value = response.data.user || decodeUserFromToken()
      return response
    } catch (err) {
      error.value = err.response?.data?.message || 'Profile update failed'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    user,
    loading,
    error,
    isAuthenticated,
    isAdmin,
    currentUser,
    can,
    initialize,
    login,
    register,
    logout,
    updateProfile,
  }
}

// ✅ Global singleton-style service for app-wide use
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
  can(role) {
    const { can } = useAuth()
    return can(role)
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
  },
}

export default globalAuthService
