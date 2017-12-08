<template>
  <div id="loginForm" class="form">
    <h1>Sign up</h1>
    <float-label>
      <input type="text" placeholder="Username" v-model="credentials.username" @keyup.enter="signup">
    </float-label>
    <float-label>
      <input type="text" placeholder="Email" v-model="credentials.email" @keyup.enter="signup">
    </float-label>
    <float-label>
      <input type="password" placeholder="Password" v-model="credentials.password" @keyup.enter="signup">
    </float-label>
    <float-label>
      <input type="password" placeholder="Repeat password" v-model="credentials.repassword" @keyup.enter="signup">
    </float-label>
    <float-label>
      <input type="code" placeholder="Code" v-model="credentials.code" @keyup.enter="signup">
    </float-label>

    <span v-if="errorMessage" class="message error">{{errorMessage}}</span>
    <span v-if="successMessage" class="message success">{{successMessage}}</span>

    <button v-if="!requestStatus && !successMessage" @click="signup">Sign up</button>
    <button v-if="requestStatus"><icon name="spinner" pulse></icon></button>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import FloatLabel from 'vue-float-label/components/FloatLabel'

export default {
  name: 'signup',
  components: {
    FloatLabel
  },
  data: () => {
    return {
      credentials: {
        email: '',
        username: '',
        password: '',
        repassword: '',
        code: ''
      },
      errorMessage: '',
      successMessage: ''
    }
  },
  methods: {
    signup: function () {
      // Clear the error message
      this.errorMessage = ''

      // Send the request
      this.$store.dispatch('signup', this.credentials).then((data) => {
        this.successMessage = 'Signup successful, you will now be redirected'
        setTimeout(() => {
          this.$store.dispatch('login', this.credentials).then((data) => {
            this.$parent.close()
            this.$router.push('/travel')
          })
        }, 1500)
      }).catch((data) => {
        this.errorMessage = data.body.error
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
