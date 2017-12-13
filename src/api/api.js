/* eslint-disable */

import Vue from 'vue'
import VueResource from 'vue-resource'

Vue.use(VueResource)

import auth from './auth'

var IS_HEROKU = process.env.IS_HEROKU_PROD || false

var URL_ORIGIN_HEROKU = "https://murmuring-fjord-85655.herokuapp.com"
var URL_ORIGIN_LOCAL = "http://127.0.0.1:5000"
var URL_ORIGIN = (IS_HEROKU ? URL_ORIGIN_HEROKU : URL_ORIGIN_LOCAL)

var URL_API_VERSION = "/api/v1"

// User related entrypoints
var ENTRYPOINT_USER_AUTHENTICATION = "/user/auth"
var ENTRYPOINT_USER_ADMINISTRATION = "/user"
var ENTRYPOINT_USER_INFORMATION = "/user/info"

// Guide related entrypoints
var ENTRYPOINT_GUIDE_PUBLIC_LISTING = "/public/guides"
var ENTRYPOINT_GUIDE_LISTING = "/guides"
var ENTRYPOINT_GUIDE_INTERACTION = "/guide"
var ENTRYPOINT_GUIDE_PHOTO_INTERACTION = "/guide/photo"


var ENTRYPOINT_GUIDE_NEAR = "/guide/near"


var ENTRYPOINT_USER_INFO = "/user"

var ENTRYPOINT_USER_GEAR = "/user/gear"

var ENTRYPOINT_GUIDE = "/guide"

var ENTRYPOINT_GUIDES = "/guides"

var ENTRYPOINT_GUIDES_PUBLIC = "/guides/public"

var ENTRYPOINT_PHOTO_SELECTED = "/photos/selected"

var ENTRYPOINT_PHOTO_SEARCH = "/photos/search"

var ENTRYPOINT_WEATHER = "/weather"

function Get(entrypoint, success, failure, headers, args) {
  let url =  URL_ORIGIN + URL_API_VERSION + entrypoint

  if(args){
    var argsString = []
    Object.keys(args).map(function(key, index) {
      if(args[key] instanceof Array) {
        argsString.push(key + "=" + args[key].join("+"))
      }
      else {
        argsString.push(key + "=" + args[key])
      }
    })
    url += "?" + argsString.join("&")
  }

  Vue.http.get(url, {
    headers: headers,
  }).then(
    data => { success(data) },
    response => { failure(response) }
  )
}

function Post(entrypoint, success, failure, headers, body) {
  Vue.http.post( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
    headers: headers
  }).then(
    data => { success(data) },
    response => { failure(response) }
  )
}

function Put(entrypoint, success, failure, headers, body) {
  Vue.http.put( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
    headers: headers
  }).then(
    data => { success(data) },
    response => { failure(response) }
  )
}

function Patch(entrypoint, success, failure, headers, body) {
  Vue.http.patch( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
    headers: headers
  }).then(
    data => { success(data) },
    response => { failure(response) }
  )
}

function Delete(entrypoint, success, failure, headers, body) {
  Vue.http.delete( URL_ORIGIN + URL_API_VERSION + entrypoint, {
    headers: headers,
    body: body
  }).then(
    data => { success(data) },
    response => { failure(response) }
  )
}

export default {
  // User related api
  ValidateToken(success, failure) {
    return new Promise((resolve, reject) => Get(
      ENTRYPOINT_USER_AUTHENTICATION,
      data => {
        resolve()
      }, data => {
        reject()
      },
      auth.getAuthHeader()
    ))
  },
  LoginUser(creds, success, failure) {
    return new Promise((resolve, reject) => Post(
      ENTRYPOINT_USER_AUTHENTICATION,
      data => {
        let loginInfo = {
          username: creds.username,
          token: data.body.token
        }
        resolve(loginInfo)
      }, data => {
        reject(data.body)
      }, {
        "Authorization": "Basic " + btoa(creds.username + ":" + creds.password)
      })
    )
  },
  GetUserInfo(success, failure) {
      Get(ENTRYPOINT_USER_INFORMATION, success, failure, auth.getAuthHeader())
  },
  UpdateUserInfo(success, failure, data) {
      Patch(ENTRYPOINT_USER_INFORMATION, success, failure, auth.getAuthHeader(), data)
  },
  Signup(success, failure, data) {
      Post(ENTRYPOINT_USER_ADMINISTRATION, success, failure, {}, data)
  },

  // User gear related api
  GetUserGear(success, failure) {
      Get(ENTRYPOINT_USER_GEAR, success, failure, auth.getAuthHeader())
  },
  AddUserGear(success, failure, data) {
      Post(ENTRYPOINT_USER_GEAR, success, failure, auth.getAuthHeader(), data)
  },


  // Guide related API

  ListGuides(success, failure) {
      Get(ENTRYPOINT_GUIDE_LISTING, success, failure, auth.getAuthHeader())
  },

  CreateGuide(success, failure, data) {
      Post(ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  DeleteGuide(success, failure, data) {
      Delete(ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  UpdateGuide(success, failure, data) {
      Patch(ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  GetPublicGuides(success, failure) {
      Get(ENTRYPOINT_GUIDE_PUBLIC_LISTING, success, failure, {})
  },

  GetGuidePhoto(success, failure, data) {
      Get(ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  GetGuideInfo(success, failure, data) {
      Get(ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  SearchPhoto(success, failure, data) {
      Get(ENTRYPOINT_PHOTO_SEARCH, success, failure, auth.getAuthHeader(), data)
  },

  GuideNear(success, failure, data) {
      Get(ENTRYPOINT_GUIDE_NEAR, success, failure, auth.getAuthHeader(), data)
  },

  // Photo related API
  AddPhoto(success, failure, data) {
      Post(ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },
  RemovePhoto(success, failure, data) {
      Delete(ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
  },

  // Weather related API
  GetGuideWeather(success, failure, data) {
      Get(ENTRYPOINT_WEATHER, success, failure, auth.getAuthHeader(), data)
  }
}
