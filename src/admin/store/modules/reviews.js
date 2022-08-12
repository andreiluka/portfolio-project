export default {
  namespaced: true,
  state: {
    reviews: []
  },
  mutations: {
    SET_REVIEWS(state, reviews) {
      state.reviews = reviews;
    },
    ADD_REVIEW(state, review) {
      state.reviews.push(review);
    },
    REMOVE_REVIEW(state, reviewId) {
      state.reviews = state.reviews.filter(review => review.id !== reviewId);
    },
    EDIT_REVIEW(state, editedReview) {
      state.reviews = state.reviews.map(review => {
        return review.id === editedReview.id ? editedReview : review;
      });
    }
  },
  actions: {
    async fetchReviews({commit, dispatch}, userId) {
      try {
        const {data: reviews} = await this.$axios.get(`/reviews/${userId}`);
        commit('SET_REVIEWS', reviews);
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в загрузки отзывов", {root: true});
      }
    },
    async addReview(state, newReview) {
      try {
        const {data: review} = await this.$axios.post('/reviews', newReview);
        state.commit('ADD_REVIEW', review);
        
        state.dispatch('notifs/showSuccess', "Отзыв добавлен", {root: true});
      } catch(error) {
        state.dispatch('notifs/showError', "Ошибка в добавлении отзыва", {root: true});
        console.log(error.response.status);
        console.log(error.response.data.error);
      }
    },
    async removeReview({commit, dispatch}, reviewId) { 
      try {
        const response = await this.$axios.delete(`/reviews/${reviewId}`);
        commit('REMOVE_REVIEW', reviewId);

        dispatch('notifs/showSuccess', "Отзыв удален", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в удалении отзыва", {root: true});
      }
    },
    async editReview({commit, dispatch}, review) {
      try {
        const response = await this.$axios.post(`/reviews/${review.get('id')}`, review);                  
        commit('EDIT_REVIEW', response.data.review);

        dispatch('notifs/showSuccess', "Отзыв изменен", {root: true});
      } catch(error) {
        console.log(error);
        dispatch('notifs/showError', "Ошибка в изменении отзыва", {root: true});
      }
    },
  }
};