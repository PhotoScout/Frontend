<template>
<div id="search-view" >
    <searchbar v-bind:button="true" v-on:search="searchImage"></searchbar>
    <div id="search-results" class="flexbin">
        <image-tile v-for="(photo, index) in photos" v-bind:key="index" v-bind:image.sync="photo" v-bind:selection="alreadyIn(photo)" v-on:selected="addImage(photo)"></image-tile>
        <infinite-loading @infinite="infiniteHandler" v-if="photoLoaded"></infinite-loading>
    </div>
</div>
</template>

<script>
import imageTile from './ImageTile.vue'
import searchbar from './SearchBar.vue'
import Vue from 'vue'
import api from '../api'
import InfiniteLoading from 'vue-infinite-loading'

export default {
    name: 'searchPhoto',
    components: {
        imageTile,
        searchbar,
        InfiniteLoading
    },
    props: [
        "guideID",
        "IDList"
    ],
    data () {
        return {
            photos: [],
            photoLoaded: false,
            currentPage: 1,
            currentTags: ""
        }
    },
    methods: {
        searchImage: function (tags) {
            this.photos = []
            this.currentTags = tags
            this.currentPage = 1
            api.SearchPhoto(this, data => {
                // get body data
                this.photos =  data.body.photos.photo

                setTimeout(() => {
                    this.photoLoaded = true
                },1000)

            }, function(){}, {keywords: tags.split(" ")})
        },

        addImage:function(photo) {
            api.AddPhoto(
                this,
                data => {
                    // Send the image to the parent for a smoother experience
                    this.$emit("added", data.body)
                }
                , function(){}, {
                    "guide_id": this.guideID,
                    "image": {
                        "origin": "flickr",
                        "id": photo.id
                    }
                }
            )
        },

        alreadyIn:function(image) {
            if(this.IDList.indexOf(image.id) != -1)
                return true
            else
                return false
        },

        infiniteHandler($state) {
            console.log("End of the line")
            this.currentPage++

            api.SearchPhoto(this, data => {
                // get body data
                this.photos = this.photos.concat(data.body.photos.photo)

                if(data.body.photos.photo.length==0)
                    this.photoLoaded = false

                setTimeout(() => {
                    $state.loaded()
                },100)

            }, function(){}, {keywords: this.currentTags.split(" "), page: this.currentPage})
        },
    }

}
</script>

<style lang="scss">
@import "../styles/flexbin.scss";

.infinite-loading-container {
    width: 100%;
}
</style>

