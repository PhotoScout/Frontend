<template>
    <modal name="signup" transition="pop-out" height="auto">
        <div class="form">
            <h3 class="title">Sign up</h3>
            <input class="input-text" type="text" placeholder="Username" id="username" v-model="credentials.username" v-on:keyup.enter="submit"/>
            <input class="input-text" type="text" placeholder="Email" id="password" v-model="credentials.email" v-on:keyup.enter="submit"/>
            <input class="input-text" type="password" placeholder="Password" id="password" v-model="credentials.password" v-on:keyup.enter="submit"/>
            <input class="input-text" type="password" placeholder="Repeat Password" id="repassword" v-model="credentials.repassword" v-on:keyup.enter="submit"/>
            <input class="input-text" type="text" placeholder="Beta code" id="code" v-model="credentials.code" v-on:keyup.enter="submit"/>

            <span class="button" id="signin" v-on:click="submit">Sign up</span>
            <p class="error" v-if="error!=''">{{error}}</p>
            <p class="success" v-if="success!=''">{{success}}</p>
        </div>
    </modal>
</template>

<script>
import api from '../api'

export default {
    name: 'signupform',
    components:{
    },
    data () {
        return {
            credentials: {
                email: "",
                username: "",
                password: "",
                repassword: "",
                code: ""
            },
            error: "",
            success: ""
        }
    },
    methods: {
        submit() {
            if(this.credentials.password == this.credentials.repassword)
                api.Signup(this,
                data => {
                    this.error = ""
                    this.success = "Registration successful, you may now proceed to login"
                }, data => {
                    this.error = data.body.error
                }, this.credentials)
            else
                this.error = "Passwords are different"
        }
    }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";
.form{
    text-align: center;
    color: #333;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .title{
        font-weight: normal;
        font-size: 1.7em;
        margin: 0.6em 0;
    }

    .button{
        margin: 1em 0;
        padding: 0.5em;
        border: 2px solid $primary-color-1;
        cursor: pointer;
        color: $primary-color-1;

        &:hover{
            background-color: $primary-color-1;
            color: white;
        }
    }

    .input-text {
        background: none;
        border: none;
        border-bottom: solid 1px $border-light;
        width: 90%;
        font-size: 1em;
        color: #333;
        padding: 0.4em;
        margin: 0.5em 0;
        padding-left: 1.1em;
        font-weight: 300;
    }

    .error {
        width: 80%;
        border: 3px solid #D91E18;
        margin: 1em;
        padding: 0.5em;
        color: #333;
    }

    .success {
        width: 80%;
        border: 3px solid #26A65B;
        margin: 1em;
        padding: 0.5em;
        color: #333;
    }
}
</style>
