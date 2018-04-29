import Vue from 'vue'
import VueRouter from 'vue-router'
import * as FirebaseUI from 'firebaseui'
import VueFire from 'vuefire'

import 'firebaseui/dist/firebaseui.css'

import { auth } from './firebase'
import { router } from './routes'
import App from './app.vue'

Vue.use(VueRouter)
Vue.use(VueFire)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
  provide () {
    return {
      $authUI: new FirebaseUI.auth.AuthUI(auth),
    }
  },
}).$mount('#app')
