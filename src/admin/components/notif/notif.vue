<template>
  <div class="notification" :class="notifClass">
    <div class="notification__text">{{text}}</div>
    <button class="notification__close" @click="hideNotif"></button>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default ({
  computed: {
    ...mapState('notifs', {
      isError: state => state.isError,
      isShown: state => state.isShown,
      text: state => state.text
    }),
    notifClass() {
      return {
        'notification--error': this.isError,
        'notification--success': !this.isError,
        'notification--hidden': !this.isShown
      }
    }
  },
  methods: {
    ...mapActions('notifs', ['hideNotif'])
  }
})
</script>

<style lang="postcss" scoped src="./notif.pcss"></style>