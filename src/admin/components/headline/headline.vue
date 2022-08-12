<template>
   <div class="headline-component">
      <div class="container container--admin">
         <div class="headline__container">
            <div class="headline__left">
               <slot></slot>
               <span class="headline__title">Панель администрирования</span>
            </div>
            <div class="headline__right">
               <button class="headline__quit" @click="logout" title="Выйти">Выйти</button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import axios from '@/requests';

export default {
   components: {},
   methods: {
      async logout() {
         try {
            const response = await axios.post('/logout', {});
            localStorage.removeItem('token');
         } catch(error) {
            console.log(error.response.status);
            console.log(error.response.data.error);
         }

        this.$router.push('/');
      }
   }
}
</script>

<style lang="postcss" scoped src="./headline.pcss"></style>