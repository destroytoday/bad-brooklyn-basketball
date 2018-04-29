<template>
  <div id='app'>
    <div v-if='user'>
      Logged in as: {{ user.displayName }} ({{ user.email }})<br>
      <a href='#' @click.prevent='signout'>Sign Out</a>
    </div>
    <div v-else-if='isAuthorizing'>Authorizing&hellip;</div>
    <div
      v-show='!user && !isAuthorizing'
      id='firebaseui-auth-container'
    ></div>
  </div>
</template>

<script>
import Firebase from 'firebase'
import { auth } from './firebase'

export default {
  inject: ['$authUI'],

  data () {
    return {
      isAuthorizing: false,
      user: null,
      accessToken: null,
    }
  },

  created () {
    auth.onAuthStateChanged((user) => {
      this.user = user
      this.isAuthorizing = this.$authUI.isPendingRedirect()

      if (user) {
        user.getIdToken().then((accessToken) => {
          this.accessToken = accessToken
        })
      } else {
        this.$authUI.start('#firebaseui-auth-container', {
          signInOptions: [
            Firebase.auth.GoogleAuthProvider.PROVIDER_ID,
            Firebase.auth.EmailAuthProvider.PROVIDER_ID,
          ],
          callbacks: {
            // prevents the need for a redirect URL
            signInSuccess: () => false,
          },
        })
      }
    }, (error) => {
      console.log(error)
    })
  },

  methods: {
    signout () {
      auth.signOut()
    },
  },
}
</script>

<style>

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }

</style>
