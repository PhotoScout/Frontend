<template>
  <footer>
    <b-container>
      <b-row>
        <b-col>
          <h5>Community</h5>
        </b-col>
        <b-col>
          <h5>Legal</h5>
        </b-col>
        <b-col>
          <h5>Technical</h5>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          Surveying Marmot
        </b-col>
      </b-row>
    </b-container>
  </footer>
</template>

<script>
export default {
  name: 'footer'
}
</script>

<style scoped lang="scss">
@import "../style/colors.scss";

  footer{
    width: 100%;
    padding-top: 2em;

    h5 {
      padding: 0.5em 1em;
      border-left: 3px solid $transparent-black;
    }

    nav ul{
      list-style: none;

      li{
        display: inline;
        margin-right: 1em;
      }
    }

    #legal{
      border-top: 1px solid $grey;
      padding: 1em 2em;

      h1{
        margin: 0;
        padding: 0;
        font-size: 1em;
        font-weight: normal;
        color: $grey;
      }
    }
  }
</style>
