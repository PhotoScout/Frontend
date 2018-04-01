<template>
  <div class="map">
    <v-map :zoom=13 :center="guideLocation(guideName)">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker v-for="(photo, index) in photos(guideName)" v-bind:key="index" v-if="photo.location.latitude!=0" :lat-lng="[photo.location.latitude, photo.location.longitude]" :icon="icon">
          <v-popup :content="getText(photo)"></v-popup>
        </v-marker>
    </v-map>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'guideMap',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer,
    'v-marker': Vue2Leaflet.Marker,
    'v-popup': Vue2Leaflet.Popup
  },
  props: [
    'guideName'
  ],
  data () {
    return {
      // eslint-disable-next-line
      icon: L.icon({
        iconUrl: 'src/assets/marker.png',
        iconSize: [35, 35],
        iconAnchor: [17, 35]
      })
    }
  },
  computed: {
    ...mapGetters({
      guide: 'guideInfo/getGuide',
      guideLocation: 'guideInfo/getGuideLocation',
      photos: 'guideInfo/getPhotos'
    })
  },
  methods: {
    getText: function (image) {
      return '<img src="' + image.url + '">'
    }
  }
}
</script>

<style>

  .map{
    height: 700px;
  }

</style>
