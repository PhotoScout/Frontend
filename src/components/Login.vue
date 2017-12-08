<template>
  <div id="loginForm" class="form">
    <h1>Login</h1>
    <float-label>
      <input type="text" placeholder="Username" v-model="credentials.username" @keyup.enter="login">
    </float-label>
    <float-label>
      <input type="password" placeholder="Password" v-model="credentials.password" @keyup.enter="login">
    </float-label>

    <span v-if="errorMessage" class="message error">{{errorMessage}}</span>

    <button v-if="!requestStatus" @click="login">Login</button>
    <button v-else><icon name="spinner" pulse></icon></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FloatLabel from 'vue-float-label/components/FloatLabel'

export default {
  name: 'login',
  components: {
    FloatLabel
  },
  data: () => {
    return {
      credentials: {
        username: '',
        password: ''
      },
      errorMessage: ''
    }
  },
  methods: {
    login: function () {
      // Clear the error message
      this.errorMessage = ''

      // Send the request
      this.$store.dispatch('login', this.credentials).then((data) => {
        this.$parent.close()
        this.$router.push('/travel')
      }).catch((data) => {
        this.errorMessage = 'Invalid username or password'
      })
    }
  },
  computed: {
    ...mapGetters({
      requestStatus: 'requestStatus'
    })
  }
}
</script>

<style lang="scss">
@import "../style/colors.scss";
@import "../style/form.scss";

  #loginForm{
    h1{
      margin: 0 0 1em 0;
      text-align: center;
    }
  }
</style>
