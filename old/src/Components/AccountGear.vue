<template>
<div id="gearInfo">
  <div class="info-gear" v-for="gear in userGear">
        <span class="label">Name</span><input type="text" class="data" v-model="gear.display_name" disabled=""><span class="label">Range</span><input type="text" class="data" disabled="" v-model="gear.focal_range">
    </div>
  <div class="info-gear" >
        <span class="label">Name</span><input type="text" class="data" v-model="newLens"><input class="button" type="submit" value="Add new lens" v-on:click="addGear">
    </div>
</div>
</template>

<script>
import api from '../api'

export default {
    name: 'accountGear',
    data () {
        return {
            userGear: [],
            newLens: ""
        }
    },
    mounted: function () {
        api.GetUserGear(this, data => {
            this.userGear =  data.body;
        })
    },
    methods: {
        addGear: function(){
            if(this.newLens != "") {
                api.AddUserGear(
                    this,
                    data => {
                        this.userGear.push(data.body);
                        this.newLens = ""
                    },
                    function(){},
                    {
                        'name': this.newLens
                    }
                )
            }
        }
    }
}
</script>

<style lang="scss">
@import "../styles/colors.scss";
#gearInfo{
    .info-gear{
        display: flex;
        margin: 1em 0;

        >*{
            padding: 1em;
            margin: 0;
            font-size: 1em;
        }

        :first-child{
            border-radius: 1em 0 0 1em;
        }

        :last-child{
            border-radius: 0 1em 1em 0;
        }

        .label{
            flex-grow: 1;
            background-color: $box-light-2;
            border: 1px solid $border-light;
            border-right: none;
            font-weight: 300;

        }
        .data{
            flex-grow: 2;
            background-color: $box-light-1;
            border: 1px solid $border-light;
            border-left: none;
            text-align: left;
        }

        .button{
            flex-grow: 1;
            border: 1px solid $border-light !important;
            margin: 0 !important;
        }
    }
}
</style>
