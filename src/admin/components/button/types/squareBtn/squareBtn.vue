<template>
  <button class="square-btn-component" type="button" v-on="$listeners">
    <div class="btn-text">
      <div class="sign"></div>
      <div class="title">{{title}}</div>
    </div>
  </button>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Добавить работу"
    }
  }
};
</script>

<style lang="postcss" scoped src="./squareBtn.pcss"></style>