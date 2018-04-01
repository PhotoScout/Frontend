<template>
  <div class="tile" @click="onClick">
    <img :src="url">
    <div class="top-info">
      <icon v-if="photo.loading" name="spinner" pulse scale="2"></icon>
      <icon v-if="photo.error" name="exclamation-triangle" scale="2"></icon>
    </div>
    <div v-if="!photo.alreadyIn" class="description">
      <span class="title">{{photo.title}}</span>
      <span class="owner">{{photo.author || photo.ownername}} - all rights reserved</span>
    </div>
    <div v-if="photo.alreadyIn || added" class="hover-info"></div>
  </div>
</template>

<script>
export default {
  name: 'photo',
  props: [
    'photo',
    'added'
  ],
  computed: {
    url () {
      if (this.photo.url) {
        return this.photo.url
      } else {
        return 'https://farm' + this.photo.farm + '.staticflickr.com/' + this.photo.server + '/' + this.photo.id + '_' + this.photo.secret + '.jpg'
      }
    }
  },
  methods: {
    onClick: function () {
      this.$emit('onClick')
    }
  }
}
</script>

<style lang="scss">
@import "../style/colors.scss";

  .tile{
    display: block;
    overflow: hidden;

    .description {
      // display: none;
      position: absolute;
      padding: 0.5em;
      left: 0;
      right: 0;
      font-size: 0.9em;
      bottom:-100px;
      background: linear-gradient(to top, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.5) 50%,rgba(0,0,0,0) 100%);
      transition: bottom 0.2s;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;

      >span{
        text-overflow: ellipsis;
        max-width: 50%;
        white-space: nowrap;
        overflow: hidden;
      }
    }

    .hover-info{
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.8);
      top: 0;
      left: 0;

      &:before{
        font-family: "FontAwesome";
        content:'\f058';
        font-size: 4em;
        margin: 0 0.2em;
        color: $primary-color-1;
      }
    }

    .top-info{
      position: absolute;
      top:0;
      left: 0;
      padding: 0.5em;
      color: white;
    }

    &:hover {
      .description {
        // display: block;
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        height: 60px;
        background-position-y: 0px;
      }

      .infoLeft {
        display: flex;
        top: 0px;
        left: 0px;
        padding: 0.5em;
        font-weight: normal;
        font-style: normal;
        font-size: 1.5em;
        text-shadow: 2px 2px black;
      }
    }
  }

</style>
