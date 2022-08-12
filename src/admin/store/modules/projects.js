export default {
  namespaced: true,
  state: {
    projects: []
  },
  mutations: {
    SET_PROJECTS(state, projects) {
      state.projects = projects;
    },
    ADD_PROJECT(state, project) {
      state.projects.push(project);
    },
    REMOVE_PROJECT(state, projectId) {
      state.projects = state.projects.filter(project => project.id !== projectId);
    },
    EDIT_PROJECT(state, editedProject) {
      state.projects = state.projects.map(project => {
        return project.id === editedProject.id ? editedProject : project;
      });
    }
  },
  actions: {
    async fetchProjects({commit, dispatch}, userId) {
      try {
        const {data: projects} = await this.$axios.get(`/works/${userId}`);
        commit('SET_PROJECTS', projects);
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в загрузки работы", {root: true});
      }
    },
    async addProject({commit, dispatch}, newProject) {
      try {
        const {data: project} = await this.$axios.post('/works', newProject);
        commit('ADD_PROJECT', project);
        
        dispatch('notifs/showSuccess', "Работа добавлена", {root: true});
      } catch(error) {
        dispatch('notifs/showError', "Ошибка в добавлении работы", {root: true});
        console.log(error.response.status);
        console.log(error.response.data.error);
      }
    },
    async removeProject({commit, dispatch}, projectId) { 
      try {
        const response = await this.$axios.delete(`/works/${projectId}`);
        commit('REMOVE_PROJECT', projectId);

        dispatch('notifs/showSuccess', "Работа удалена", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в удалении работы", {root: true});
      }
    },
    async editProject({commit, dispatch}, project) {
      try {
        const response = await this.$axios.post(`/works/${project.get('id')}`, project);                  
        commit('EDIT_PROJECT', response.data.work);

        dispatch('notifs/showSuccess', "Работа изменена", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в изменении работы", {root: true});
      }
    }
  }
};