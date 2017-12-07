<template>
    <v-map :zoom="this.center.zoom" :center="this.center.location">
        <v-tilelayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"></v-tilelayer>
        <v-marker-cluster>
            <v-marker v-for="(photo, index) in photos" v-bind:key="index" v-if="photo.location.latitude!=0" :lat-lng="[photo.location.latitude, photo.location.longitude]" :icon="activePhoto == photo.id ? icon_a : icon">
                <v-popup :content="getText(photo)">Hello world</v-popup>
            </v-marker>
        </v-marker-cluster>
    </v-map>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import Vue2LeafletMarkerCluster from 'vue2-leaflet-markercluster'

export default {
    name: 'mapView',
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer' :Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker,
        'v-popup': Vue2Leaflet.Popup,
        'v-marker-cluster': Vue2LeafletMarkerCluster
    },
    props: ['photos', 'guideLocation'],
    data (){
        return {
            icon: L.icon({
                iconUrl: 'src/assets/marker.png',
                iconSize:     [35, 35],
                iconAnchor:   [17, 35]
            }),
            icon_a: L.icon({
                iconUrl: 'src/assets/marker_a.png',
                iconSize:     [35, 35],
                iconAnchor:   [17, 35]
            }),
            center: {
                location: [this.guideLocation.latitude, this.guideLocation.longitude],
                zoom: 13
            },
            activePhoto: -1
        }
    },
    mounted: function() {
        // Add a small delay to give a sense of zooming in
        setTimeout(() => {
        var photoId = this.$route.query.photo
        let photo = this.photos.find(x => x.id == photoId)

        if(photo !== undefined){
            this.center = {zoom:18, location: [photo.location.latitude, photo.location.longitude]}
            this.activePhoto = photoId
        }
        else
            this.center = {zoom:13, location: [this.guideLocation.latitude, this.guideLocation.longitude]}
        }, 500);
    },
    methods: {
        getText: function(image) {
            return "<img src='" + image.url + "'>"
        }
    }
}
</script>

<style lang="scss" scoped>
@import "~leaflet.markercluster/dist/MarkerCluster.css";
@import "~leaflet.markercluster/dist/MarkerCluster.Default.css";
.vue2leaflet-map{
    height: 700px;

    .leaflet-popup-content{
        img{
            width: 300px;
        }
    }
}
</style>
