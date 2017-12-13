<template>
  <div id="guideCreate" :class="{open:createOpen}">
    <div class="header" @click="createOpen = !createOpen">
      <span>Create a new adventure</span>
      <icon v-if="!createOpen" name="angle-down"></icon>
      <icon v-else name="angle-up"></icon>
    </div>
    <div id="slides" v-if="createOpen">
      <div id="slide1">
        <div>
          <img src="../assets/trip.png">
          <p>Guides</p>
        </div>
        <div>
          <img src="../assets/journey.png">
          <p>Trip</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'create-guide',
  data: () => {
    return {
      createOpen: false
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/colors.scss";

  #guideCreate{
    width: 100%;
    background-color: $white;
    margin-bottom: 1em;
    border-radius: 5px;
    padding: 1em;
    border: 1px solid $grey-light-2;

    &.open .header{
      padding-bottom: 0.5em;
      margin-bottom: 0.5em;
      border-bottom: 1px solid $grey-light;
    }

    .header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 1.2em;
      color: #666;
      cursor: pointer;
    }

    #slides{
      #slide1{
        display: flex;
        flex-direction: row;
        justify-content: center;

        >div{
          width: 50%;
          text-align: center;
          padding: 1em;
          cursor: pointer;

          &:hover{
            background-color: #f3f3f3;
          }

          &:first-of-type{
            border-right: 1px solid $grey-light-2;
          }

          p{
            margin: 0;
          }
        }
        img{
          height: 5em;
        }
      }
    }
  }
</style>
