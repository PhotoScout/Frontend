<template>
  <div id="guide-page">
      <navbar></navbar>

    <heroMap :title="guide.title" :guideLocation="guide.location"></heroMap>

    <nav id="app-nav" class="" v-scroll="navScroll">
      <ul>
        <li><router-link to="info">Info</router-link></li>
        <li><router-link to="view">View</router-link></li>
        <li><router-link to="search" v-if="authenticated">Search</router-link></li>
        <li><router-link to="map" v-if="guide.location.latitude">Map</router-link></li>
      </ul>
    </nav>
    <div v-if="view=='view'" id="photo" class="flexbin">
      <image-tile v-for="(image, index) in photos" v-bind:key="index" v-bind:image.sync="image" v-bind:selection="true" v-on:removed="removePhoto(image)" view="true"></image-tile>
      <!-- <infinite-loading @infinite="infiniteHandler" v-if="photoLoaded"></infinite-loading> -->
    </div>

    <photoSearch v-if="view=='search'" :guideID="guide.id" v-on:added="addPhoto" :IDList="photoIDList"></photoSearch>

    <div v-if="view=='map' && guide.location.latitude && photos.length != 0" id="map-view" >
      <mapView :photos="photos" :guideLocation="guide.location"></mapView>
    </div>


    <div v-if="view=='info'" id="info-view">
      <infoView :guide="guide" :photos="photos"></infoView>
    </div>
  </div>
</template>

<script>
import api from './api'
import imageTile from './Components/ImageTile.vue'
import navbar from './Components/Navbar.vue'
import searchbar from './Components/SearchBar.vue'
import auth from './auth'
import Vue from 'vue'
import Vue2Leaflet from 'vue2-leaflet';
import heroMap from './Components/HeroMap.vue'
import photoSearch from './Components/PhotoSearch.vue'
import mapView from './Components/MapView.vue'
import infoView from './Components/InfoView.vue'
import InfiniteLoading from 'vue-infinite-loading'

export default {
  name: 'guide',
  components:{
      navbar,
      imageTile,
      searchbar,
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer' :Vue2Leaflet.TileLayer,
      'v-marker': Vue2Leaflet.Marker,
      heroMap,
      photoSearch,
      mapView,
      infoView,
      InfiniteLoading
  },
  props: ['guideID', 'view'],
  data () {
    return {
      guide: {},
      photos: [],
      authenticated: auth.user.authenticated,
      photoLoaded: false,
      currentPage: 0
    }
  },

  mounted: function () {
    api.GetGuideInfo(this, data => {this.guide = data.body}, function(){}, {guide_id: this.guideID})
    api.GetGuidePhoto(this, data => {
      this.photos = data.body
      this.photoLoaded=true
    }, function(){}, {
      guide_id: this.guideID,
      per_page: 60
    })
  },

  computed: {
    photoIDList: function(){
      var IDList = []

      for(var i=0; i<this.photos.length; i++){
        IDList.push(this.photos[i].flickr_id)
      }

      return IDList
    }
  },

  methods: {
    navScroll: function(){
      var el = document.getElementById('app-nav')
      var top = el.getBoundingClientRect().top

      console.log(top)
    },
    removePhoto: function(image){
      api.RemovePhoto(this, function(){}, function(){}, {
        "guide_id": this.guideID,
        "photo_id": image.id
      })

      this.photos.splice(this.photos.indexOf(image), 1)
    },
    addPhoto: function(photo) {
      this.photos.push(photo)
    },
    infiniteHandler($state) {
      console.log("End of the line")
      this.currentPage++
      api.GetGuidePhoto(this, data => {
          // get body data
          this.photos = this.photos.concat(data.body)

          if(data.body.length==0)
              this.photoLoaded = false

          setTimeout(() => {
              $state.loaded()
          },100)

      }, function(){}, {guide_id: this.guideID, page: this.currentPage})
    },
  }
}
</script>


<style lang="scss">
@import "styles/global.scss";
@import "../node_modules/leaflet/dist/leaflet.css";

$flexbin-row-height: 320px;

@import "styles/flexbin.scss";

#app-nav {
  display: block;
  padding: 1em 2em;
  height: 3em;
  width: 100%;

  ul  {
    margin: 0;
    list-style: none;
    display: flex;
    justify-content: flex-end;

    li {
      float: left;
      color: #333;
      line-height: 2em;
      font-size: 1.5em;
      margin-right: 1em;

      a {
        color:#333;
        &:hover {
          color: $primary-color-1;
        }
      }
    }
  }

  &.vertical{
    ul {
      position: fixed;
      text-align: right;
      flex-direction: column;
    }
  }
}
#map-view {
    width: 82%;
    margin: 2em auto;
}

#photo, #search-view, #info-view {
  width: 82%;
  margin: 2em auto;
}
</style>
