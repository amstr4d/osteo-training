import { firebase, auth } from '@/utils/firebase';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  mutations: {
    setCurrentUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async login({ commit }) {
      const provider = new firebase.auth.GoogleAuthProvider();
      const res = await auth.signInWithPopup(provider);
      await commit('setCurrentUser', res.user.toJSON());
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('setCurrentUser', null);
    },
  },
};
