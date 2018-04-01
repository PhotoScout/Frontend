import * as types from '../mutation-types'
import SurveyingMarmot from '../../api/SurveyingMarmotAPI'

const state = {
  guideData: new Map(),
  isRequesting: false,
  isRequestingPhoto: false
}

const getters = {
  getGuide: (state) => (title) => {
    return state.guideData.get(title)
  },

  getGuideLocation: (state) => (title) => {
    let guide = state.guideData.get(title)
    return [guide.location.latitude, guide.location.longitude]
  },

  getPhotos: (state) => (title) => {
    return state.guideData.get(title).photos
  }
}

const actions = {
  queryGuideInfo ({ commit, state }, args) {
    commit(types.GUIDE_INFO_REQUEST)
    const sm = new SurveyingMarmot({ url: 'http://127.0.0.1:5000' })
    return new Promise(
      (resolve, reject) => {
        sm.GetGuideInfo(args.token, args.title)
          .then(data => {
            commit(types.GUIDE_INFO_SUCCESS, { data })
            resolve(data)
          })
          .catch(data => {
            commit(types.GUIDE_INFO_FAILURE, { data })
            reject(data)
          })
      })
  },
  queryGuidePhoto ({ commit, state }, args) {
    commit(types.GUIDE_PHOTO_REQUEST)
    const sm = new SurveyingMarmot({ url: 'http://127.0.0.1:5000' })
    return new Promise(
      (resolve, reject) => {
        sm.GetPhotoList(args.token, args.title)
          .then(data => {
            commit(types.GUIDE_PHOTO_SUCCESS, { data, title: args.title })
            resolve(data)
          })
          .catch(data => {
            commit(types.GUIDE_PHOTO_FAILURE, { data })
            reject(data)
          })
      })
  },

  addPhoto ({ commit, state }, args) {
    // commit(types.GUIDE_PHOTO_ADD_REQUEST)
    const sm = new SurveyingMarmot({ url: 'http://127.0.0.1:5000' })
    return new Promise(
      (resolve, reject) => {
        sm.AddPhoto(args.token, { guide_id: args.guide, image: { origin: 'flickr', id: args.id } })
          .then(data => {
            commit(types.GUIDE_PHOTO_ADD_SUCCESS, { photo: data, title: args.guide })
            resolve(data)
          })
          .catch(data => {
            // commit(types.GUIDE_PHOTO_ADD_FAILURE, {data})
            reject(data)
          })
      })
  },

  removePhoto ({ commit, state }, args) {
    const sm = new SurveyingMarmot({ url: 'http://127.0.0.1:5000' })
    return new Promise(
      (resolve, reject) => {
        sm.RemovePhoto(args.token, { id: args.guide, photo: args.photo })
          .then(data => {
            commit(types.GUIDE_PHOTO_REMOVE_SUCCESS, { photo: args.photo, title: args.guide })
            resolve(data)
          })
          .catch(data => {
            // commit(types.GUIDE_PHOTO_ADD_FAILURE, {data})
            reject(data)
          })
      })
  }
}

const mutations = {
  [types.GUIDE_INFO_REQUEST] (state) {
    state.isRequesting = true
  },

  [types.GUIDE_INFO_SUCCESS] (state, { data }) {
    state.isRequesting = false
    state.guideData.set(data.short_name, data)
  },

  [types.GUIDE_INFO_FAILURE] (state) {
    state.isRequesting = false
  },

  [types.GUIDE_PHOTO_REQUEST] (state) {
    state.isRequestingPhoto = true
  },

  [types.GUIDE_PHOTO_SUCCESS] (state, { data, title }) {
    state.isRequestingPhoto = false
    state.guideData.get(title).photos = data
  },

  [types.GUIDE_PHOTO_FAILURE] (state) {
    state.isRequestingPhoto = false
  },

  [types.GUIDE_PHOTO_ADD_SUCCESS] (state, { photo, title }) {
    state.guideData.get(title).photos.push(photo)
  },

  [types.GUIDE_PHOTO_REMOVE_SUCCESS] (state, { photo, title }) {
    console.log(title)
    console.log(photo)
    console.log(state.guideData.get(title).photos)
    var photos = state.guideData.get(title).photos
    for (var i = 0; i < photos.length; ++i) {
      if (photos[i].id === photo) {
        state.guideData.get(title).photos.splice(i, 1)
        break
      }
    }
    console.log(state.guideData.get(title).photos)
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
