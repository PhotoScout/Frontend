<template>
    <div class="hero left">
        <h2 v-if="title">{{title}}</h2>
        <v-map class="mapOverlay" :zoom=13 :options=mapOptions :center="[guideLocation.latitude, guideLocation.longitude]">
                <v-tilelayer url="http://tile.stamen.com/watercolor/{z}/{x}/{y}.jpg "></v-tilelayer>
            </v-map>
    </div>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';

export default {
    name: 'heroMap',
    components: {
      'v-map': Vue2Leaflet.Map,
      'v-tilelayer' :Vue2Leaflet.TileLayer
    },
    data (){
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
        'guideLocation'
    ]
}
</script>

<style lang="scss">
@import "../styles/colors.scss";

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
    }

    &:after {
        content: " ";
        position: absolute;
        width: 150%;
        height: 8em;
        left: -25%;
        bottom: -4em;

        background-color: $background-light;
        transform: rotate(3deg);
    }

    .mapOverlay {
        position: absolute;
        z-index: -1;
        filter: blur(2px) brightness(70%);
        top: -5px;
        left: -5px;
        width: 101%;
    }
}
</style>
