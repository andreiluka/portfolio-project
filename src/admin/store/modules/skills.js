export default {
  namespaced: true,
  state: {
    skills: []
  },
  mutations: {
    SET_SKILLS(state, skills) {
      state.skills = skills;
    },
    ADD_SKILL(state, skill) {
      state.skills.push(skill);
    },
    REMOVE_SKILL(state, skillId) {
      state.skills = state.skills.filter(skill => skill.id !== skillId);
    },
    EDIT_SKILL(state, editedSkill) {
      state.skills = state.skills.map(skill => {
        return skill.id === editedSkill.id ? editedSkill : skill;
      });
    }
  },
  actions: {
    async fetchSkills({commit, dispatch}, userId) {
      try {
        const {data: skills} = await this.$axios.get(`/skills/${userId}`);                  
        commit('SET_SKILLS', skills);
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в загрузки скилов", {root: true});
      }
    },
    async addSkill(state, newSkill) {
      try {
        const response = await this.$axios.post('/skills', newSkill);                  
        state.commit('ADD_SKILL', response.data);

        state.dispatch('notifs/showSuccess', "Скил добавлен", {root: true});
      } catch(error) {
        console.log(error);
        state.dispatch('notifs/showError', "Ошибка в добавлении скила", {root: true});
      }
    },
    async removeSkill({commit, dispatch}, skillId) { 
      try {
        const response = await this.$axios.delete(`/skills/${skillId}`);
        commit('REMOVE_SKILL', skillId);

        dispatch('notifs/showSuccess', "Скил удален", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в удалении скила", {root: true});
      }
    },
    async editSkill({commit, dispatch}, skill) {
      try {
        const response = await this.$axios.post(`/skills/${skill.id}`, skill);                  
        commit('EDIT_SKILL', skill);

        dispatch('notifs/showSuccess', "Скил изменен", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в изменении скила", {root: true});
      }
    }
  }
};