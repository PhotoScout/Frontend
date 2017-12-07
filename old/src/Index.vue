<template>
  <div id="index-page">
    <loginform/>
    <signupform/>
    <div id="hero">
      <navbar></navbar>
      <div id="title-container">

        <div id="title-box">
          <img src="src/assets/logo-big.png">
          <h2>Where will you go next?</h2>
        </div>
      </div>
    </div>
    <section class="promo">
      <div class="content">
        <h2>What is <strong>Surveying Marmot</strong>?</h2>
        <p>Have you ever had the feeling that you were missing something during your photoshoots?</p>
        <p>Sometimes when we come back, after a day in the field, we look at the pictures we've just taken, and they all look bland, tasteless. They look like these photos your many friends just shared on Instagram. The ones every tourists takes.</p>
        <p>The only way to stop taking these boring shots? <strong>Prepare</strong>.</p>
        <p>But preparing is hard, and cumbersome, looking at maps, weather, travel guides, Instagram, 500px ... It's more time behind a screen and less behind a lens.</p>
        <p>What if you could <strong>prepare everything in a fraction of the time</strong> it would have taken you before? This is what Surveying Marmot is</p>
      </div>
      <div class="image">
        <img src="src/assets/shoot.jpg">
      </div>
    </section>

    <section class="promo left">
      <div class="content">
        <h2>What can I do with <strong>Surveying Marmot</strong>?</h2>
        <p>With Surveying Marmot, you can prepare your trips <strong>effortlessly and in no time at all</strong>.</p>
        <p>You can view hundreds of photos from photographs all over the world, get some inspiration, find the hotspots. You can also access maps, weather, get advices on what gear to pack, and much more. </p>
        <p>But, is it yet another tool?</p>
        <p>Many tools for photographers are out there. But all of them gives you one single piece of the puzzle. Some give the weather, other the best time of the day. Surveyin Marmot try to put <strong>everything into one package</strong>.</p>
      </div>
      <div class="image">
        <img src="src/assets/prepare.jpg">
      </div>
    </section>
  </div>
</template>

<script>
import searchbar from './Components/SearchBar.vue'
import loginform from './Components/LoginForm.vue'
import signupform from './Components/SignupForm.vue'
import navbar from './Components/Navbar.vue'
import auth from './auth'

export default {
  name: 'index',
  components:{
    searchbar,
    loginform,
    signupform,
    navbar
  },
  data () {
    return {
        authenticated: auth.user.authenticated
    }
  }
}
</script>

<style lang="scss">
@import "styles/global.scss";

#index-page {
  #hero{
    background: url('assets/bg.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    #title-container {
        height: 90vh;
        min-height: 90wh;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: linear-gradient(to top, rgba(0,0,0,0.9) 0%,rgba(0,0,0,0.7) 40%,rgba(0,0,0,0) 100%);
        text-align: center;

        h1, h2 {
            margin: 0em;
        }

        img {
            height: 40vh;
            width: auto;
            margin: 2em auto;
        }

        h2 {
            font-weight: 100;
            font-size: 3.5em;
        }
    }
  }

  .promo{
    color: #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0;

    strong{
      color: $primary-color-1;
    }

    &.left{
      flex-direction: row-reverse;
      .image:after{
        left: auto;
        right: -5em;

        transform: rotate(-20deg);
      }
    }

    .content{
      h2{
        text-align: center;
        margin: 1em 0;
      }

      margin: 0 2em;
      width: 60%;
    }

    .image{
      position: relative;
      height: 100%;
      overflow: hidden;
        &:after {
          content: " ";
          position: absolute;
          width: 10em;
          bottom: -5em;
          left: -5em;
          top: -5em;

          background-color: $background-light;

          transform: rotate(20deg);
      }
    }
  }
}
</style>
