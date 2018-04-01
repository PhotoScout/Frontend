import * as types from '../mutation-types'
import SurveyingMarmot from '../../api/SurveyingMarmotAPI'

const state = {
  isRequesting: false,
  guides: []
}

const getters = {
  isRequesting: state => state.isRequesting,
  guidesByDate: state => state.guides
}

const actions = {
  queryGuideList ({commit, state}, token) {
    commit(types.GUIDES_REQUEST)
    const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
    return new Promise((resolve, reject) => {
      sm.GetGuides(token).then(data => {
        commit(types.GUIDES_SUCCESS, {data})
        resolve(data)
      }).catch(data => {
        commit(types.GUIDES_FAILURE, {data})
        reject(data)
      })
    })
  }
}

const mutations = {
  [types.GUIDES_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.GUIDES_SUCCESS] (state, { data }) {
    state.isRequesting = false
    state.guides = data.sort((a, b) =>
      new Date(a.last_edited) < new Date(b.last_edited)
    )
  },

  [types.GUIDES_FAILURE] (state, { data }) {
    state.isRequesting = false
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
