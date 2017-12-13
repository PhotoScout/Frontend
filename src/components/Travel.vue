<template>
  <div id="travel">
    <hero title="Plan your next adventure" image="travel.jpg" dark="true" top="-200px"></hero>

    <div id="guideDisplay">
      <section id="guideWrapper">
        <p id="guideNumber">{{guides.length}} Guides</p>
        <create-guide></create-guide>
        <div id="guideList" v-if="!isRequesting">
          <router-link :to="{ name: 'Guide', params: { guideName: guide.short_name }}" class="guide" v-for="(guide, index) in guides" v-bind:key="index" >
            <div class="featuredImage" v-bind:style='{backgroundImage: "url(" + guide.featured_image + ")"}'></div>
            <div class="info">
              <h2>{{guide.title}}</h2>
              <span class="category">Trip</span>
            </div>
            <div class="footer">
              <icon name="clock-o"></icon> {{guide.last_edited | moment('MM/DD')}}
            </div>
          </router-link>
        </div>
        <p class="loading" v-if="isRequesting"><icon name="spinner" scale="2" pulse></icon></p>
      </section>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import hero from './Hero'
import createGuide from './CreateGuide'

export default {
  name: 'travel',
  components: {
    hero,
    'create-guide': createGuide
  },
  data: () => {
    return {
    }
  },
  mounted: function () {
    this.$store.dispatch('queryGuideList', this.$store.state.user.token).then(data => {}).catch(data => {
      console.log(data)
    })
  },
  computed: {
    ...mapGetters({
      isRequesting: 'isRequesting',
      guides: 'guidesByDate'
    })
  }
}
</script>

<style lang="scss">
@import "../style/colors.scss";

  #guideDisplay{
    min-width: 600px;
    width: 60%;
    max-width: 1200px;
    margin: auto;
    display: flex;
    flex-direction: row;

    #guideFilters{
      margin: 0;
      padding: 0;
      list-style: none;

      li{
        text-align:  center;
        padding: 2em 3em;
        margin-bottom: 1em;
        border-radius: 5px;

        img{
          display: block;
          height: 5em;

        }

        &:not(.active){
          color: $grey;
          border: 1px solid $grey;
        }

        &.active{
          background-color: $white;
          box-shadow: 0px 0px 5px 5px #eee;
        }
      }
    }

    #guideWrapper{
      width: 100%;

      .loading {
        text-align: center;
        width: 100%;
      }

      #guideNumber{
        text-transform: uppercase;
        font-weight: bold;
        color: $grey;
        font-size: 0.9em;
        width: 100%;
      }

      #guideList{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: space-between;

        .guide {
          position: relative;
          width: 30%;
          height: 18em;
          background-color: $white;
          margin: 0;
          margin-bottom: 2em;
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          transition: box-shadow 0.5s;
          color: #333;
          border: 1px solid $grey-light-2;

          &:hover{
            border-color: $primary-color-1;
          }

          .featuredImage{
            background: no-repeat center center;
            background-size: cover;
            width: 100%;
            height: 10em;
            filter: saturate(50%);
          }

          .info{
            padding: 1em;
            flex-grow: 2;

            h2{
              margin: 0;
            }
            .category{
              font-size: 0.9em;
              margin: 0;
              color: $grey;
            }
          }

          .footer{
            color: $grey;
            font-size: 0.8em;
            display: flex;
            padding: 0.5em;
            justify-content: flex-end;

            .fa-icon{
              margin-right: 0.3em;
            }
          }
        }
      }
    }
  }

  @media only screen and (max-width: 600px) {
    #guideDisplay{
      flex-direction: column;
      min-width: 0;
      width: 100%;
      padding: 1em;

      #guideFilters{
        li {
          width: 100%;
          padding: 1em;
        }
      }

      #guideWrapper #guideList{
        margin: 0;
        flex-direction: column;

        .guide{
          height: auto;
          width: 100%;

          .featuredImage{
            display: block;
            height: 5em;
          }
        }
      }
    }
  }
</style>
