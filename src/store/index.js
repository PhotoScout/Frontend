import Vue from 'vue'
import Vuex from 'vuex'

// Store Modules
import user from './modules/user'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    user
  },
  strict: debug
})
