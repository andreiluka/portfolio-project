export default {
  namespaced: true,
  state: {
    categories: []
  },
  mutations: {
    SET_CATEGORIES(state, categories) {
      state.categories = categories;
    },
    ADD_CATEGORY(state, category) {
      state.categories.unshift({
        id: category.id,
        category: category.category,
        skills: []
      });
    },
    REMOVE_CATEGORY(state, categoryId) {
      state.categories = state.categories.filter(item => item.id !== categoryId);
    },
    EDIT_CATEGORY(state, editedCategory) {
      state.categories = state.categories.map(item => {
        return item.id === editedCategory.id ? editedCategory : item;
      });
    }
  },
  actions: {
    async fetchCategories({commit, dispatch}, userId) {
      try {
        const response = await this.$axios.get(`/categories/${userId}`);
        commit('SET_CATEGORIES', response.data.reverse());
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в загрузки групп", {root: true});
      };
    },
    async addCategory({commit, dispatch}) {
      try {
        const response = await this.$axios.post('/categories', {title: 'Новая группа'});
        commit('ADD_CATEGORY', response.data);
        
        dispatch('notifs/showSuccess', "Группа добавлена", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в добавлении группы", {root: true});
      }
    },
    async removeCategory({commit, dispatch}, categoryId) {
      try {
        const response = await this.$axios.delete(`/categories/${categoryId}`);
        commit('REMOVE_CATEGORY', categoryId);

        dispatch('notifs/showSuccess', "Группа удалена", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в удалении группы", {root: true});
      }
    },
    async editCategory({commit, dispatch}, category) {
      try {
        const response = await this.$axios.post(`/categories/${category.id}`, {
          title: category.category
        });
        commit('EDIT_CATEGORY', category);

        dispatch('notifs/showSuccess', "Группа переименована", {root: true});
     } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в переименовании группы", {root: true});
     }
    }
  }
};