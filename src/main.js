import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';

import './assets/css/main.css';
import './utils/firebase';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

store.dispatch('sentences/init');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
