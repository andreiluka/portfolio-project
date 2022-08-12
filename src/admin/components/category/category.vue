<template>
   <div class="category-component">
      <card>
         <div slot="title">
            <edit-line
               @approve="onApprove(editSkills.id)"
               @remove="removeExistedCategory" 
               :errorText="validation.firstError('editSkills.category')"
               v-model="editSkills.category"
            />
         </div>
         <div class="category__content" slot="content">
            <ul class="category__list">
               <li class="category__item" v-for="(skill, i) in skills" :key="i">
                  <edit-skill v-model="skills[i]"/>
               </li>
            </ul>
            <div class="category__add-skill" :class="{'category__add-blocked' : categoryAddBlocked}">
               <div class="category__add-line">
                  <div class="category__add-name">
                     <app-input 
                        placeholder="Новый навык"
                        :errorMessage="validation.firstError('newSkill.title')"
                        v-model="newSkill.title"
                     />
                  </div>
                  <div class="category__add-percent">
                     <app-input
                        type="number"
                        min="0"
                        max="100"
                        maxlength="3"
                        :errorMessage="validation.firstError('newSkill.percent')"
                        v-model="newSkill.percent"
                     />
                  </div>
               </div>
               <div class="category__add-button">
                  <round-btn type="round" @click="addNewSkill"/>
               </div>
            </div>
         </div>
      </card>
   </div>
</template>

<script>
import card from "components/card";
import editLine from "components/editLine";
import editSkill from 'components/editSkill';
import appInput from "components/input";
import roundBtn from "components/button";
import { Validator } from 'simple-vue-validator';
import { mapActions } from "vuex";

export default {
   mixins: [require('simple-vue-validator').mixin],
   validators: {
      'editSkills.category'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'newSkill.title'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'newSkill.percent'(value) {
         return Validator.value(value)
                  .required('НЕДОПУСТИМО')
                  .greaterThanOrEqualTo(0, 'НЕДОПУСТИМО')
                  .lessThanOrEqualTo(100, 'НЕДОПУСТИМО');
      }
   },
   components: {
      card,
      editLine,
      editSkill,
      appInput,
      roundBtn
   },
   props: {
      categorySkills: Object,
      skills: Array
   },
   data() {
      return {
         newSkill: {
            title: '',
            percent: 100,
            category: this.categorySkills.id
         },
         editSkills: {...this.categorySkills},
         categoryAddBlocked: false
      }
   },
   methods: {
      ...mapActions('skills', ['addSkill']),
      ...mapActions('categories', ['removeCategory', 'editCategory']),
      ...mapActions('notifs', ['showError']),
      onApprove() {
         this.$validate('editSkills.category').then(async (success) => {
            if (success) {
               try {
                  await this.editCategory(this.editSkills);
               } catch(error) {
                  console.log(error)
                  this.showError(error.response.data.error);
               }
            }
         });
      },
      async removeExistedCategory() {
         try {
            await this.removeCategory(this.categorySkills.id);
         } catch(error) {
            console.log(error);
            this.showError(error.response.data.error);
         }
      },
      addNewSkill() {
         this.$validate(['newSkill.title', 'newSkill.percent']).then(async (success) => {
            if (success) {
               this.categoryAddBlocked = true;
               
               try {
                  await this.addSkill(this.newSkill);
                  
                  this.newSkill.title = '';
                  this.newSkill.percent = 100;
               } catch(error) {
                  console.log(error);
                  this.showError(error.response.data.error);
               } finally {
                  this.categoryAddBlocked = false;
               }

               this.validation.reset();
            }
         });
      }
   },
   watch: {
      categorySkills() {
         this.editSkills = {...this.categorySkills}
      },
      'editSkills.category'() {
         if (this.editSkills.category == false) {
            this.categoryAddBlocked = true;
         } else {
            this.categoryAddBlocked = false;
         }
      }
   }
}
</script>

<style lang="postcss" scoped src="./category.pcss"></style>