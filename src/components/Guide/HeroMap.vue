<template>
  <div class="hero left">
    <h2 v-if="title">{{title}}</h2>
    <v-map v-if="location" class="mapOverlay" :zoom=13 :options=mapOptions :center="[location.latitude, location.longitude]">
      <v-tilelayer url="http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg "></v-tilelayer>
    </v-map>
  </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'hero',
  components: {
    'v-map': Vue2Leaflet.Map,
    'v-tilelayer': Vue2Leaflet.TileLayer
  },
  data () {
    return {
      mapOptions: {
        attributionControl: false,
        zoomControl: false,
        dragging: false,
        doubleClickZoom: false,
        boxZoom: false,
        scrollWheelZoom: false
      }
    }
  },
  props: [
    'title',
    'location'
  ]
}
</script>

<style scoped lang="scss">
@import "../../style/colors.scss";

  .hero {
    display: flex;
    position: relative;
    height: 25em;

    justify-content: center;
    align-items: center;

    overflow: hidden;

    background: no-repeat center top fixed;
    background-size: 100% auto;

    h2 {
      text-align: center;
      font-size: 3em;
      color: white;
    }

    &:after {
      content: " ";
      position: absolute;
      width: 150%;
      height: 8em;
      left: -25%;
      bottom: -4em;

      background-color: $background-white;
      transform: rotate(3deg);
    }

    .mapOverlay {
      position: absolute !important;
      z-index: -1;
      filter: blur(2px) brightness(80%);
      top: -5px;
      left: -5px;
      width: 101%;
    }
  }

  @media only screen and (max-width: 600px) {
    .hero {
      h2{
        font-size: 1.5em;
      }
    }
  }
</style>
