<template>
  <div>
    <div id="navigation-panel">
      <div>
        <span class="logo">
          <h1>
            <router-link to="/">
              <strong>S</strong>urveying <strong>M</strong>armot
            </router-link>
          </h1>
        </span>
        <span v-if="!menuActive" class="responsiveMenu open" @click="menuActive=true"><icon name="bars" scale="2"></icon></span>
        <span v-if="menuActive" class="responsiveMenu close" @click="menuActive=false"><icon name="times" scale="2"></icon></span>
        <nav :class="{active:menuActive}" @click="menuActive=false">
          <ul class="links">
            <li>
              <router-link to="/explore">Explore</router-link>
            </li>
              <li v-if="isAuthenticated">
              <router-link to="/travel">Travel</router-link>
            </li>
            <li v-if="isAuthenticated">Achievements</li>
          </ul>
          <ul class="user">
            <li v-if="!isAuthenticated" @click="$refs.loginModal.open()">Login</li>
            <li class="button" v-if="!isAuthenticated" @click="$refs.signupModal.open()">Sign up</li>
            <li v-if="isAuthenticated">
              <router-link to="/account">Account</router-link>
            </li>
            <li class="button" v-if="isAuthenticated" v-on:click="logout">Log out</li>
          </ul>
        </nav>
      </div>
    </div>

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

  #navigation-panel {
    position: absolute;
    top: 0; left: 0; right: 0;
    z-index: 999;
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%);


    >div{
      width: 100%;
      max-width: 1900px;
      height: 3.5em;
      margin:  1em auto;
      padding: 0 1em;
      display: flex;
      align-items: center;
      color: white;
      justify-content: space-between;

      .logo {
        font-size: 1.5em;
        display: flex;
        align-items: center;

        h1 {
          font-size: 0.8em;
          margin: 0;
          font-weight: normal;

          img{
            height: 2em;
            margin-right: 0.5em;
          }

          strong{
            font-size: 1.3em;
          }

          a {
            display: flex;
            align-items: center;
            color: white;
          }
        }
      }

      .responsiveMenu{
        display: none;
      }

      nav{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        order: 2;
        width: 100%;
      }

      @media only screen and (max-width: 600px) {
        .responsiveMenu{
          display: inline-block;

          &.close{
            position: fixed;

            color: black;
            z-index: 1000;
            top: 1em;
            right: 1em;
          }
        }

        nav{
          display: none;
          position: fixed;
          height: 100vh;
          top: 0;
          left: 0;
          width: 100%;
          background-color: white;
          padding-top: 3em;

          &.active{
            display: block;
          }

          ul{
            flex-direction: column;
            margin: 0;
            align-items: flex-start;

            li{
              color: black;
              padding: 0.7em 0;

              a{
                color: black;
              }
            }
          }
        }
      }

      ul {
        list-style: none;
        font-weight: normal;
        order: 2;
        display: flex;
        align-items: center;

        li {
          float: left;
          margin-left: 1em;

          a {
            color: white;

            &:hover {
              color: $primary-color-1;
            }
          }
        }
      }

      .user {
        order: 2;
        margin-left: auto;


        .button {
          padding: 0.5em;
          border: 2px solid $primary-color-1;
          cursor: pointer;
          color: $primary-color-1;

          &:hover{
            background-color: $primary-color-1;
            color: white;
          }
        }
      }
    }
  }
</style>
