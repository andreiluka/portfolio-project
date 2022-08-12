import Vue from 'vue';
import App from './App.vue';
import router from './router';
import SimpleVueValidation from 'simple-vue-validator';
import store from './store';
import axios from './requests';

store.$axios = axios;

Vue.use(SimpleVueValidation);

new Vue({
  el: "#app-root",
  router,
  store,
  render: h => h(App)
});