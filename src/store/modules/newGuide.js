import * as types from '../mutation-types'
import SurveyingMarmot from '../../api/SurveyingMarmotAPI'
import { stat } from 'fs';

// local mutations
const NEW_GUIDE_INIT = 'NEW_GUIDE_INIT'
const NEW_GUIDE_SET_LOCATION = 'NEW_GUIDE_SET_LOCATION'
const NEW_GUIDE_SEARCH_SUCCESS = 'NEW_GUIDE_SEARCH_SUCCESS'
const NEW_GUIDE_SELECT_PHOTO = 'NEW_GUIDE_SELECT_PHOTO'

const state = {
  name: false,
  location: {
    lat: undefined,
    lon: undefined
  },
  photos: [],
  selectedPhotos: []
}

const getters = {
}

const actions = {
  initGuide({commit, state}, guideName) {
    commit(NEW_GUIDE_INIT, guideName)
  },

  locateGuide({commit, state}, data) {
    commit(NEW_GUIDE_SET_LOCATION, {lat: data.lat, lon: data.lon})

    // Search for nearby photos
    const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
    return new Promise((resolve, reject) => {
      sm.SearchPhotoNear(data.token, state.location.lat, state.location.lon, 0, 10).then(data => {
        commit(NEW_GUIDE_SEARCH_SUCCESS, data.photos.photo)
        resolve(true)
      }).catch(data => {
        console.log(data)
        reject(data)
      })
    })
  },

  selectPhoto({commit, state}, photo) {
    commit(NEW_GUIDE_SELECT_PHOTO, photo)
  },

  createGuide({commit, state}, token) {
    // Let's create the new guide
    const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
    return new Promise((resolve, reject) => {
      sm.CreateGuide(token, state.name).then(data => {
        var guideId = data.short_name

        // And add the photos
        for (var photo of state.selectedPhotos) {
          sm.AddPhoto(token, {guide_id: guideId, image: { origin: 'flickr', id: photo.id }})
        }
        resolve(true)
      }).catch(data => {
        console.log(data)
        reject(data)
      })
    })
  }
}

const mutations = {
  [NEW_GUIDE_INIT] (state, guideName) {
    state.name = guideName
    state.location.lat = undefined
    state.location.lon = undefined
    state.photos = []
    state.selectedPhotos = []
  },
  [NEW_GUIDE_SET_LOCATION] (state, data) {
    state.location.lat = data.lat
    state.location.lon = data.lon
    state.photos = []
    state.selectedPhotos = []
  },
  [NEW_GUIDE_SEARCH_SUCCESS] (state, data) {
    state.photos = data
  },
  [NEW_GUIDE_SELECT_PHOTO] (state, data) {
    var location = state.selectedPhotos.indexOf(data)
    if(location === -1) {
      state.selectedPhotos.push(data)
    } else {
      state.selectedPhotos.splice(location, 1)
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
