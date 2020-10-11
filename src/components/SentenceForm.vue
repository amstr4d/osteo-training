<template>
  <form id="question-form" @submit.prevent="addSentence" class="mb-5 scroll-to-me">
    <div>
      <label for="question-name">Ajouter une question</label>
      <input type="text" id="question-name" v-model="currentSentence.question" placeholder="Question" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required>
    </div>

    <div>
      <label for="answer-name">Ajouter une réponse</label>
      <textarea id="answer-name" v-model="currentSentence.answer" rows="5" placeholder="Réponse" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required></textarea>
    </div>
    <div class="flex justify-between">
      <button type="reset" @click="resetSentence" class="hover:text-teal-600 focus:outline-none">
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
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'SentenceForm',
  methods: {
    async addSentence() {
      if (this.currentSentence.question !== '' && this.currentSentence.answer !== '') {
        if (!this.currentSentence.id) {
          await this.$store.commit('sentences/add', this.currentSentence);
        } else {
          await this.$store.commit('sentences/edit', this.currentSentence);
        }
        this.resetSentence();
      }
    },
    resetSentence() {
      this.$store.commit('sentences/resetEdit');
    },
  },
  computed: {
    ...mapState({
      currentSentence: (state) => state.sentences.editSentence,
    }),
    isEditionMode() {
      return this.currentSentence.id !== null;
    },
  },
};
</script>

<style scoped>

</style>
