import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Load the different pages
import Index from '@/components/Index'
import Travel from '@/components/Travel'
import Guide from '@/components/Guide'

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
      component: Travel,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/guide/:guideName',
      name: 'Guide',
      component: Guide,
      props: true,
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
