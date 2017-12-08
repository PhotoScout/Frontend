<template>
  <div class="hello">
    <div id="hero">
      <div id="title-container">

        <div id="title-box">
          <img src="src/assets/logo-big.png">
          <h2>Where will you go next?</h2>
        </div>
      </div>
    </div>
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>

    <button @click="login">Login!</button>

    <modal ref="loginModal">
      <login></login>
    </modal>
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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
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
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
