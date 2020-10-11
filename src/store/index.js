import Vue from 'vue';
import Vuex from 'vuex';

import sentences from '@/store/sentences';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    sentences,
  },
});
