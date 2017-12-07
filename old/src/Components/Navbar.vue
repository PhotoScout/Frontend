<template>
    <nav id="navigation-panel">
        <div>
            <span class="logo">
                <h1>
                    <router-link to="/">
                        <strong>S</strong>urveying <strong>M</strong>armot
                    </router-link>
                </h1>
            </span>
            <ul class="links">
                <li>
                    <router-link to="/explore">Explore</router-link>
                </li>
                <li v-if="authenticated">
                    <router-link to="/travel">Travel</router-link>
                </li>
                <li v-if="authenticated">Achievements</li>
            </ul>
            <ul class="user">
                <li v-if="!authenticated" @click="$modal.show('login')">Login</li>
                <li class="button" v-if="!authenticated" @click="$modal.show('signup')">Sign up</li>
                <li v-if="authenticated">
                    <router-link to="/account">Account</router-link>
                </li>
                <li class="button" v-if="authenticated" v-on:click="logout">Log out</li>
            </ul>
        </div>
    </nav>
</template>

<script>
import auth from '../auth'

export default {
  name: 'navbar',
  data () {
      return {
        authenticated: auth.user.authenticated
      }
  },
  components:{
  },
  methods: {
      logout: function () {
          auth.logout()
      }
  }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";
#navigation-panel {
    width: 100%;
    left: 0;
    right: 0;
    position: absolute;
    background: linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.3) 50%,rgba(0,0,0,0) 100%);

    z-index: 999;

    >div{
        width: 90%;
        max-width: 1900px;
        height: 3.5em;
        margin:  1em auto;
        padding: 0 3em;
        display: flex;
        align-items: center;
        color: white;

        .logo {
            font-size: 1.5em;
            display: flex;
            align-items: center;

            h1 {
                font-size: 0.8em;
                margin-left: 1em;
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

        .links, .user {
            list-style: none;
            font-weight: bold;
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
