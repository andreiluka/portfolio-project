<template>
  <div class="page-authorization">
    <div class="authorization__block">
      <a href="../" class="authorization__cross"></a>
      <h1 class="authorization__title">Авторизация</h1>
      <form method="post" @submit.prevent="onApprove">
        <div class="authorization-form">
          <div class="authorization-form__input">
            <app-input
              v-model="user.name"
              icon="user"
              title="Логин"
              :errorMessage="validation.firstError('user.name')"
              autofocus="autofocus"
            />
          </div>
          <div class="authorization-form__input">
            <app-input
              v-model="user.password"
              icon="key"
              title="Пароль"
              type="password"
              :errorMessage="validation.firstError('user.password')"
              autocomplete="off"
            />
          </div>
        </div>
        <div class="authorization-form__button">
          <button class="my-button" type="submit">отправить</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { Validator } from 'simple-vue-validator';
  import axios from '@/requests';

  export default {
    mixins: [require('simple-vue-validator').mixin],
    validators: {
      'user.name'(value) {
        return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      },
      'user.password'(value) {
        return Validator.value(value).required('ЗАПОЛНИТЕ ПОЛЕ');
      }
    },
    components: {
      appInput: () => import("components/input")
    },
    data() {
      return {
        user: {
          name: '',
          password: ''
        },
      }
    },
    methods: {
      onApprove() {
        this.$validate().then(async (success) => {
          if (success) {
            try {
              const response = await axios.post('/login', this.user);
  
              localStorage.setItem('token', response.data.token);
              axios.defaults.headers.common = {'Authorization': `bearer ${localStorage.token}`};
              
              this.$router.push('/about');
            } catch (error) {
              this.$store.dispatch('notifs/showError', error.response.data.error);
              console.log(error);
            }
          }
        });
      }
    }
  };
</script>

<style lang="postcss" scoped src="./authorization.pcss"></style>