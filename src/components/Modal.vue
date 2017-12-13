<template>
  <div class='modal' v-if="isVisible" @click.self="close">
    <div class='modal-window'>
      <div class='close' @click="close">
        <icon name="times"></icon>
      </div>

      <section>
        <slot></slot>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: 'modal',
  props: [
    name
  ],
  data: () => {
    return {
      isVisible: false
    }
  },
  methods: {
    close: function () {
      this.isVisible = false
    },
    open: function () {
      this.isVisible = true
    }
  }
}
</script>

<style scoped lang="scss">
@import "../style/colors.scss";

  .modal{
    z-index: 1000;
    position: fixed;
    top: 0; bottom: 0; left: 0; right: 0;
    background-color: $transparent-black;
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-window{
      background-color: $background-white;
      width: 100%;
      max-width: 500px;
      margin: 1em;
      padding: 1em;
      text-align: right;

      .close{
        margin-right: 0;
      }

      section{
        text-align: left;
      }
    }
  }

  @media only screen and (max-width: 600px) {
    .modal{
      background-color: $background-white;

      .modal-window{
        max-width: none;

        .close{
          position: absolute;
          top: 1em;
          right: 1em;
        }
      }
    }
  }
</style>
