<template>
  <div class="edit-line-component" :class="{'blocked' : blocked}">
    <div class="edit-line-title" v-if="editmode === false">
      <div class="edit-line-text">{{value}}</div>
      <div class="button-icon">
        <icon symbol="pencil" grayscale @click="editmode = true"></icon>
      </div>
    </div>
    <div v-else class="edit-line-title">
      <div class="edit-line-input">
        <app-input
          placeholder="Название новой группы"
          :value="value"
          :errorMessage="errorText"
          @input="$emit('input', $event)"
          @keydown.native.enter="onApprove"
          autofocus="autofocus"
          no-side-paddings="no-side-paddings"
        ></app-input>
      </div>
        <div class="edit-line-buttons">
          <div class="button-icon">
            <icon symbol="tick" @click="onApprove"></icon>
          </div>
          <div class="button-icon">
            <icon symbol="cross" @click="$emit('remove'); editmode = false"></icon>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      required: true,
      default: ""
    },
    errorText: {
      type: String,
      default: ""
    },
    hasError: Boolean,
    blocked: Boolean
  },
  data() {
    return {
      editmode: false,
      title: this.value
    };
  },
  methods: {
    onApprove() {
      this.$emit("approve", this.value);
      this.editmode = false;

      if (!!this.errorText) {
        this.editmode = true;
      }
    }
  },
  components: {
    icon: () => import("components/icon"),
    appInput: () => import("components/input")
  }
};
</script>

<style lang="postcss" scoped src="./editLine.pcss"></style>