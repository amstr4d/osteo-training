import firebase from 'firebase';

export default {
  namespaced: true,
  state: {
    sentences: [],
  },
  mutations: {
    set(state, sentences) {
      state.sentences = sentences;
    },
    async add(state, payload) {
      await firebase.firestore()
        .collection('sentences')
        .add({ ...payload, createdAt: Date.now() });
    },
    async edit(state, payload) {
      await firebase.firestore()
        .collection('sentences')
        .doc(payload.id)
        .update(payload.sentence);
    },
    delete(state, id) {
      firebase.firestore()
        .collection('sentences')
        .doc(id)
        .delete();
    },
  },
  actions: {
    init({ commit }) {
      firebase.firestore()
        .collection('sentences')
        .orderBy('createdAt', 'asc')
        .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push({ id: doc.id, ...doc.data() });
          });
          commit('set', datas);
        });
    },
  },
};
