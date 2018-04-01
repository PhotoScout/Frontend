<template>
  <div id="create-guide">
    <hero title="Create a new guide" image="create.jpg" top="-150px"></hero>

    <form-wizard title="" subtitle="" shape="circle" color="#F39C12" @on-complete="createGuide">
      <tab-content
        :title="title || 'Title'"
        icon="fa fa-pencil" class="form"
        :before-change="commitName">
        <h3>Let's <strong>name</strong> your new guide</h3>
        <p>Add a friendly name to your new guide to identify it more easily</p>
        <float-label>
          <input type="text" placeholder="Name" v-model="title">
        </float-label>
      </tab-content>
      <tab-content
        :title="form.country.data.value || 'Location'"
        icon="fa fa-map-o"
        :before-change="commitLocation">
        <h3>Let's <strong>add a location</strong> to your new guide</h3>
        <p>Giving a location will help further improve the results</p>
        <places
          v-model="form.country.label"
          placeholder="Where are we going ?"
          @change="val => { form.country.data = val }">
        </places>
      </tab-content>
      <tab-content
        title="Search"
        icon="fa fa-camera-retro">
        <h3>Let's <strong>add some photo</strong> to your new guide</h3>
        <p>Add some photo to kickstart your guide</p>
        <div class="flexbin">
          <photo
            v-for="(photo, index) in photos"
            v-bind:key="index"
            :photo="photo"
            :added="alreadyIn(photo)"
            @onClick="selectPhoto(photo)"
          ></photo>
        </div>
      </tab-content>
      <tab-content
        title="Share"
        icon="fa fa-users">
        <h3>Let's <strong>add some friends</strong> to your new guide</h3>
        <p>Invite some friends to join you in your next adventure</p>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import hero from '../Hero'
import Places from 'vue-places'
import FloatLabel from 'vue-float-label/components/FloatLabel'
import {FormWizard, TabContent} from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
import SurveyingMarmot from '../../api/SurveyingMarmotAPI'
import photo from '../Photo'

export default {
  name: 'CreateGuide',
  components: {
    hero,
    FormWizard,
    TabContent,
    Places,
    FloatLabel,
    photo
  },
  data () {
    return {
      title: '',
      result: null,
      step: false,
      form: {
        country: {
          label: null,
          data: {}
        }
      }
    }
  },
  methods: {
    commitName: function() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('initGuide', this.title)
        resolve(true)
      });
    },
    commitLocation: function() {
      return new Promise((resolve, reject) => {
        this.$store.dispatch('locateGuide', {token: this.$store.state.user.token, lat: this.form.country.data.latlng.lat, lon: this.form.country.data.latlng.lng}).then(()=>{
          resolve(true)
        }).catch(data => {
          console.log(data)
          reject(data)
        })
      });
    },
    selectPhoto: function (photo) {
      this.$store.dispatch('selectPhoto', photo)
    },
    createGuide: function (){
      this.$store.dispatch('createGuide', this.$store.state.user.token)
    },
    getUrl: function (photo) {
      return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret + '.jpg'
    },
    alreadyIn: function (photo) {
      return this.selectedPhotos.find(x => x.id === photo.id)
    }
  },
  computed: {
    photos: function() {
      return this.$store.state.newGuide.photos
    },
    selectedPhotos: function() {
      return this.$store.state.newGuide.selectedPhotos
    }
  }
}
</script>

<style lang="scss">
@import "../../style/colors.scss";
@import "../../style/form.scss";
$flexbin-row-height: 200px;
$flexbin-row-height-phone: 150px;

@import "../../style/flexbin.scss";

  .wizard-tab-content, .wizard-card-footer {
    min-width: 600px;
    width: 60%;
    max-width: 1200px;
    margin: auto;
    padding: 0 1em;
  }

  .wizard-tab-content{
    text-align: center;
    margin: 2em auto;

    strong{
      color: $primary-color-1;
    }
  }

  .form{
    margin: 0;
    padding: 0;

    p{
      margin-bottom: 2em;
    }
  }

  .wizard-nav-pills a span{
    margin-top: 1em;
    color: $grey;
  }

  .wizard-icon-circle{
    // background-color: $primary-color-1 !important;

    &.checked{
      background-color: $background-white;
      color: $primary-color-1;
    }
    &:not(.checked) {
      border: 3px solid $grey-light;
    }

    i{
      font-style: normal;
    }
  }

  @media only screen and (max-width: 600px) {
    .wizard-tab-content, .wizard-card-footer{
      min-width: 0;
      width: 100%;
    }
  }

</style>
