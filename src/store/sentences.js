import { db } from '@/utils/firebase';

export default {
  namespaced: true,
  state: {
    sentences: [],
    editSentence: {
      id: null, question: '', answer: '', createdAt: null, user: null,
    },
  },
  mutations: {
    set(state, sentences) {
      state.sentences = sentences;
    },
    delete(state, id) {
      db
        .collection('sentences')
        .doc(id)
        .delete();
    },
    setEdit(state, sentence) {
      state.editSentence = { ...sentence };
    },
    resetEdit(state) {
      state.editSentence.id = null;
      state.editSentence.question = '';
      state.editSentence.answer = '';
      state.editSentence.createdAt = null;
      state.editSentence.user = null;
    },
  },
  actions: {
    init({ commit }) {
      db
        .collection('sentences')
        .orderBy('createdAt', 'desc')
        .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
          const datas = [];
          querySnapshot.forEach((doc) => {
            datas.push({ id: doc.id, ...doc.data() });
          });
          commit('set', datas);
        });
    },
    async add({ rootState }, payload) {
      await db
        .collection('sentences')
        .add({
          question: payload.question, answer: payload.answer, createdAt: Date.now(), user: rootState.users.user,
        });
    },
    async edit({ rootState }, payload) {
      await db
        .collection('sentences')
        .doc(payload.id)
        .update({
          question: payload.question, answer: payload.answer, createdAt: Date.now(), user: rootState.users.user,
        });
    },
  },
};
