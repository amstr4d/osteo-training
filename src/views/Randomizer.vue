<template>
  <div id="randomizer" class="container mx-auto px-4 h-full overflow-y-scroll bg-white">
    <div class="h-full flex flex-col">
      <div class="flex flex-col flex-1 items-center py-4">
        <div class="loader" :class="{'open': loading}"></div>
        <div v-if="this.current" class="flex flex-col content-center justify-center h-full text-center overflow-scroll">
          <p class="text-3xl">{{ this.current.symptom }}</p>
          <button @click="toggleSolution" class="my-10">Voir la solution</button>
          <p v-show="showSolution" class="text-2xl">{{ this.current.test }}</p>
        </div>
        <div v-else class="flex flex-col content-center justify-center h-full text-center text-xl">
          <p>A vous de répondre à chacune des questions, tirées aléatoirement.</p><br>
          <p>Vous pouvez voir la solution pour chaque question.</p><br>
          <p>Une fois toutes les questions répondues, vous pouvez recommencer dans un ordre différent.</p><br>
          <p>Cliquez pour commencer !</p>
        </div>
      </div>
      <div class="mb-4 w-full flex">
        <button v-show="!showFinish" @click.prevent="getRandomSentence"
                class="w-full">
          Nouvelle question
        </button>
        <div v-show="showFinish" class="w-full text-center">
          <p class="mb-2">Terminé !</p>
          <button @click.prevent="reset" class="w-full">Recommencer ?</button>
        </div>
      </div>
    </div>
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
      loading: false,
    };
  },
  methods: {
    getRandomSentence() {
      this.fakeLoading(() => {
        this.showSolution = false;
        const random = this.getRandomInt(this.selected.length);
        this.current = this.selected[random];
        this.selected.splice(random, 1);
        if (this.selected.length <= 0) {
          this.showFinish = true;
        }
      });
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
      this.fakeLoading(() => {
        this.showFinish = false;
        this.current = null;
        this.copyToSelected();
      });
    },
    initSentences() {
      this.showFinish = false;
      if (this.sentences.length <= 0) {
        firebase.firestore()
          .collection('sentences')
          .enablePersistence()
          .onSnapshot({ includeMetadataChanges: true }, (querySnapshot) => {
            const datas = [];
            querySnapshot.forEach((doc) => {
              datas.push(doc.data());
            });
            this.sentences = datas;
            this.copyToSelected();
          });
      }
    },
    fakeLoading(callback) {
      this.loading = true;
      setTimeout(() => {
        if (callback) {
          callback();
        }
        this.loading = false;
      }, 1000);
    },
  },
  created() {
    this.initSentences();
  },
};
</script>

<style scoped>
button {
  @apply shadow bg-teal-600 text-white font-bold py-2 px-4 rounded;
}

button:hover {
  @apply bg-teal-500;
}

button:focus {
  @apply outline-none;
}

.loader {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  pointer-events: none;
  z-index: 10;
}

.loader:before, .loader:after {
  content: '';
  display: block;
  height: 100%;
  width: 50%;
  transition: transform .6s cubic-bezier(0.83, 0, 0.17, 1);
  @apply bg-teal-500;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 1600 800'%3E%3Cg %3E%3Cpolygon fill='%2343acaa' points='800 100 0 200 0 800 1600 800 1600 200'/%3E%3Cpolygon fill='%2361b6b4' points='800 200 0 400 0 800 1600 800 1600 400'/%3E%3Cpolygon fill='%2383bbba' points='800 300 0 600 0 800 1600 800 1600 600'/%3E%3Cpolygon fill='%23a2c3c3' points='1600 800 800 400 0 800'/%3E%3Cpolygon fill='%23becfce' points='1280 800 800 500 320 800'/%3E%3Cpolygon fill='%23d8dddd' points='533.3 800 1066.7 800 800 600'/%3E%3Cpolygon fill='%23EEE' points='684.1 800 914.3 800 800 700'/%3E%3C/g%3E%3C/svg%3E");
  background-attachment: fixed;
  background-size: cover;
}
.loader:before {
  transform: translateX(-101%);
  background-position: 0;
}
.loader:after {
  transform: translateX(100%);
  background-position: 100%;
}

.loader.open:before {
  transform: translateX(0);
}
.loader.open:after {
  transform: translateX(0);
}

</style>
