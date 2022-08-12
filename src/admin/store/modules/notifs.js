export default {
  namespaced: true,
  state: {
    text: 'test',
    isError: false,
    isShown: false
  },
  mutations: {
    SHOW_ERROR: (state, text) => {
      state.text = text;
      state.isError = true;
      state.isShown = true;
    },
    SHOW_SUCCESS: (state, text) => {
      state.text = text;
      state.isError = false;
      state.isShown = true;
    },
    HIDE_NOTIF: (state) => {
      state.text = '';
      state.isError = false;
      state.isShown = false;
    }
  },
  actions: {
    showError: ({commit, dispatch}, text) => {
      commit('SHOW_ERROR', text);
      setTimeout(() => {
        dispatch('hideNotif')
      }, 2000);
    },
    showSuccess: ({commit, dispatch}, text) => {
      commit('SHOW_SUCCESS', text);
      setTimeout(() => {
        dispatch('hideNotif')
      }, 2000);
    },
    hideNotif: ({commit}) => {
      commit('HIDE_NOTIF');
    }
  }
};