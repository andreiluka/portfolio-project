<template>
   <div class="review-component" :class="{'review-component--active': classActive}">
      <card>
         <div slot="title" class="review__title">
            <user :avatar="`https://webdev-api.loftschool.com/${value.photo}`" :userName="value.author" :profession="value.occ"/>
         </div>
         <div slot="content" class="review__text">
            <p class="text">{{value.text}}</p>
            <div class="review__buttons">
               <div class="button-icon" @click="$emit('editmodeOn', value), classActive = true">
                  <icon symbol="pencil" title="Править"></icon>
               </div>
               <div class="button-icon" @click="removeExistedReview">
                  <icon symbol="cross" title="Удалить"></icon>
               </div>
            </div>
         </div>
      </card>
   </div>
</template>

<script>
import card from "components/card";
import user from "components/user";
import icon from "components/icon";
import { mapActions } from 'vuex';

export default {
   components: {
      card,
      user,
      icon
   },
   props: {
      value: Object,
      editmode: Boolean
   },
   data() {
      return {
         classActive: false
      }
   },
   methods: {
      ...mapActions('reviews', ['removeReview']),
      async removeExistedReview() {
         try {
            await this.removeReview(this.value.id);
         } catch(error) {
            console.log(error);
         }
      }
   },
   watch: {
      editmode() {
         if (!this.editmode) this.classActive = false;
      }
   }
};
</script>

<style lang="postcss" scoped src="./review.pcss"></style>