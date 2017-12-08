<template>
  <div id="app">
    <navbar></navbar>
    <router-view/>
  </div>
</template>

<script>
import navbar from './components/Navbar'

export default {
  name: 'app',
  components: {
    navbar
  }
}
</script>

<style lang="scss">

* {
  box-sizing: border-box;
}

body{
  margin: 0;
}

a{
  text-decoration: none;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 0;
  color: #2c3e50;
}
</style>
