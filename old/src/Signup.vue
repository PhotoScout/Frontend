<template>
  <div id="search-page">
    <div id="hero">
      <navbar></navbar>
      <div id="title-container">

        <div id="title-box">
          <img src="src/assets/logo-big.png">
          <h2>Where will you go next?</h2>
        </div>
        <loginform v-if="!authenticated"></loginform>
      </div>
    </div>
    <section class="promo">
      <div>
        <h2>What is Surveying Marmot</h2>
        <p>Have you ever had the feeling that you were missing something during your photoshoots?</p>
      </div>
      <img src="src/assets/shoot.jpg">
    </section>
  </div>
</template>

<script>
import searchbar from './Components/SearchBar.vue'
import loginform from './Components/LoginForm.vue'
import navbar from './Components/Navbar.vue'
import auth from './auth'

export default {
  name: 'search',
  components:{
    searchbar,
    loginform,
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

#search-page {
  #hero{
    background: url('assets/bg.jpg') no-repeat center center fixed;
    -webkit-background-size: cover;
    -moz-background-size: cover;
    -o-background-size: cover;
    background-size: cover;

    #title-container {
        height: 90vh;
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
            max-width: 80%;
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
    img{
      height: 100%;
    }
  }
}
</style>
