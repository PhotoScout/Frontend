import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Load the different pages
import Index from '@/components/Index'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/travel',
      name: 'Travel',
      component: Index,
      meta: {
        requiresAuth: true
      }
    }
  ]
})

// Intercept request and block authenticated pages
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.user.isAuthenticated) {
    next('/')
  } else {
    next()
  }
})

export default router
