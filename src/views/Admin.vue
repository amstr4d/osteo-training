<template>
  <div id="admin" class="container mx-auto px-4 pt-4 h-full">
    <SentenceForm></SentenceForm>
    <hr class="mb-5">
    <div>
      <div>
        <label for="search-input" class="sr-only">Recherche</label>
        <input type="text" id="search-input" v-model="filter" placeholder="Recherche">
      </div>
      <Card v-for="sentenceElem in filteredItems" :key="sentenceElem.id" :sentence="sentenceElem"></Card>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Card from '@/components/Card.vue';
import SentenceForm from '@/components/SentenceForm.vue';

export default {
  name: 'Admin',
  components: { SentenceForm, Card },
  data() {
    return {
      filter: null,
    };
  },
  computed: {
    ...mapState({
      sentences: (state) => state.sentences.sentences,
    }),
    orderedItems() {
      return this.sentences.slice(0).sort((a, b) => (a.createdAt - b.createdAt));
    },
    filteredItems() {
      const regex = new RegExp(this.filter, 'im');
      if (this.filter) {
        return this.sentences.slice(0).filter((item) => regex.test(item.question));
      }
      return this.sentences;
    },
  },
};
</script>

<style scoped>

</style>
