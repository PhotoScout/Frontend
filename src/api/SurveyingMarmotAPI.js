import Request from './request'
import * as entrypoints from './entrypoints'

class SurveyingMarmot{
  constructor (options) {
    this.baseUrl = options.url
    this.req = new Request(this.baseUrl, options.debug || undefined)
  }

  ValidateToken(token) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.USER_AUTHENTICATION.validateToken, {token: token}).then(
        data => resolve()
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  RetrieveToken(username, password) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.USER_AUTHENTICATION.retrieveToken, {username: username, password: password}).then(
        data => resolve(data.token)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  GetPublicGuides() {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDES_LISTING.listGuidesPublic).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  GetGuides(token) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDES_LISTING.listGuides, {token: token}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  GetGuideInfo(token, id) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE.guideInfo, {token: token, args: {guide_id: id}}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  CreateGuide(token, title) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE.createGuide, {token: token, body: {title: title}}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  ModifyGuide(token, data) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE.editGuide, {token: token, body: data}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  DeleteGuide(token, id) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE.deleteGuide, {token: token, args: {guide_id: id}}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }



  GetPhotoList(token, id) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE_PHOTO.listPhotos, {token: token, args: {guide_id: id}}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  RemovePhoto(token, data) {
    return new Promise((resolve, reject) => {
      console.log(data)
      this.req.Call(entrypoints.GUIDE_PHOTO.removePhoto, {token: token, args: {guide_id: data.id, photo_id: data.photo}}).then(
        data => resolve(data)
      ).catch(
        data => reject({code:data.statusCode, message: data.error})
      )
    })
  }

  AddPhoto(token, data) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.GUIDE_PHOTO.addPhoto, {token: token, body: data}).then(
        data => resolve(data)
      ).catch(
        data => reject({code: data.statusCode, message: data.error})
      )
    })
  }

  SearchPhoto(token, keywords, page=0, per_page=20) {
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.PHOTO_SEARCH.searchPhoto, {token: token, args: {
        keywords: keywords,
        page: page,
        per_page: per_page
      }}).then(
        data => resolve(data)
      ).catch(
        data => reject({code: data.statusCode, message: data.error})
      )
    })
  }

  SearchPhotoNear(token, lat, lon, page=0, per_page=20) {
    console.log("There")
    console.log(lat)
    console.log(lon)
    return new Promise((resolve, reject) => {
      this.req.Call(entrypoints.PHOTO_SEARCH.searchPhotoNear, {token: token, args: {
        lat: lat,
        lon: lon,
        page: page,
        per_page: per_page
      }}).then(
        data => resolve(data)
      ).catch(
        data => reject({code: data.statusCode, message: data.error})
      )
    })
  }
}

export default SurveyingMarmot
