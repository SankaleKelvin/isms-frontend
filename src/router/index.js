import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import TestPage from '../views/TestPage.vue'
import ContactUsView from '../views/ContactUsView.vue'
import LoginPage from '../views/LoginPage.vue'
import SignUpPage from '../views/SignUp.vue'
import WelcomePage from '../views/WelcomePage.vue'
import LocationPage from '../views/LocationPage.vue'
import TokenService from '../services/token.service'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
      meta: {
        requiresAuth: false,
      }
    },
    {
      path: '/about-us',
      name: 'about',
      component: AboutView
    },
    {
      path: '/test',
      name: 'TestPage',
      component: TestPage
    },
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage,
      meta: {
        guestOnly: true // Only accessible if not logged in
      }
    },
    {
      path: '/sign-up',
      name: 'SignUpPage',
      component: SignUpPage,
      meta: {
        guestOnly: true
      }
    },
    {
      path: '/contact-us',
      name: 'ContactUs',
      component: ContactUsView
    },
    {
      path: '/welcome',
      name: 'Welcome',
      component: WelcomePage
    },
    {
      path: '/location',
      name: 'Location',
      component: LocationPage,
      meta: {
        requiresAuth: true,
        requiredAbility: 'view-location' // match to what's returned from the backend
      }
    },
  ],
})

// Navigation guard
router.beforeEach((to, from, next) => {
  // Check if route requires authentication
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Check if user is authenticated
    if (!TokenService.isAuthenticated()) {
      // Not authenticated, redirect to login
      return next({ name: 'login', query: { redirect: to.fullPath } })
    }

    // Check if route requires specific ability
    if (to.meta.requiredAbility && !TokenService.hasAbility(to.meta.requiredAbility)) {
      // User doesn't have required ability, redirect to home or unauthorized page
      return next({ name: 'Home' })
    }
  }

  // Check if route is for guests only (like login page)
  if (to.matched.some((record) => record.meta.guestOnly)) {
    if (TokenService.isAuthenticated()) {
      // User is already authenticated, redirect to home
      return next({ name: 'Home' })
    }
  }

  // Proceed as normal
  next()
})

export default router
