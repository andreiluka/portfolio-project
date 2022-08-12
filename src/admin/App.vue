<template>
  <div class="app-container">
    <headline title="Панель администрирования">
      <user :avatar="avatar" :userName="'Андрей Лукащук'" :color="'white'"/>
    </headline>
    <navigation :navItems="navItems"/>
    <div class="page-content">
      <router-view></router-view>
    </div>
    <notif/>
  </div>
</template>

<script>
  import headline from "./components/headline";
  import user from "./components/user";
  import navigation from "./components/navigation";
  import notif from "./components/notif";

  export default {
    components: {
      headline,
      user,
      navigation,
      notif
    },
    data() {
      return {
        avatar: '',
        navItems: [
          {
            navName: 'Обо мне',
            navPath: '/about'
          },
          {
            navName: 'Работы',
            navPath: '/projects'
          },
          {
            navName: 'Отзывы',
            navPath: '/reviews'
          }
        ]
      }
    },
    created() {
      this.avatar = require(`../images/content/user.jpg`).default;
    }
  };
</script>

<style lang="postcss">
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,600;0,700;0,800;1,300;1,400;1,600;1,700;1,800&display=swap');
  @import "normalize.css";
  @import "../styles/mixins.pcss";
  @import "../styles/layout/base.pcss";
</style>

<style lang="postcss" src="./app.pcss"></style>