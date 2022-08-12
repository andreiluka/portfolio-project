<template>
   <div class="project-component" :class="{'project-component--active': classActive}">
      <card simple>
         <div class="project__img">
            <img :src="`https://webdev-api.loftschool.com/${value.photo}`" alt="" class="project__pic">
         </div>
         <div class="project__desc">
            <div class="project__text">
               <div class="project__title">{{value.title}}</div>
               <p class="text">{{value.description}}</p>
               <a :href="value.link" target="_blank" class="project__link">{{value.link}}</a>
            </div>
            <div class="project__buttons">
               <div class="button-icon" @click="$emit('editmodeOn', value), classActive = true">
                  <icon symbol="pencil" title="Править"></icon>
               </div>
               <div class="button-icon"  @click="removeExistedProject">
                  <icon symbol="cross" title="Удалить"></icon>
               </div>
            </div>
         </div>
      </card>
   </div>
</template>

<script>
import card from "components/card";
import icon from "components/icon";
import { mapActions } from 'vuex';

export default {
   components: {
      card,
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
      ...mapActions('projects', ['removeProject']),
      async removeExistedProject() {
         try {
            await this.removeProject(this.value.id);
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

<style lang="postcss" scoped src="./project.pcss"></style>