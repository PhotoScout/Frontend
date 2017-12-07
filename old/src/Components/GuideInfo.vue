<template>
<section id="guideInfo" v-if="guide!='new'">
    <div id="guideFullInfo">
        <section class="infoSection">
            <h3>Gear</h3>
            <lensViewer :photos="photos"></lensViewer>
        </section>

        <section class="infoSection" v-if="guide.location.latitude">
            <h3>Weather</h3>
            <weatherView :id="guide.id" :location="guide.location"></weatherView>
        </section>
    </div>
    <div id="guideShortInfo">
        <div class="smallMap" v-if="guide.location.latitude">
            <v-map :zoom=4 :options=mapOptions :center="[guide.location.latitude, guide.location.longitude]">
                <v-tilelayer url="http://tile.stamen.com/toner-background/{z}/{x}/{y}.png "></v-tilelayer>
                <v-marker :lat-lng="[guide.location.latitude, guide.location.longitude]" :icon="icon"></v-marker>
            </v-map>
        </div>
        <ul>
            <li>
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                <strong>Created:</strong>
                {{formatDate(guide.creation)}}
            </li>
            <li>
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                <strong>Edited:</strong>
                {{formatDate(guide.last_edited)}}
            </li>
            <li>
                <i class="fa fa-users" aria-hidden="true"></i>
                <strong>Visibility:</strong>
                {{guide.visibility ? 'Public' : 'Private'}}
            </li>
            <li>
                <i class="fa fa-picture-o" aria-hidden="true"></i>
                <strong>Pictures:</strong>
                {{guide.number_photo}}
            </li>
        </ul>
        <div id="settings">
            <div class="button" v-on:click="deleteGuide">
                <i class="fa fa-trash-o" aria-hidden="true"></i>
                Remove
            </div>

            <div class="button" v-on:click="changeGuideVisibility">
                <i class="fa fa-users" aria-hidden="true"></i>
                Change to {{!guide.visibility ? 'Public' : 'Private'}}
            </div>
        </div>
    </div>
</section>
<section id="guideInfo" v-else>
    <h2>Let's create a new guide</h2>
</section>
</template>

<script>
import Vue2Leaflet from 'vue2-leaflet';
import moment from 'moment';
import api from '../api'
import lens from '../scripts/lens'
import SVG from 'svg.js'
import lensViewer from './LensViewer.vue'
import weatherView from './WeatherView.vue'

export default {
    name: 'guideinfo',
    components: {
        'v-map': Vue2Leaflet.Map,
        'v-tilelayer' :Vue2Leaflet.TileLayer,
        'v-marker': Vue2Leaflet.Marker,
        lensViewer,
        weatherView
    },
    props: ['guide'],
    data () {
        return {
            mapOptions: {
                attributionControl: false,
                zoomControl: false,
                dragging: false,
                doubleClickZoom: false,
                boxZoom: false,
                scrollWheelZoom: false
            },
            photos: [],
            icon: L.icon({
                iconUrl: 'src/assets/marker.png',
                iconSize:     [35, 35],
                iconAnchor:   [17, 35]
            })
        }
    },
    mounted: function() {
        api.GetGuidePhoto(this, data => {this.photos = data.body}, function(){}, {guide_id: this.guide.id})
    },
    watch: {
        guide: function (){
            api.GetGuidePhoto(this, data => {this.photos = data.body}, function(){}, {guide_id: this.guide.id})
        }
    },
    methods: {
        formatDate: function (date) {
            return moment(date).format("MMM Do YY");
        },

        deleteGuide: function() {
            api.DeleteGuide(this, function(){}, function(){}, {"guide_id": this.guide.id})
        },

        changeGuideVisibility: function() {
            api.UpdateGuide(this, function(){}, function(){}, {
                "guide_id": this.guide.id,
                "guide_info": {
                    "visibility": this.guide.visibility == 0 ? 1 : 0
                }
            })
        }
    },
}
</script>

<style lang="scss">
@import "../../node_modules/leaflet/dist/leaflet.css";
@import "../styles/colors.scss";

#guideInfo {
    display: flex;
    flex-direction: row;

    color: $background-dark;

    #guideShortInfo {
        width: 20%;
        // border-right: 3px solid $border-light;
        padding-top: 2em;

        .smallMap {
            margin: 1em;
            height: 20em;
            border-radius: 0.5em;
            overflow: hidden;
        }

        ul {
            margin-top: 2em;
            list-style: none;
            font-size: 1.2em;

            li {
                margin: 0.5em 0;
                font-weight: lighter;

                i {
                    margin-right: 0.5em;
                }

                strong {
                    font-weight: normal;
                }
            }
        }

        #settings {
            width: 100%;
            text-align: center;

            .button {
                background-color: $box-light-2;
                width: 60%;
                margin: 1em auto;
                padding: 1em;

                &:hover {
                    background-color: $background-dark;
                    color: $box-light-2;
                }
            }
        }
    }

    #guideFullInfo {
        color: black;
        text-align: center;
        flex-grow: 1;
        margin-top: 2em;
        padding: 1em;
    }
}
</style>
