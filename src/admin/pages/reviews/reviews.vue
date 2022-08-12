<template>
  <div class="page-reviews">
    <div class="container container--admin">
      <page-title title="Блок «Отзывы»"></page-title>
    </div>
    <div class="container container--admin container--width">
      <div class="reviews-form" v-if="editmode === true">
        <card title="Новый отзыв">
          <div slot="content">
            <form action="#" id="review-form">
              <div class="reviews-form__block">
                <div class="reviews-form__content">
                  <div class="reviews-form__avatar">
                    <div class="reviews-form__img">
                      <img :src="previewPhoto" class="reviews-form__photo" v-if="previewPhoto">
                      <div class="reviews-form__icon" v-else></div>
                    </div>
                    <div class="reviews-form__avatar-button">
                      <appButton 
                        typeAttr="file" 
                        :inputAccept="'.jpg, .png, .gif, .jpeg, .svg'"
                        title="Добавить фото" 
                        @change="addPhoto"
                        :errorMessage="validation.firstError('formData.photo')"
                        plain 
                      />
                    </div>
                  </div>
                  <div class="reviews-form__desc">
                    <div class="reviews-form__user">
                      <app-input
                        placeholder="Петров Иван"
                        v-model="formData.author"
                        class="reviews-form__user-data"
                        title="Имя автора"
                        :errorMessage="validation.firstError('formData.author')"
                        autofocus="autofocus"
                        noSidePaddings
                      />
                      <app-input
                        placeholder="Журналист"
                        v-model="formData.occ"
                        class="reviews-form__user-data"
                        title="Титул автора"
                        :errorMessage="validation.firstError('formData.occ')"
                        noSidePaddings
                      />
                    </div>
                    <div class="reviews-form__text">
                      <app-input 
                        v-model="formData.text"
                        title="Отзыв" 
                        fieldType="textarea"
                        :errorMessage="validation.firstError('formData.text')"
                      />
                    </div>
                  </div>
                </div>
                <div class="reviews-form__buttons">
                  <div class="reviews-form__button">
                    <appButton plain title="Отмена" @click="clearFields"/>
                  </div>
                  <div class="reviews-form__button">
                    <appButton title="Сохранить" @click="onApprove"/>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </card>
      </div>
      <ul class="reviews__list">
        <li class="reviews__item">
          <square-button 
            type="square" 
            title="Добавить отзыв"
            @click="editmode = true"
          />
        </li>
        <li 
          v-for="(review, i) in reviews"
          :key="review.id"
          class="reviews__item"
        >
          <review 
            v-model="reviews[i]"
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
import review from 'components/review';
import appInput from 'components/input';
import { Validator } from 'simple-vue-validator';
import { mapState, mapActions } from 'vuex';

export default {
  mixins: [require('simple-vue-validator').mixin],
  validators: {
    'formData.author'(value) {
      return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
    },
    'formData.occ'(value) {
      return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
    },
    'formData.text'(value) {
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
    review
  },
  data() {
    return {
      formData: {
        id: 0,
        photo: '',
        author: '',
        occ: '',
        text: 'Этот парень молодец ...'
      },
      previewPhoto: '',
      editmode: false
    }
  },
  computed: {
    ...mapState('reviews', {
      reviews: state => state.reviews
    })
  },
  methods: {
    ...mapActions('reviews', ['fetchReviews', 'addReview', 'editReview']),
    ...mapActions('notifs', ['showError']),
    clearFields() {
      this.formData.id = 0;
      this.formData.photo = '';
      this.formData.author = '';
      this.formData.occ = '';
      this.formData.text = 'Этот парень молодец ...';
      this.editmode = false;
      this.previewPhoto = '';
      this.validation.reset();
    },
    onApprove() {
      this.$validate().then(async (success) => {
        if (success) {
          let reviewForm = new FormData();
          Object.keys(this.formData).forEach(key => reviewForm.append(key, this.formData[key]));

          if (this.formData.id == 0) {
            try {
              await this.addReview(reviewForm);
              this.clearFields();
            } catch (error) {
              console.log(error);
              this.showError(error.response.data.error);
            }
          } else {
            try {
              await this.editReview(reviewForm);
              this.clearFields();
            } catch (error) {
              console.log(error);
              this.showError(error.response.data.error);
            }
          }
        }
      });
    },
    editmodeActive(currentReview) {
      this.formData = {...currentReview};
      this.previewPhoto = `https://webdev-api.loftschool.com/${currentReview.photo}`;
      this.editmode = true;
      window.scrollTo(0,290);
    },
    addPhoto(photo) {
      let file = photo.srcElement.files[0];
      
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
      this.fetchReviews(this.$store.getters["user/getUserId"]);
    } catch (error) {
      console.log(error);
      this.showError(error.response.data.error);
    }
  }
};
</script>

<style lang="postcss" scoped src="./reviews.pcss"></style>