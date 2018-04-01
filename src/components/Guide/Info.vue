<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <div class="sectionTitle">
            <h2>Gear</h2>
            <span>Pack the right equipement</span>
        </div>
      </b-col>
      <b-col>
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <b-img :src="photos[0].url" fluid-grow alt="Responsive image" />
      </b-col>
      <b-col>
        <guideMap guideName="graz"></guideMap>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import guideMap from './Map'

export default {
  name: 'guideInfo',
  components: {
    guideMap,
  },
  computed: {
    photos () {
      return this.$store.getters['guideInfo/getPhotos']("graz")
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../style/colors.scss";

.sectionTitle {
  display: flex;
  flex-direction: row;
  align-items: center;

  h2 {
    color: #333;
    font-weight: bold;
    margin: 0;
    padding: 0.5em 0.5em 0.5em 0;
    margin-right: 0.5em;
    font-size: 2em;
    border-right: 1px solid $grey;
  }
  span {
    color: $primary-color-1;
    font-weight: light;
    font-size: 1.2em;
  }
}
</style>
