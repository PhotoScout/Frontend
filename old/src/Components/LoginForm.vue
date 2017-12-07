<template>
    <modal name="login" transition="pop-out" :width="400" :height="300" adaptative="true">
        <div class="form">
            <h3 class="title">Sign in</h3>
            <input class="input-text" type="text" placeholder="Username" id="username" v-model="credentials.username" v-on:keyup.enter="submit"/>
            <input class="input-text" type="password" placeholder="Password" id="password" v-model="credentials.password" v-on:keyup.enter="submit"/>

            <span class="button" id="signin" v-on:click="submit">Sign in</span>
        </div>
    </modal>
</template>

<script>
import auth from '../auth'

export default {
    name: 'loginform',
    components:{
    },
    data () {
        return {
            credentials: {
                username: "",
                password: ""
            }
        }
    },
    methods: {
        submit() {
            var credentials = {
                username: this.credentials.username,
                password: this.credentials.password
            }

            auth.login(this, credentials)
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
}
</style>
