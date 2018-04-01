<template>

  <div>
    <b-navbar toggleable="md" type="dark" fixed="top" id="nav">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

      <b-navbar-brand to="/">Surveying Marmot</b-navbar-brand>
      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav v-if="isAuthenticated">
          <b-nav-item to="/travel">Travel</b-nav-item>
          <b-nav-item to="/explore" disabled>Explore</b-nav-item>
          <b-nav-item to="/explore" disabled>Achievements</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto"  v-if="!isAuthenticated">
          <b-nav-item @click="$refs.loginModal.open()">Login</b-nav-item>
          <b-nav-item @click="$refs.signupModal.open()">Sign Up</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav class="ml-auto"  v-else>
          <b-nav-item to="/account">Account</b-nav-item>
          <b-nav-item @click="logout">Logout</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <modal ref="loginModal">
      <login></login>
    </modal>

    <modal ref="signupModal">
      <signup></signup>
    </modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import * as types from '../store/mutation-types'
import modal from './Modal'
import login from './Login'
import signup from './Signup'

export default {
  name: 'navbar',
  data () {
    return {
      menuActive: false
    }
  },
  components: {
    modal,
    login,
    signup
  },
  methods: {
    logout: function () {
      this.$store.commit(types.LOGOUT)
      this.$router.push('/')
    }
  },
  computed: {
    ...mapGetters({
      isAuthenticated: 'loginStatus'
    })
  }
}
</script>

<style scoped lang="scss">
@import "../style/colors.scss";

  #nav{
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%);
  }
</style>
