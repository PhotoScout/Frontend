import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

// Load the different pages
import Index from '@/components/Index'
import Travel from '@/components/Travel'

import Guide from '@/components/Guide/Index'
import GuideInfo from '@/components/Guide/Info'
import GuidePhoto from '@/components/Guide/Photos'
import GuideSearch from '@/components/Guide/Search'
import GuideMap from '@/components/Guide/Map'

import CreateGuide from '@/components/CreateGuide/Index'

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
      path: '/guide/create',
      component: CreateGuide,
      name: 'CreateGuide'
    },
    {
      path: '/guide/:guideName',
      component: Guide,
      props: true,
      children: [
        {
          path: '',
          name: 'Guide',
          component: GuideInfo
        },
        {
          path: 'photo',
          name: 'GuidePhoto',
          component: GuidePhoto,
          props: true
        },
        {
          path: 'search',
          name: 'GuideSearch',
          component: GuideSearch,
          props: true
        },
        {
          path: 'map',
          name: 'GuideMap',
          component: GuideMap,
          props: true
        }
      ],
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
