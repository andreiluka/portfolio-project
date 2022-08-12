<template>
  <div class="user-component">
    <avatar :style="measures" :src="avatar ? avatar : 'https://picsum.photos/300/300'" />
    <div class="user__desc">
      <div class="user__name" :style="{color:color}">{{userName}}</div>
      <div class="user__profession" v-if="profession">{{profession}}</div>
    </div>
  </div>
</template>

<script>
import avatar from "../avatar";

export default {
  components: {
    avatar
  },
  props: {
    size: {
      type: String,
      default: "3"
    },
    avatar: String,
    userName: String,
    profession: String,
    color: String
  },
  computed: {
    measures() {
      const size = Number(this.size);
      return {
        width: `${size}rem`,
        height: `${size}rem`,
      }
    }
  }
}
</script>
<style lang="postcss" scoped src="./user.pcss"></style>