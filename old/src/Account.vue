<template>
  <div id="account-page">
    <navbar></navbar>

    <hero image="account.jpg"></hero>

    <div id="account-data">
        <h2 v-if="user.fullname">Hi {{user.fullname}}!</h2>
        <h2 v-else>Hi {{user.username}}!</h2>
        <div class="info">
          <span class="label">Username</span><input disabled="" type="text" class="data" v-model="user.username">
        </div>

        <div class="info">
          <span class="label">Full name</span><input type="text" class="data" v-model="user.fullname">
        </div>

        <p class="section">Change password</p>

        <div class="info">
          <span class="label">Old password</span><input type="password" class="data" placeholder="*******" v-model="passwords[0]">
        </div>
        <div class="info">
          <span class="label">New password</span><input type="password" class="data" v-model="passwords[1]">
        </div>
        <div class="info">
          <span class="label">Repeat new password</span><input type="password" class="data" v-model="passwords[2]">
        </div>

        <input class="button" type="submit" value="Submit changes" v-on:click="submitInfo">
    </div>

    <div id="gear-data">
        <p class="section">My gear</p>
        <accountGear></accountGear>
    </div>
  </div>
</template>

<script>
import api from './api'

import navbar from './Components/Navbar.vue'
import hero from './Components/Hero.vue'
import accountGear from './Components/AccountGear.vue'

export default {
  name: 'account',
  components:{
    navbar,
    hero,
    accountGear
  },
  data () {
    return {
      user: {},
      original: {},
      passwords: [
        "", // Previous
        "", // New
        ""  // New bis
      ],
    }
  },
  mounted: function () {
    api.GetUserInfo(this, data => {
      this.user =  data.body;
      this.original = Object.assign({}, data.body)
    })
  },

  methods: {
    submitInfo: function() {

      if( this.user.fullname != this.original.fullname) {
        api.UpdateUserInfo(this, function(){}, function(){}, {
          "label": "fullname",
          "data": this.user.fullname
        })
      }

      if( this.passwords[0] != "" && this.passwords[1] != 0 && this.passwords[1] == this.passwords[2]) {
        api.UpdateUserInfo(this, function(){}, function(){}, {
          "label": "password",
          "data": this.passwords[1],
          "oldpass": this.passwords[0]
        })
      }
    }
  }
}
</script>

<style lang="scss">
@import "styles/global.scss";

#account-page {

  #account-data, #gear-data {
    color: #333;
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    width: 50%;
    margin: auto;

    .info {
      display: block;
      width: 100%;
      margin-bottom: 1em;

      >* {
        display: inline-block;
        padding: 1em;
        margin: 0;
        font-size: 1em;
      }

      .label {
        width: 20%;
        border-radius: 1em 0 0 1em;
        background-color: $box-light-2;
        border: 1px solid $border-light;
        border-right: none;
        font-weight: 300;

      }
      .data {
        width: 80%;
        border-radius: 0 1em 1em 0;
        background-color: $box-light-1;
        border: 1px solid $border-light;
        border-left: none;
        text-align: left;
      }
    }

    .section {
      width: 100%;
      text-align: center;
      font-weight: 300;
      position: relative;
      background-color: $background-light;
      z-index: 2;

      &:after {
        content: " ";
        position: absolute;
        width: 100%;
        left: 0;
        top: 50%;
        border-top: 1px solid $border-light;
        z-index: 1;
      }
    }

    .button {
      width: 15%;
      margin: 1em auto;
      border: none;
      padding: 1em;
      font-size: 1em;
      font-weight: 300;

        &:hover {
          background-color: $border-light;
        }
    }
  }
}
</style>
