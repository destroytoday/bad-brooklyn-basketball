import Vue from 'vue'
import * as FirebaseUI from 'firebaseui'
import VueFire from 'vuefire'

import 'firebaseui/dist/firebaseui.css'

import { auth } from './firebase'
import App from './app.vue'

Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
  provide () {
    return {
      $authUI: new FirebaseUI.auth.AuthUI(auth),
    }
  },
}).$mount('#app')
