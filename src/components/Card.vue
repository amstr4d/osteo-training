<template>
  <div class="rounded overflow-hidden shadow mb-4 bg-white dark:bg-gray-700">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2">{{ sentence.question }}</div>
      <p class="text-gray-700 dark:text-gray-200" v-html="sentence.answer"></p>
    </div>
    <div class="px-6 pt-4 pb-2">
      <div class="flex justify-between">
        <button @click="deleteSentence(sentence.id)" class="text-red-500 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
        <button @click.prevent="editSentence(sentence)" class="text-teal-600 focus:outline-none">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    sentence: Object,
  },
  methods: {
    editSentence(sentence) {
      const el = this.$parent.$el.querySelector('#question-form');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }

      this.$store.commit('sentences/setEdit', sentence);
    },
    deleteSentence(id) {
      if (window.confirm('Confirmer la suppression')) {
        this.$store.commit('sentences/delete', id);
      }
    },
  },
};
</script>

<style scoped>

</style>
