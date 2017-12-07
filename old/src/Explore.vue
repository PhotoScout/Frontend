<template>
<div id="explore-page">
    <navbar></navbar>

    <hero title="Get inspired" image="inspiration.jpg" left="true"></hero>

    <section id="guides">
        <div v-for="(guide, index) in guideByDate" v-bind:key="index" class="guide">
            <router-link :to="{ name: 'guide', params: { guideID: guide.id, view: 'view' }}">
                <div class="bg" v-bind:style='{backgroundImage: "url(" + guide.featured_image + ")", }'></div>
                <h3 class="title">{{guide.title}}</h3>
            </router-link>
        </div>
    </section>
</div>
</template>

<script>
import navbar from './Components/Navbar.vue'
import hero from './Components/Hero.vue'

import api from './api'

export default {
    name: 'explore',
    components: {
        navbar,
        hero
    },
    data () {
        return {
            guides: []
        }
    },
    mounted: function () {
        api.GetPublicGuides(this, data => { this.guides = data.body}, function(){})
    },

    computed: {
        guideByDate: function () {
            return this.guides.sort((a,b) =>
            new Date(a.creation) < new Date(b.creation)
            )
        }
    }
}
</script>

<style lang="scss">
#guides {
    display: flex;
}

.guide {
    display: flex;
    align-items: center;

    flex: 10 0 auto;
    position: relative;
    flex-grow: 0;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 25em;
    height: 18em;
    margin: 3em;
    border-radius: 0.5em;

    overflow: hidden;

    &:hover .bg{
      filter: sepia(20%) saturate(70%) brightness(0.7);
    }

    .bg {
      background: no-repeat center center;
      background-size: cover;
      filter: sepia(70%) saturate(90%) brightness(0.4);
      position: absolute;
      width: 110%;
      height: 110%;
      top: -5%;
      left: -5%;
      z-index: 1;
    }

    .title {
      color: white;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      text-align: center;
      // margin-top: 1em;
      font-size: 2em;
      font-weight: normal;
      position: relative;

      text-align: center;
      width: 100%;
      z-index: 2;
      text-shadow: 0px 0px 4px black;
    }

    &.new {
      border: 2px dashed #ccc;

      &:hover {
        background-color: #252525;
      }

      .title {
        font-size: 2em;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-weight: normal;

        &.input {
          border: none;
          background: none;
        }

        &.button {
          font-weight: 300;
          font-size: 1.2em;
        }
      }
    }
  }
</style>
