<template>
    <div id="places-view">
        <i v-if="!loaded"  class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
        <router-link v-if="loaded" v-for="place in places" :to="{path: 'search', query: { query: place.name }}">
            <div class="place">
                <div class="image" v-bind:style='{backgroundImage: "url(" + place.image + ")"}'></div>
                <span class="name">{{place.name}}</span>
            </div>
        </router-link>
        <p v-if="loaded && places.length == 0">No landmarks found nearby ...</p>
    </div>
</template>

<script>
import api from '../api'
export default {
    name: 'placesNear',
    props: [
        "guide"
    ],
    data () {
        return {
            places: [],
            loaded: false
        }
    },
    mounted() {
        api.GuideNear(
            this,
            data=>{
                this.places = data.body
                this.loaded = true
            },
            error => {
                console.log(error)
            },
            {id: this.guide.id}
        )
    },
}
</script>

<style lang="scss">
@import "../styles/colors.scss";
#places-view{
    color: #333;
    display: flex;
    margin-bottom: 5em;
    flex-wrap: wrap;
    justify-content: center;

    .place{
        width: 12em;
        height: 12em;
        margin: 1em;
        margin-bottom: 6em;
    }
    .image{
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-position: center center;
        background-size: cover;
        border: 3px solid $primary-color-1;
        margin-bottom: 0.5em;
    }
    .name {
        display: block;
        text-align: center;
        width: 100%;
        font-size: 1.2em;
        color: #333;
    }
}
</style>
