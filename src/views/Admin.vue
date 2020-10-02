<template>
  <div id="admin">
    <h1>Kine Training</h1>
    <form @submit.prevent="addSymtom" class="mb-3">
      <div>
        <label for="symptom-name">Ajouter une dysfonction</label>
        <input type="text" id="symptom-name" v-model="sentence.symptom" placeholder="Dysfonction" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white">
      </div>

      <div>
        <label for="test-name">Ajouter un test / correction</label>
        <textarea id="test-name" v-model="sentence.test" rows="5" placeholder="Test / Correction" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"></textarea>
      </div>
      <button type="submit" class="shadow bg-teal-600 hover:bg-teal-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">Ajouter</button>
    </form>

    <table class="table-auto border w-full">
      <thead>
      <tr>
        <th class="border">Dysfonction</th>
        <th class="border">Test / correction</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(sentenceElem, index) in sentences" :key="index">
        <td class="border">{{ sentenceElem.symptom }}</td>
        <td class="border">{{ sentenceElem.test }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Admin',
  data() {
    return {
      sentences: [],
      sentence: {
        symptom: '',
        test: '',
      },

    };
  },
  methods: {
    addSymtom() {
      if (this.sentence.symptom !== '' && this.sentence.test !== '') {
        firebase.firestore()
          .collection('sentences')
          .add(this.sentence)
          .then(() => {
            this.sentence.symptom = '';
            this.sentence.test = '';
          });
      }
    },
  },
  created() {
    firebase.firestore()
      .collection('sentences')
      .onSnapshot((querySnapshot) => {
        const datas = [];
        querySnapshot.forEach((doc) => {
          datas.push(doc.data());
        });
        this.sentences = datas;
      });
  },
};
</script>

<style scoped>

</style>
