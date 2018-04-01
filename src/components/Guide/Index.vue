<template>
  <div id="guide" v-if="loaded == 2">
    <hero :title="guide(guideName).title" :location="guide(guideName).location"></hero>
    <ul class="navigation">
      <li><router-link :to="{name:'Guide'}">
        <div class="icon">
          <icon name="book"></icon>
        </div>
        <span>Guide</span>
      </router-link></li>
      <li><router-link to="photo">
        <div class="icon">
          <icon name="camera-retro"></icon>
        </div>
        <span>Photo</span>
      </router-link></li>
      <li><router-link to="map">
        <div class="icon">
          <icon name="map-o"></icon>
        </div>
        <span>Map</span>
      </router-link></li>
      <li><router-link to="search">
        <div class="icon">
          <icon name="search"></icon>
        </div>
        <span>Search</span>
      </router-link></li>
    </ul>
    <router-view id="guide-content"></router-view>
  </div>
  <div v-else>
    <hero title="" image="guide.jpg" top="-200px"></hero>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import hero from './HeroMap'

export default {
  name: 'guide',
  components: {
    hero
  },
  data: () => {
    return {
      loaded: 0
    }
  },
  props: [
    'guideName'
  ],
  mounted: function () {
    this.$store.dispatch('guideInfo/queryGuideInfo', {token: this.$store.state.user.token, title: this.guideName}).then(data => {
      this.loaded++
    }).catch(data => {
      console.log(data)
    })
    this.$store.dispatch('guideInfo/queryGuidePhoto', {token: this.$store.state.user.token, title: this.guideName}).then(data => {
      this.loaded++
    }).catch(data => {
      console.log(data)
    })
  },
  computed: {
    ...mapGetters({
      isRequesting: 'guideInfo/isRequesting',
      guide: 'guideInfo/getGuide'
    })
  }
}
</script>

<style scoped lang="scss">
@import "../../style/colors.scss";

  #guide-content{
    min-width: 600px;
    width: 60%;
    max-width: 1200px;
    margin: auto;
    padding: 0 1em;
  }

  .navigation{
    margin: 1em auto;
    padding: 0;
    list-style: none;
    width: 100%;
    text-align: center;

    li{
      display: inline-block;
      margin: 0;
      padding: 1em;

      a{
        color: #aaa;
        margin: 0;
        padding: 0.5em;

        display: flex;
        flex-direction: column;

        &:hover, &.router-link-exact-active{
          color: $primary-color-1;

          .icon{
            background-color: $primary-color-1;
            color: white;
            border-color: $primary-color-1;
          }
        }

        .icon{
          width: 70px;
          height: 70px;
          border-radius: 35px;
          border: 3px solid #eee;
          background-color: white;
          display: flex;
          align-items: center;
          justify-content: center;

          .fa-icon{
            height: 24px;
            width: auto;
          }
        }

        span{
          margin-top: 1em;
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    #guide-content{
      min-width: 0;
      width: 100%;
    }
    .navigation li a{
      padding: 0.5em 0.1em;
    }
  }
</style>
