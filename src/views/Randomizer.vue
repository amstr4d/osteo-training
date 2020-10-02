<template>
  <div id="randomizer">
    <div v-if="this.current">
      <p>{{this.current.symptom}}</p>
      <button @click="toggleSolution">Voir la solution</button>
      <p v-if="showSolution">{{this.current.test}}</p>
    </div>

    <div v-if="showFinish">
      <p>Terminé !</p>
      <button @click.prevent="reset">Recommencer ?</button>
    </div>

    <button v-if="!showFinish" @click.prevent="getRandomSentence" class="shadow bg-teal-600 hover:bg-teal-500 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded">tirage</button>
  </div>
</template>

<script>
import firebase from 'firebase';

export default {
  name: 'Randomizer',
  data() {
    return {
      sentences: [],
      selected: [],
      current: null,
      showSolution: false,
      showFinish: false,
    };
  },
  methods: {
    getRandomSentence() {
      this.showSolution = false;
      const random = this.getRandomInt(this.selected.length);
      this.current = this.selected[random];
      this.selected.splice(random, 1);
      if (this.selected.length <= 0) {
        this.showFinish = true;
      }
    },
    copyToSelected() {
      this.selected = [...this.sentences];
    },
    getRandomInt(max) {
      return Math.floor(Math.random() * Math.floor(max));
    },
    toggleSolution() {
      this.showSolution = !this.showSolution;
    },
    reset() {
      this.showFinish = false;
      this.copyToSelected();
      this.getRandomSentence();
    },
    initSentences() {
      this.showFinish = false;
      if (this.sentences.length <= 0) {
        firebase.firestore()
          .collection('sentences')
          .onSnapshot((querySnapshot) => {
            const datas = [];
            querySnapshot.forEach((doc) => {
              datas.push(doc.data());
            });
            this.sentences = datas;
            this.copyToSelected();
          });
      }
    },
  },
  created() {
    this.initSentences();
  },
};
</script>
