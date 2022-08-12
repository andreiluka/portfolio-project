import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import categories from './modules/categories';
import skills from './modules/skills';
import projects from './modules/projects';
import reviews from './modules/reviews';
import notifs from './modules/notifs';

Vue.use(Vuex);


export default new Vuex.Store({
  modules: {
    user,
    categories,
    skills,
    projects,
    reviews,
    notifs
  }
});