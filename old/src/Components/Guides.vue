<template>
  <div id="guide-view">
    <swiper :options="swiperOption" ref="guideSwiper">
      <swiper-slide class="guide new">
        <input type="text" placeholder="New guide title" class="title input" v-model="newguide">
        <p v-if="newguide" class="title button" v-on:click="createGuide">Create!</p>
      </swiper-slide>
      <swiper-slide v-for="(guide, index) in sortedGuides" v-bind:key="index" class="guide" v-on:mouseover="onGuideSelected(guide)">
        <router-link :to="{ name: 'guide', params: { guideID: guide.id, view: 'info' }}">
          <div class="bg" v-bind:style='{backgroundImage: "url(" + guide.featured_image + ")", }'></div>
          <h3 class="title">{{guide.title}}</h3>
        </router-link>
      </swiper-slide>
      <div class="swiper-button-prev" slot="button-prev"></div>
      <div class="swiper-button-next" slot="button-next"></div>
    </swiper>
  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
import api from '../api'
import auth from '../auth'

export default {
  name: 'guides',
  components:{
    swiper,
    swiperSlide
  },

  props: ['keywords'],
  data () {
    return {
      guides: [],
      newguide: "",
      swiperOption: {
          slidesPerView: 4,
          centeredSlides: true,
          spaceBetween: 30,
          nextButton: '.swiper-button-next',
          prevButton: '.swiper-button-prev',
          onSlideChangeEnd: swiper => {
            if(swiper.realIndex == 0)
              this.$emit("guideSelected", "new")
            else
              this.$emit("guideSelected", this.guides[swiper.realIndex-1])
          }
        }
    }
  },

  mounted: function () {
    api.ListGuides(this, data => {this.guides = data.body}, function(){})
  },

  computed: {
    guideByDate: function () {
      return this.guides.sort((a,b) =>
        new Date(a.last_edited) < new Date(b.last_edited)
      )
    },
    sortedGuides: function() {
      if(this.keywords != ""){
        var sortedGuides = []
        var dateSortedGuides = this.guideByDate

        for(var i=0; i<dateSortedGuides.length; i++){
          var guide = dateSortedGuides[i]
          if(guide.title.toLowerCase().includes(this.keywords.toLowerCase()))
            sortedGuides.push(guide)
        }

        return sortedGuides

      }

      return this.guideByDate
    }
  },

  methods: {
    createGuide: function () {
      api.CreateGuide(this, data => {
        // Add the newly created to the guide display list
        this.guides.push(data.body)
        this.$refs.guideSwiper.swiper.slideTo(1)
      }, function(){}, {title: this.newguide})
    },
    onGuideSelected: function(guide) {
      this.$emit("guideSelected", guide)
    }
  }
}
</script>

<style src="swiper/dist/css/swiper.css"></style>

<style lang="scss">
#guide-view {
  display: block;
  position: relative;
  width: 100%;
  padding: 3em 0;

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
    // margin: 3em;
    border-radius: 0.5em;

    overflow: hidden;

    border: 1px solid #333;

    &.swiper-slide-active{
      border: 1px solid #F39C12;
      .bg{
        filter: sepia(20%) saturate(70%) brightness(0.7);
      }
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
      z-index: -1;
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
}


</style>
