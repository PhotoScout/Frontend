<template>
    <div class="hero" :class="{dark: dark, left:left, textBlack:textBlack}" v-bind:style='{backgroundImage: "url(" + imgUrl(image) + ")", "backgroundPositionY": top }'>
        <h2 v-if="title">{{title}}</h2>
    </div>
</template>

<script>
var images = require.context('../assets/hero/', false, /\.jpg$/)

export default {
  name: 'hero',
  methods: {
    imgUrl: function (path) {
      return images('./' + path)
    }
  },
  props: [
    'title',
    'image',
    'dark',
    'left',
    'textBlack',
    'top'
  ]
}
</script>

<style scoped lang="scss">
@import "../style/colors.scss";

  .hero {
    display: flex;
    position: relative;
    height: 25em;

    justify-content: center;
    align-items: center;

    overflow: hidden;

    background: no-repeat center top fixed;
    background-size: cover;

    h2 {
      text-align: center;
      font-size: 3em;
      font-weight: normal;
      color: white;
    }

    &:after {
      content: " ";
      position: absolute;
      width: 150%;
      height: 8em;
      left: -25%;
      bottom: -4em;

      background-color: $background-white;

      transform: rotate(-2deg);
    }

    // Use the dark theme
    &.dark:after {
      background-color: $background-white;
    }

    // Use the left corner
    &.left:after {
      transform: rotate(2deg);
    }

    // Use black text
    &.textBlack {
      color: $background-white;
    }
  }

  @media only screen and (max-width: 600px) {
    .hero {
      h2{
        font-size: 1.5em;
      }
    }
  }
</style>
