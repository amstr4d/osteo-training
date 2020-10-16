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
      const userData = res.user.toJSON();
      await commit('setCurrentUser', {
        uid: userData.uid, email: userData.email, photoURL: userData.photoURL, displayName: userData.displayName,
      });
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('setCurrentUser', null);
    },
  },
};
