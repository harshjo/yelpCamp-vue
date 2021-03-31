import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import router from './router'
import {firebaseConfig} from './firebase/firebaseConfig'
import firebase from 'firebase'
import 'firebase/firestore'
import store from './store'

Vue.config.productionTip = false
firebase.initializeApp(firebaseConfig)
Vue.prototype.$db = firebase.firestore()
Vue.use(BootstrapVue, IconsPlugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
