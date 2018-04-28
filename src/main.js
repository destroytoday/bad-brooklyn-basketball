import Vue from 'vue'
import Firebase from 'firebase'
import App from './app.vue'

Vue.config.productionTip = false

Firebase.initializeApp({
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: process.env.VUE_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.VUE_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.VUE_APP_FIREBASE_PROJECT_ID,
  storageBucket: '',
  messagingSenderId: process.env.VUE_APP_FIREBASE_MESSAGING_SENDER_ID
})

new Vue({
  render: h => h(App)
}).$mount('#app')
