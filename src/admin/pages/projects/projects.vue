<template>
   <div class="page-projects">
      <div class="container container--admin">
        <page-title title="Блок «Работы»"></page-title>
      </div>
      <div class="container container--admin container--width">
         <div class="projects-form"  v-if="editmode === true">
            <card title="Редактирование работы">
               <div slot="content">
                  <form action="#" id="project-form">
                     <div class="projects-form__block">
                        <div class="projects-form__content">
                           <div class="projects-form__avatar">
                              <label 
                                 class="projects-form__img" 
                                 :class="{'projects-form__img--dragover':dragover}" 
                                 @dragover.prevent="dragover = true"
                                 @dragleave="dragover = false"
                                 @drop.prevent="addPhoto"
                              >
                                 <img :src="previewPhoto" class="projects-form__photo" v-if="previewPhoto">
                                 <div class="projects-form__img-block" v-else>
                                    <div class="projects-form__img-text">
                                       Перетащите или загрузите 
                                       для загрузки изображения
                                    </div>
                                    <div class="projects-form__img-button">
                                       <appButton 
                                          typeAttr="file"
                                          :inputAccept="'.jpg, .png, .gif, .jpeg, .svg'"
                                          title="загрузить"
                                          @change="addPhoto"
                                          :errorMessage="validation.firstError('formData.photo')"
                                       />
                                    </div>
                                 </div>
                              </label>
                              <div class="projects-form__change-button" v-if="previewPhoto">
                                 <appButton 
                                    typeAttr="file" 
                                    :inputAccept="'.jpg, .png, .gif, .jpeg, .svg'"
                                    title="Изменить превью" 
                                    @change="addPhoto"
                                    :errorMessage="validation.firstError('formData.photo')"
                                    plain 
                                 />
                              </div>
                           </div>
                           <div class="projects-form__desc">
                              <div class="projects-form__general">
                                 <app-input
                                    placeholder="Название проекта"
                                    v-model="formData.title"
                                    class="projects-form__general-data"
                                    title="Название"
                                    :errorMessage="validation.firstError('formData.title')"
                                    autofocus="autofocus"
                                    noSidePaddings
                                 />
                                 <app-input
                                    placeholder="https://www.address.com"
                                    v-model="formData.link"
                                    class="projects-form__general-data"
                                    title="Ссылка"
                                    :errorMessage="validation.firstError('formData.link')"
                                    noSidePaddings
                                 />
                              </div>
                              <div class="projects-form__text">
                                 <app-input 
                                    v-model="formData.description"
                                    title="Описание" 
                                    fieldType="textarea"
                                    :errorMessage="validation.firstError('formData.description')"
                                 />
                              </div>
                              <tags-adder 
                                 @removeTag="editTags" 
                                 v-model="formData.techs"
                                 :errorMessage="validation.firstError('formData.techs')"
                              />
                           </div>
                        </div>
                        <div class="projects-form__buttons">
                           <div class="projects-form__button">
                              <appButton plain title="Отмена" @click="clearFields"/>
                           </div>
                           <div class="projects-form__button">
                              <appButton title="Сохранить" @click="onApprove"/>
                           </div>
                        </div>
                     </div>
                  </form>
               </div>
            </card>
         </div>
         <ul class="projects__list">
            <li class="projects__item">
               <square-button 
                  type="square" 
                  title="Добавить работу"
                  @click="editmode = true"
               />
            </li>
            <li 
               v-for="(project, i) in projects"
               :key="project.id"
               class="projects__item"
            >
               <project
                  v-model="projects[i]"
                  @editmodeOn="editmodeActive"
                  :editmode="editmode"
               />
            </li>
         </ul>
      </div>
   </div>
</template>

<script>
import pageTitle from 'components/pageTitle';
import card from 'components/card';
import button from 'components/button';
import project from 'components/project';
import appInput from 'components/input';
import tagsAdder from 'components/tagsAdder';
import { Validator } from 'simple-vue-validator';
import { mapState, mapActions } from 'vuex';

export default {
   mixins: [require('simple-vue-validator').mixin],
   validators: {
      'formData.title'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'formData.link'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'formData.description'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'formData.techs'(value) {
         return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'formData.photo'(value) {
         return Validator.value(value).required('ДОБАВЬТЕ ИЗОБРАЖЕНИЕ');
      }
   },
   components: {
      pageTitle,
      card,
      appInput,
      squareButton: button,
      appButton: button,
      project,
      tagsAdder
   },
   data() {
      return {
         formData: {
            id: 0,
            photo: '',
            title: '',
            link: '',
            description: '',
            techs: 'HTML, CSS, Javascript'
         },
         previewPhoto: '',
         editmode: false,
         dragover: false
      }
   },
   computed: {
      ...mapState('projects', {
         projects: state => state.projects
      })
   },
   methods: {
      ...mapActions('projects', ['fetchProjects', 'addProject', 'editProject']),
      ...mapActions('notifs', ['showError']),
      clearFields() {
         this.formData.id = 0;
         this.formData.photo = '';
         this.formData.title = '';
         this.formData.link = '';
         this.formData.description = '';
         this.formData.techs = 'HTML, CSS, Javascript';
         this.editmode = false;
         this.previewPhoto = '';
         this.validation.reset();
      },
      onApprove() {
         this.$validate().then(async (success) => {
            if (success) {
               let projectForm = new FormData();
               Object.keys(this.formData).forEach(key => projectForm.append(key, this.formData[key]));
               
               if (this.formData.id === 0) {
                  try {
                     await this.addProject(projectForm);
                     this.clearFields();
                  } catch(error) {
                     console.log(error);
                     this.showError(error.response.data.error);
                  }
               } else {
                  try {
                     await this.editProject(projectForm);
                     this.clearFields();
                  } catch(error) {
                     console.log(error);
                     this.showError(error.response.data.error);
                  }
               }
            }
         });
      },
      editmodeActive(currentProject) {
         this.formData = {...currentProject};
         this.previewPhoto = `https://webdev-api.loftschool.com/${currentProject.photo}`;
         this.editmode = true;
         window.scrollTo(0, 290);
      },
      editTags(newTagsString) {
         this.formData.techs = newTagsString;
      },
      addPhoto(event) {
         this.dragover = false;
         let file = event.type == 'drop' ? event.dataTransfer.files[0] : event.srcElement.files[0];

         if (!['image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'].includes(file.type)) {
            this.showError('Разрешены только изображения');
            this.formData.photo = '';
            return;
         }
         if (file.size > 1.5 * 1024 * 1024) {
            this.showError('Файл должен быть менее 1.5 МБ');
            return;
         }

         this.formData.photo = file;
         this.previewPhoto = URL.createObjectURL(file);
      }
   },
   created() {
      try {
         this.fetchProjects(this.$store.getters["user/getUserId"]);
      } catch (error) {
         console.log(error);
         this.showError(error.response.data.error);
      }
   }
};
</script>

<style lang="postcss" scoped src="./projects.pcss"></style>