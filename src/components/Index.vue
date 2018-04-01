<template>
  <div id="index">
    <div id="hero">
      <div id="title-container">

        <div id="title-box">
          <img src="../assets/logo-big.png">
          <h2>Where will you go next?</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import modal from './Modal'
import login from './Login'

export default {
  name: 'index',
  components: {
    modal,
    login
  },
  methods: {
    login () {
      this.$refs.loginModal.open()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  #hero{
    background: url('/src/assets/hero/index.jpg') no-repeat center center fixed;
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
        color: white;
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


  @media only screen and (max-width: 600px) {
    #hero #title-container {
      h2{
        font-size: 2em;
      }

      img{
        height: auto;
        width: 80%;
      }
    }
  }
</style>
