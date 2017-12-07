<template>
    <div class="form" :class="button?'has-button':null">
        <input class="text" type="text" name="keywords" v-model="keywords" v-on:keyup.enter="onClick">
        <input v-if="button" class="button" type="submit" value="Submit"  v-on:click="onClick">
    </div>
</template>

<script>
export default {
  name: 'searchbar',
  props:['button'],
  data() {
      return {
          keywords:""
      }
  },
  mounted: function(){
      if(this.$route.query.query != "") {
        this.keywords = this.$route.query.query
        this.$emit("search", this.keywords)
      }
  },
  methods: {
      onClick: function() {
          this.$emit("search", this.keywords)
      }
  }
}
</script>

<style lang="scss">
.form {
    margin: 2em 0;
    width: 100%;
    display: flex;
    justify-content: center;

    .text {
        width: 50%;
        display: inline-block;
        border: none;
        padding: 7px 7px 7px 27px;
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: 7px 50%;
        background-image: url(https://cdn.dribbble.com/assets/icon-search-7a07ad9f258fc1d8c28a29faa5627b41c2cc353d138b6bc3e987e0719584ce69.png);
        font-family: 'Raleway', sans-serif;
        border-radius: 4px 0 0 4px;
        border: 1px solid #DADFE1;
        // border-right: 0;
    }

    &:not(.has-button){
        margin: 2em 0;

        .text{
            border-radius: 4px;
            padding: 2px 2px 2px 27px;
            background-color: #555;
            width: 50%;
            color: white;
        }
    }

    .button{
        width: 15%;
        border-radius: 0 4px 4px 0;
        background-color: #eee;
        border: none;
        border: 1px solid #DADFE1;
        border-left: 0;

        &:hover {
            background-color: #ccc;
        }
    }
}
</style>
