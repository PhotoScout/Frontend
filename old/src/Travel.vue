<template>
  <div id="travel-page">
    <navbar></navbar>

    <hero title="Plan your next adventure" image="travel.jpg" dark="true" top="-400px"></hero>

    <div id="guides">
      <div id="search">
        <i class="fa fa-search" aria-hidden="true"></i>
        <input type="text" placeholder="Search..." v-model="keywords">
      </div>
      <guides v-on:guideSelected="guideSelected" :keywords="keywords"></guides>
    </div>
    <guideinfo :guide="this.guide"></guideinfo>
  </div>
</template>

<script>
import navbar from './Components/Navbar.vue'
import guides from './Components/Guides.vue'
import hero from './Components/Hero.vue'
import guideinfo from './Components/GuideInfo.vue'

export default {
  name: 'travel',
  components:{
    navbar,
    guides,
    hero,
    guideinfo
  },
  data () {
    return {
      guide:"new",
      keywords:""
    }
  },
  methods: {
    guideSelected: function (guide) {
      this.guide = guide
    }
  }
}
</script>

<style lang="scss">
@import "styles/global.scss";

#travel-page {

  #guides {
    background-color: #222;
    display: block;
    padding: 0em 2em;

    #search {
      width: 100%;
      padding: 1em 2em;
      text-align: center;
      display: flex;
      color: #ccc;
      font-size: 2em;

      input {
        border: none;
        background: none;
        width: 100%;
        color: #eee;
        font-size: 1em;
        margin-left: 1em;
      }
    }
  }

  #guide-info {
    background-color: #FCFCFC;
    padding: 3em 2em;

    h2 {
      margin: 0;
      color: #222;
    }
  }
}
</style>
