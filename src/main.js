import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import firebase from 'firebase/app'
import store from './store'

var firebaseConfig = {
  apiKey: "AIzaSyDfms0iD_ha2GkJd4PW5CuAhqpz9kSMyI8",
  authDomain: "yelp-camp-48371.firebaseapp.com",
  projectId: "yelp-camp-48371",
  storageBucket: "yelp-camp-48371.appspot.com",
  messagingSenderId: "143143061629",
  appId: "1:143143061629:web:4036788fd64ff3979d0914",
  measurementId: "G-SP4QE586NN"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false
Vue.use(BootstrapVue, IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
