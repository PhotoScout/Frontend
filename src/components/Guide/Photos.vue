<template>
  <div id="guide-photo" class="flexbin">
    <photo
      v-for="(photo, index) in photos"
      v-bind:key="index"
      :photo="photo"
      @onClick="remove(index, photo)"
    ></photo>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import photo from '../Photo'

export default {
  name: 'guidePhoto',
  components: {
    photo
  },
  data: () => {
    return {
    }
  },
  props: [
    'guideName'
  ],
  computed: {
    ...mapGetters({
      isRequesting: 'guideInfo/isRequesting'
    }),
    photos () {
      return this.$store.getters['guideInfo/getPhotos'](this.guideName)
    }
  },
  watch: {
    photos: function () {
      console.log('changes')
    }
  },
  methods: {
    remove: function (id, photo) {
      this.$store.dispatch('guideInfo/removePhoto', {token: this.$store.state.user.token, guide: this.guideName, photo: photo.id}).then(data => {
      }).catch(data => {
        console.log(data)
      })
    }
  }

}
</script>

<style lang="scss">
$flexbin-row-height: 200px;
$flexbin-row-height-phone: 150px;

@import "../../style/flexbin.scss";

#guide-photo{
  width: 100%;
}

</style>
