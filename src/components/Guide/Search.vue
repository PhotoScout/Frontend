<template>
  <div>
    <div class="search-input">
      <input type="text" v-model="keywords" placeholder="Search ..." @keyup.enter="search">
      <button @click="search" v-if="!requesting"><icon name="search"></icon></button>
      <button v-else><icon name="spinner" pulse></icon></button>
    </div>
    <ul id="keyword-list">
      <li @click="keywords='Nontron'; search()">Nontron</li>
      <li @click="keywords='Nontron bridges'; search()">Nontron bridges</li>
    </ul>
    <div class="search-result flexbin" v-if="result!=undefined">
      <photo
        v-for="(photo, index) in result.photos.photo"
        v-bind:key="index"
        :photo="photo"
        :added="alreadyIn(photo)"
        @onClick="add(index, photo)"
      ></photo>
      <infinite-loading
        @infinite="loadMore"
        ref="infiniteLoading"
        spinner="bubbles"
      >
        <span slot="no-more"></span>
      </infinite-loading>
    </div>
  </div>
</template>

<script>
import SurveyingMarmot from '../../api/SurveyingMarmotAPI'
import InfiniteLoading from 'vue-infinite-loading'
import photo from '../Photo'

export default {
  name: 'guideSearch',
  components: {
    photo,
    InfiniteLoading
  },
  data () {
    return {
      result: undefined,
      keywords: '',
      requesting: false,
      busy: false,
      page: 2
    }
  },
  props: [
    'guideName'
  ],
  methods: {
    search: function () {
      this.result = undefined
      const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
      this.requesting = true
      sm.SearchPhoto(this.$store.state.user.token, this.keywords, 0, 20).then(data => {
        // Set the alreadyIn property
        for (var photo of data.photos.photo) {
          photo.alreadyIn = this.alreadyIn(photo)
          photo.loading = false
          photo.error = false
        }

        this.result = data
        this.requesting = false
        this.$refs.infiniteLoading.$emit('$InfiniteLoading:reset')
      }).catch(data => {
        console.log(data)
        this.requesting = false
      })
    },
    loadMore: function ($state) {
      console.log('loading more')

      const sm = new SurveyingMarmot({url: 'http://127.0.0.1:5000'})
      sm.SearchPhoto(this.$store.state.user.token, this.keywords, this.page++, 20).then(data => {
        if (data.photos.photo.length === 0) {
          $state.complete()
        }

        // Set the alreadyIn property
        for (var photo of data.photos.photo) {
          photo.alreadyIn = this.alreadyIn(photo)
          photo.loading = false
          photo.error = false
        }

        this.result.photos.photo = this.result.photos.photo.concat(data.photos.photo)
        this.requesting = false
        $state.loaded()
      }).catch(data => {
        console.log(data)
        this.requesting = false
        $state.complete()
      })
    },
    getUrl: function (photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
    },
    alreadyIn: function (photo) {
      return this.photos.find(x => x.flickr_id === photo.id)
    },
    add: function (id, photo) {
      this.result.photos.photo[id].loading = true

      this.$store.dispatch('guideInfo/addPhoto', {token: this.$store.state.user.token, guide: this.guideName, id: photo.id}).then(data => {
        this.result.photos.photo[id].loading = false
        this.result.photos.photo[id].alreadyIn = true
      }).catch(data => {
        this.result.photos.photo[id].loading = false
        this.result.photos.photo[id].error = true
      })
    }
  },
  computed: {
    photos () {
      return this.$store.getters['guideInfo/getPhotos'](this.guideName)
    }
  }
}
</script>

<style lang="scss">
@import "../../style/colors.scss";

$flexbin-row-height: 200px;
$flexbin-row-height-phone: 150px;
@import "../../style/flexbin.scss";

  .resultNumber{
    text-transform: uppercase;
    font-weight: bold;
    color: $grey;
    font-size: 0.9em;
    width: 100%;
    margin: 2em 0 1em;
  }

  .search-input{
    width: 70%;
    margin: auto;
    display: flex;
    align-items: stretch;
    margin-top: 2em;

    input{
      border: none;
      border-bottom: 2px solid $primary-color-1;
      background-color: $background-white;
      font-size: 1.2em;
      padding: 0.5em;
      width: 50%;
      flex-grow: 2;
      margin: 0;
    }

    button{
      border: none;
      background-color: $background-white;
      border: 2px solid $primary-color-1;
      color: $primary-color-1;
      padding: 0.5em 3em;

      &:hover{
        background-color: $primary-color-1;
        color: white;
        cursor: pointer;
      }
    }
  }

  .search-result{
    margin: 2em 0 !important;
  }

  #keyword-list{
    list-style: none;
    display: flex;
    justify-content: center;

    li{
      border: 2px solid $primary-color-1;
      margin: 1em;
      padding: 0.5em 1em;
      border-radius: 0.5em;

      &:hover{
        background-color: $primary-color-1;
        color: white;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .search-input{
      width: 100%;
    }
  }
</style>
