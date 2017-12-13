import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

// Store Modules
import user from './modules/user'
import guides from './modules/guides'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
    count: 0
  },
  modules: {
    user,
    guides
  },
  plugins: [createPersistedState({
    key: 'surveying-marmot',
    paths: [
      'user.token',
      'user.isAuthenticated'
    ]
  })],
  strict: debug
})
