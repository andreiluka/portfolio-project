<template>
  <button
    :class="['default-btn-container', 'btn-decorator', {disabled}, {plain}]"
    v-if="typeAttr === 'button'"
    v-on="$listeners"
    :disabled="disabled"
  >{{title}}</button>

  <label class="btn-file-container" :class="{'error' : !!errorMessage}" v-else-if="typeAttr === 'file'">
    <div class="btn-file-fake" :class="['btn-decorator',{plain}]">{{title}}</div>
    <input class="btn-file-input" type="file" :accept="inputAccept" v-on="$listeners" />
    <div class="btn-file__error-tooltip">
      <tooltip :text="errorMessage"></tooltip>
    </div>
  </label>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: "Отправить"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    plain: Boolean,
    typeAttr: {
      type: String,
      default: "button",
      validator: value => ["button", "file"].includes(value)
    },
    errorMessage: {
      type: String,
      default: ""
    },
    inputAccept: String
  },
  components: {
    tooltip: () => import("components/tooltip")
  }
};
</script>

<style lang="postcss" scoped src="./defaultBtn.pcss"></style>