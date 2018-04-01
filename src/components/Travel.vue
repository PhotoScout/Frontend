<template>
  <div id="travel">
    <hero title="Plan your next adventure" image="travel.jpg" dark="true" top="-200px"></hero>

    <b-container class="bv-example-row">
      <div id="guideDisplay">
        <section id="guideWrapper">
          <router-link :to="{name:'CreateGuide'}" id="newGuide">Create a new guide</router-link>
          <p id="guideNumber"><strong>{{guides.length}}</strong> Guides</p>
          <b-row id="guideList" v-if="!isRequesting">
            <b-col md="3" class="guide" v-for="(guide, index) in guides" v-bind:key="index" >
              <b-link :to="{ name: 'Guide', params: { guideName: guide.short_name }}" class="spacer">
                <div class="featuredImage" v-bind:style='{backgroundImage: "url(" + guide.featured_image + ")"}'></div>
                <div class="info">
                  <h2>{{guide.title}}</h2>
                  <span class="category">Trip</span>
                </div>
                <div class="footer">
                  <icon name="clock-o"></icon> {{guide.last_edited | moment('MM/DD')}}
                </div>
              </b-link>
            </b-col>
          </b-row>
          <p class="loading" v-if="isRequesting"><icon name="spinner" scale="2" pulse></icon></p>
        </section>
      </div>
    </b-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import hero from './Hero'

export default {
  name: 'travel',
  components: {
    hero
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
        margin-top: 2em;
      }

      #newGuide{
        background-color: white;
        border-radius: 5px;
        border: 2px solid $grey-light-2;
        text-align: center;
        width: 100%;
        display: inline-block;
        margin-bottom: 1em;
        padding: 1em;
        color: #333;

        &:hover{
          background-color: $primary-color-1;
          border-color: $primary-color-1;
          color: white;
        }
      }

      #guideNumber{
        text-transform: uppercase;
        font-weight: bold;
        color: $grey;
        font-size: 0.9em;
        width: 100%;

        strong{
          color: $primary-color-1;
        }
      }

      #guideList{

        .guide {
          position: relative;
          margin: 0;
          margin-bottom: 2em;
          border-radius: 5px;
          overflow: hidden;
          display: flex;
          flex-direction: column;

          .spacer{
            height: 18em;
            margin: 0.2em;
            background-color: $white;
            transition: box-shadow 0.5s;
            color: #333;
            border: 2px solid $grey-light-2;

            &:hover{
              border-color: $primary-color-1;
            }
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
              font-size: 1.5em;
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

  @media only screen and (max-width: 599px) {
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

  @media only screen and (min-width: 600px) and (max-width: 1024px) {
    #guideDisplay{
      padding: 1em;
    }
    #guideDisplay #guideWrapper #guideList .guide{
      width: 49%;
    }
  }
</style>
