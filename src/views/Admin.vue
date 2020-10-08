<template>
  <div id="admin" class="container mx-auto px-4 pt-4 h-full">
    <form id="question-form" @submit.prevent="addSentence" class="mb-5">
      <div>
        <label for="symptom-name">Ajouter une question</label>
        <input type="text" id="symptom-name" v-model="sentence.symptom" placeholder="Question" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
      </div>

      <div>
        <label for="test-name">Ajouter une réponse</label>
        <textarea id="test-name" v-model="sentence.test" rows="5" placeholder="Réponse" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
      </div>
      <div class="flex justify-between">
        <button type="reset" @click="resetSentence">
          Annuler
        </button>
        <button type="submit" class="btn">
          <template v-if="!isEditionMode">
            Ajouter
          </template>
          <template v-else>
            Editer
          </template>
        </button>
      </div>
    </form>
    <hr class="mb-5">
    <div class="overflow-scroll">
      <div class="rounded overflow-hidden shadow mb-4 bg-white" v-for="sentenceElem in sentences" :key="sentenceElem.id">
        <div class="px-6 py-4">
          <div class="font-bold text-xl mb-2">{{ sentenceElem.symptom }}</div>
          <p class="text-gray-700 text-base">
            {{ sentenceElem.test }}
          </p>
        </div>
        <div class="px-6 pt-4 pb-2">
          <div class="flex justify-between">
            <button @click="deleteSentence(sentenceElem.id)" class="text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
            <button @click="editSentence(sentenceElem)" class="text-teal-600">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Admin',
  data() {
    return {
      editId: null,
      sentences: [],
      sentence: {
        symptom: '',
        test: '',
      },

    };
  },
  methods: {
    addSentence() {
      if (this.sentence.symptom !== '' && this.sentence.test !== '') {
        if (!this.editId) {
          firebase.firestore()
            .collection('sentences')
            .add(this.sentence)
            .then(() => {
              this.resetSentence();
            });
        } else {
          firebase.firestore()
            .collection('sentences')
            .doc(this.editId)
            .update(this.sentence)
            .then(() => {
              this.resetSentence();
            });
        }
      }
    },
    editSentence(sentence) {
      this.sentence.symptom = sentence.symptom;
      this.sentence.test = sentence.test;
      this.editId = sentence.id;
    },
    deleteSentence(id) {
      firebase.firestore()
        .collection('sentences')
        .doc(id)
        .delete()
        .then(() => {
          this.resetSentence();
        });
    },
    resetSentence() {
      this.sentence.symptom = '';
      this.sentence.test = '';
      this.editId = null;
    },
  },
  computed: {
    isEditionMode() {
      return this.editId !== null;
    },
  },
  created() {
    firebase.firestore()
      .collection('sentences')
      .onSnapshot((querySnapshot) => {
        const datas = [];
        querySnapshot.forEach((doc) => {
          const obj = {
            id: doc.id,
            ...doc.data(),
          };
          datas.push(obj);
        });
        this.sentences = datas;
      });
  },
};
</script>

<style scoped>

</style>
