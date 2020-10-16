<template>
  <form id="question-form" @submit.prevent="addSentence" class="mb-5 scroll-to-me">
    <div>
      <label for="question-name">Ajouter une question</label>
      <input type="text" id="question-name" v-model="currentSentence.question" placeholder="Question" required>
    </div>

    <div class="editor">
      <label for="answer-name">Ajouter une réponse</label>
      <editor-content :editor="editor" class="editor_content" id="answer-name" v-model="currentSentence.answer"/>
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
import { Editor, EditorContent } from 'tiptap';
import { HardBreak, Placeholder } from 'tiptap-extensions';

export default {
  name: 'SentenceForm',
  components: {
    EditorContent,
  },
  data() {
    return {
      editor: null,
    };
  },
  methods: {
    async addSentence() {
      if (this.currentSentence.question !== '' && this.currentSentence.answer !== '') {
        if (!this.currentSentence.id) {
          await this.$store.dispatch('sentences/add', this.currentSentence);
        } else {
          await this.$store.dispatch('sentences/edit', this.currentSentence);
        }
        this.resetSentence();
      }
    },
    resetSentence() {
      this.$store.commit('sentences/resetEdit');
      this.editor.clearContent(true);
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
  mounted() {
    this.editor = new Editor({
      extensions: [
        new HardBreak(),
        new Placeholder({
          emptyEditorClass: 'is-editor-empty',
          emptyNodeClass: 'is-empty',
          emptyNodeText: 'Réponse',
          showOnlyWhenEditable: true,
          showOnlyCurrent: true,
        }),
      ],
      content: this.currentSentence.answer,
      onUpdate: ({ getHTML }) => {
        this.currentSentence.answer = getHTML();
      },
    });
  },
  beforeDestroy() {
    this.editor.destroy();
  },
  watch: {
    currentSentence() {
      if (this.editor) {
        this.editor.setContent(this.currentSentence.answer, true);
      }
    },
  },
};
</script>

<style>
.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #a0aec0;
  pointer-events: none;
  height: 0;
}
</style>
