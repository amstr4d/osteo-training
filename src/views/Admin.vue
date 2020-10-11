<template>
  <div id="admin" class="container mx-auto px-4 pt-4 h-full">
    <form id="question-form" @submit.prevent="addSentence" class="mb-5 scroll-to-me">
      <div>
        <label for="question-name">Ajouter une question</label>
        <input type="text" id="question-name" v-model="sentence.question" placeholder="Question" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required>
      </div>

      <div>
        <label for="answer-name">Ajouter une réponse</label>
        <textarea id="answer-name" v-model="sentence.answer" rows="5" placeholder="Réponse" class="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" required></textarea>
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
    <hr class="mb-5">
    <div>
      <Card v-for="sentenceElem in sentences" :key="sentenceElem.id" :sentence="sentenceElem"></Card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';

export default {
  name: 'Admin',
  components: { Card },
  data() {
    return {
      editId: null,
      sentence: {
        question: '',
        answer: '',
      },

    };
  },
  methods: {
    async addSentence() {
      if (this.sentence.question !== '' && this.sentence.answer !== '') {
        if (!this.editId) {
          await this.$store.commit('sentences/add', this.sentence);
          this.resetSentence();
        } else {
          await this.$store.commit('sentences/edit', { id: this.editId, sentence: this.sentence });
          this.resetSentence();
        }
      }
    },
    resetSentence() {
      this.sentence.question = '';
      this.sentence.answer = '';
      this.editId = null;
    },
  },
  computed: {
    ...mapState({
      sentences: (state) => state.sentences.sentences,
    }),
    isEditionMode() {
      return this.editId !== null;
    },
  },
};
</script>

<style scoped>

</style>
