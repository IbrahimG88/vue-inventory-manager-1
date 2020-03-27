import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import store from './store/index';
import firebase from 'firebase/app';
import 'firebase/firestore';



Vue.config.productionTip = false

firebase.initializeApp({
 <add config from console>
  });

export const db = firebase.firestore();

new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
