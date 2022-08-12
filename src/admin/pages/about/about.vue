<template>
  <div class="page-about">
    <div class="container container--admin">
      <page-title :title="'Блок «Обо мне»'">
        <iconed-button
          type="iconed"
          @click="addNewCategory"
          title="Добавить группу"
        />
      </page-title>
    </div>
    <div class="container container--admin container--width">
      <div class="admin-skils">
        <category
          v-for="(category) in categories"
          :key="category.id"
          :categorySkills="category"
          :skills="filterSkillsByCategory(category.id)"
        />
      </div>
    </div>
  </div>
</template>

<script>
  import pageTitle from "components/pageTitle";
  import button from "components/button";
  import category from "components/category";
  import { mapActions, mapState } from "vuex";

  export default {
    components: {
      pageTitle,
      iconedButton: button,
      category
    },
    computed: {
      ...mapState('categories', {
        categories: state => state.categories
      }),
      ...mapState('skills', {
        skills: state => state.skills
      })
    },
    methods: {
      ...mapActions('categories', ['fetchCategories', 'addCategory']),
      ...mapActions('skills', ['fetchSkills']),
      ...mapActions('notifs', ['showError']),
      async addNewCategory() {
        try {
          this.addCategory();
        } catch(error) {
          console.log(error);
          this.showError(error.response.data.error);
        }
      },
      filterSkillsByCategory(categoryId) {
        return this.skills.filter(skill => skill.category === categoryId);
      }
    },
    async created() {
      try {
        this.fetchCategories(this.$store.getters["user/getUserId"]);
      } catch(error) {
        console.log(error);
        this.showError(error.response.data.error);
      };

      try {
        this.fetchSkills(this.$store.getters["user/getUserId"]);
      } catch(error) {
        console.log(error);
        this.showError(error.response.data.error);
      };
    }
  };
</script>

<style lang="postcss" scoped src="./about.pcss"></style>