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

function Get(context, entrypoint, success, failure, headers, args) {
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

function Post(context, entrypoint, success, failure, headers, body) {
    Vue.http.post( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
        headers: headers
    }).then(
        data => {
          success(data) },
        response => { failure(response) }
    )
}

function Put(context, entrypoint, success, failure, headers, body) {
    Vue.http.put( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
        headers: headers
    }).then(
        data => { success(data) },
        response => { failure(response) }
    )
}

function Patch(context, entrypoint, success, failure, headers, body) {
    Vue.http.patch( URL_ORIGIN + URL_API_VERSION + entrypoint, body, {
        headers: headers
    }).then(
        data => { success(data) },
        response => { failure(response) }
    )
}

function Delete(context, entrypoint, success, failure, headers, body) {
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
    ValidateToken(context, success, failure) {
        Get(context, ENTRYPOINT_USER_AUTHENTICATION, success, failure, auth.getAuthHeader())
    },
    LoginUser(context, creds, success, failure) {
        Post(context, ENTRYPOINT_USER_AUTHENTICATION, (data) => {
          let loginInfo = {
            username: creds.username,
            token: data.body.token
          }
          success(loginInfo)
        }, (data) => {
          failure(data.body)
        }, {
            "Authorization": "Basic " + btoa(creds.username + ":" + creds.password)
        })
    },
    GetUserInfo(context, success, failure) {
        Get(context, ENTRYPOINT_USER_INFORMATION, success, failure, auth.getAuthHeader())
    },
    UpdateUserInfo(context, success, failure, data) {
        Patch(context, ENTRYPOINT_USER_INFORMATION, success, failure, auth.getAuthHeader(), data)
    },
    Signup(context, success, failure, data) {
        Post(context, ENTRYPOINT_USER_ADMINISTRATION, success, failure, {}, data)
    },

    // User gear related api
    GetUserGear(context, success, failure) {
        Get(context, ENTRYPOINT_USER_GEAR, success, failure, auth.getAuthHeader())
    },
    AddUserGear(context, success, failure, data) {
        Post(context, ENTRYPOINT_USER_GEAR, success, failure, auth.getAuthHeader(), data)
    },


    // Guide related API

    ListGuides(context, success, failure) {
        Get(context, ENTRYPOINT_GUIDE_LISTING, success, failure, auth.getAuthHeader())
    },

    CreateGuide(context, success, failure, data) {
        Post(context, ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    DeleteGuide(context, success, failure, data) {
        Delete(context, ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    UpdateGuide(context, success, failure, data) {
        Patch(context, ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    GetPublicGuides(context, success, failure) {
        Get(context, ENTRYPOINT_GUIDE_PUBLIC_LISTING, success, failure, {})
    },

    GetGuidePhoto(context, success, failure, data) {
        Get(context, ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    GetGuideInfo(context, success, failure, data) {
        Get(context, ENTRYPOINT_GUIDE_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    SearchPhoto(context, success, failure, data) {
        Get(context, ENTRYPOINT_PHOTO_SEARCH, success, failure, auth.getAuthHeader(), data)
    },

    GuideNear(context, success, failure, data) {
        Get(context, ENTRYPOINT_GUIDE_NEAR, success, failure, auth.getAuthHeader(), data)
    },

    // Photo related API
    AddPhoto(context, success, failure, data) {
        Post(context, ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },
    RemovePhoto(context, success, failure, data) {
        Delete(context, ENTRYPOINT_GUIDE_PHOTO_INTERACTION, success, failure, auth.getAuthHeader(), data)
    },

    // Weather related API
    GetGuideWeather(context, success, failure, data) {
        Get(context, ENTRYPOINT_WEATHER, success, failure, auth.getAuthHeader(), data)
    }
}
