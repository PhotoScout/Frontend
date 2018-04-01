<template>
  <div id="app">
    <navbar></navbar>
    <router-view id="content"></router-view>
    <footer-el></footer-el>
  </div>
</template>

<script>
import navbar from './components/Navbar'
import footer from './components/Footer'

export default {
  name: 'app',
  components: {
    navbar,
    'footer-el': footer
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}

body{
  margin: 0;
  background-color: #f5f5f5;
}

a{
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: #333;
}

#content{
  min-height: 90vh;
}
</style>
