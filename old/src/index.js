import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import Index from './Index.vue'
import Travel from './Travel.vue'
import Account from './Account.vue'
import Guide from './Guide.vue'
import Explore from './Explore.vue'
import auth from './auth'
import VModal from 'vue-js-modal'
import vuescroll from 'vue-scroll'

Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(VModal)
Vue.use(vuescroll)

const routes = [
  { path: '/', component: Index },
  { path: '/travel', component: Travel },
  { path: '/explore', component: Explore },
  { path: '/guide/:guideID/:view', name: 'guide', component: Guide, props: true },
  { path: '/account', name: 'account', component: Account}
]

export var router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  auth.checkAuth()

//   if ((to.path !== '/' && to.path !== '/explore' && to.path !=='/guide') && !auth.user.authenticated) {
//     next('/')
//   }
  next()
})

Vue.http.interceptors.push(function(request, next) {

  next(function(response) {
    if(response.body == "Unauthorized Access") {
      auth.logout()
      // next('/')
    }
  });
});

const app = new Vue({
  router
}).$mount('#app')