<template>
    <div class="item" v-on:click="selectAction" v-bind:fid="image.flickr_id">
        <span v-if="!view" class="indicator" :class="selection?'selected':null">
            <i v-if="image.latitude != 0" class="fa fa-map" aria-hidden="true"></i>
        </span>
        <img v-bind:src="getUrl(image)">

        <div class="infoLeft" v-if="view">
            <div class="remove" v-on:click="removeAction" ><i class="fa fa-trash" aria-hidden="true"></i></div>
            <router-link v-if="image.location.latitude != 0" :to="{ path: 'map', query: { photo: image.id }}">
                <i class="fa fa-map" aria-hidden="true"></i>
            </router-link>
        </div>

        <div class="description">
            <span class="title">{{image.title}}</span>
            <span class="owner">{{image.author || image.ownername}} - all rights reserved</span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'image-tile',
    props: ['image', 'selection', 'view'],
    data () {
        return {
        }
    },
    methods: {
        getUrl: function(image) {
            if(image.url)
                return image.url
            else {
                return 'https://farm'+ image.farm +'.staticflickr.com/'+  image.server +'/'+ image.id +'_'+ image.secret +'.jpg'
            }
        },
        selectAction: function(){
            this.$emit("selected")
        },
        removeAction: function(){
            this.$emit("removed")
        }
    }
}
</script>

<style lang="scss">
.item {
    display: block;
    overflow:hidden;

    .infoLeft{
        display: none;
        position: absolute;
        flex-direction: column;
        align-items: center;

        a{
            color: white;
        }
    }

    .remove {
        cursor: pointer;
    }

    &:hover {
        .description {
            // display: block;
            position: absolute;
            left: 0;
            right: 0;
            bottom: 0;
            height: 60px;
            background-position-y: 0px;
        }

        .infoLeft {
            display: flex;
            top: 0px;
            left: 0px;
            padding: 0.5em;
            font-weight: normal;
            font-style: normal;
            font-size: 1.5em;
            text-shadow: 2px 2px black;
        }
    }

    .indicator {
        position: absolute;
        margin: 0.2em;
        padding: 0;
        top: 10px;
        right: 10px;
        font-family: FontAwesome;
        font-weight: normal;
        font-style: normal;
        font-size: 1.5em;
        text-shadow: 2px 2px black;

        &:before {
            content: "\f10c";
            margin-right: 0.2em

        }
        &.selected:before {
            content: "\f111";
        }
    }

    .description {
        // display: none;
        position: absolute;
        padding: 0.5em;
        left: 0;
        right: 0;
        font-size: 0.9em;
        bottom:-100px;
        background: linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0) 100%);
        transition: bottom 0.2s;
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
    }
}
</style>
