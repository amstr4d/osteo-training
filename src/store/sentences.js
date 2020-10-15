import firebase from 'firebase/app';
import 'firebase/firestore';

export default {
  namespaced: true,
  state: {
    sentences: [],
    editSentence: {
      id: null, question: '', answer: '', createdAt: null,
    },
  },
  mutations: {
    set(state, sentences) {
      state.sentences = sentences;
    },
    async add(state, payload) {
      await firebase.firestore()
        .collection('sentences')
        .add({ question: payload.question, answer: payload.answer, createdAt: Date.now() });
    },
    async edit(state, payload) {
      await firebase.firestore()
        .collection('sentences')
        .doc(payload.id)
        .update({ question: payload.question, answer: payload.answer });
    },
    delete(state, id) {
      firebase.firestore()
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
    },
  },
  actions: {
    init({ commit }) {
      firebase.firestore()
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
  },
};
