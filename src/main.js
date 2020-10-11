import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';
import App from './App.vue';
import './registerServiceWorker';

import './assets/css/main.css';
import router from './router';
import store from './store';

Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: 'AIzaSyD1Ffx1Tg7B_lCfxEA1ZshB5rZnblhbr9Q',
  authDomain: 'osteo-training.firebaseapp.com',
  databaseURL: 'https://osteo-training.firebaseio.com',
  projectId: 'osteo-training',
  storageBucket: 'osteo-training.appspot.com',
  messagingSenderId: '583362509599',
  appId: '1:583362509599:web:384b1e4b837f86ae348e2a',
};

firebase.initializeApp(firebaseConfig);

firebase.firestore().enablePersistence();

store.dispatch('sentences/init');

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
