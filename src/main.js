// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import 'vue-awesome/icons'
import Icon from 'vue-awesome/components/Icon'
import VueFloatLabel from 'vue-float-label'
import VueMoment from 'vue-moment'
import BootstrapVue from 'bootstrap-vue'

Vue.config.productionTip = false

Vue.use(BootstrapVue);
Vue.use(VueMoment)
Vue.use(VueFloatLabel)
Vue.component('icon', Icon)

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
