import Vue from 'vue'
import Firebase from 'firebase'
import * as FirebaseUI from 'firebaseui'
import Vuetify from 'vuetify'
import App from './app.vue'

import 'firebaseui/dist/firebaseui.css'
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify)
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
  render: h => h(App),
  provide () {
    return {
      $authUI: new FirebaseUI.auth.AuthUI(Firebase.auth()),
    }
  },
}).$mount('#app')
