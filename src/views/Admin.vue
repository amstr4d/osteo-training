<template>
  <div id="admin" class="container mx-auto px-4 pt-4 h-full">
    <SentenceForm></SentenceForm>
    <hr class="mb-5">
    <div>
      <Card v-for="sentenceElem in sentences" :key="sentenceElem.id" :sentence="sentenceElem"></Card>
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
  computed: {
    ...mapState({
      sentences: (state) => state.sentences.sentences,
    }),
  },
};
</script>

<style scoped>

</style>
