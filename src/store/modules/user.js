import * as types from '../mutation-types'
import api from '../../api/api'
import SurveyingMarmot from 'surveying-marmot-api'

const state = {
  isAuthenticated: false,
  isRequesting: false,
  token: '',
  username: ''
}

const getters = {
  loginStatus: state => state.isAuthenticated,
  requestStatus: state => state.isRequesting
}

const actions = {
  login ({ commit, state }, credentials) {
    commit(types.LOGIN_REQUEST)

    const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
    return new Promise((resolve, reject) =>
      sm.RetrieveToken(credentials.username, credentials.password).then(data => {
        commit(types.LOGIN_SUCCESS, {data})
        resolve(data)
      }).catch(data => {
        commit(types.LOGIN_FAILURE, {data})
        reject(data)
      })
    )
  },
  signup ({commit, state}, credentials) {
    // Not really a request but same effect
    commit(types.LOGIN_REQUEST)
    return new Promise((resolve, reject) => {
      api.Signup((data) => {
        commit(types.SIGNUP_SUCCESS, {data})
        resolve(data)
      }, (data) => {
        commit(types.SIGNUP_FAILURE, {data})
        reject(data)
      }, credentials)
    })
  }
}

const mutations = {
  [types.LOGIN_REQUEST] (state) {
    state.isAuthenticated = false
    state.isRequesting = true
    state.username = ''
    state.token = ''
  },

  [types.LOGIN_SUCCESS] (state, { data }) {
    state.isAuthenticated = true
    state.isRequesting = false
    state.username = ''
    state.token = data
  },

  [types.LOGIN_FAILURE] (state, { message }) {
    state.isRequesting = false
  },

  [types.LOGOUT] (state) {
    state.isAuthenticated = false
    state.username = ''
    state.token = ''
  },

  [types.SIGNUP_SUCCESS] (state, { message }) {
    state.isRequesting = false
  },

  [types.SIGNUP_FAILURE] (state, { message }) {
    state.isRequesting = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
