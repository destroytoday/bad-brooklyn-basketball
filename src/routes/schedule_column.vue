<template>
  <div class='bb-schedule-column'>
    <header class='bb-schedule-column__header'>
      {{ date | date('ddd') }}<br>
      {{ date | date('MMM D') }}
    </header>

    <ul class='bb-schedule-column__list'>
      <li
        v-for='response in responses'
        :key='response[".key"]'
        class='bb-schedule-column__item'
      >
        {{ response.user.displayName }}
      </li>
    </ul>

    <button
      class='bb-schedule-column__button'
      @click='setResponse(!response || !response.isIn)'
    >
      <span v-if='response && response.isIn'>I’m out</span>
      <span v-else>I’m in</span>
    </button>
  </div>
</template>

<script>
  import {
    format as formatDate,
  } from 'date-fns'

  import { db, auth } from '../firebase'

  export default {
    filters: {
      date: formatDate,
    },

    props: {
      date: {
        type: Date,
        required: true,
      },
      responses: {
        type: Array,
        required: true,
      },
    },

    computed: {
      response () {
        return this.responses.find(({ user }) => user.uid === auth.currentUser.uid)
      },
    },

    methods: {
      setResponse (isIn) {
        if (!this.response) {
          db.ref('responses').push({
            date: this.date.getTime(),
            isIn,
            user: {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
            },
          })
        } else {
          db.ref('responses').child(this.response['.key']).remove()
        }
      },
    },
  }
</script>

<style lang='sass' scoped>

  .bb-schedule-column
    display: flex
    flex-direction: column
    align-items: stretch

    //
    //
    //

    &__header
      padding: 0.25em 0.5em
      font-weight: bold
      border: solid 1px lightgrey

    //
    //
    //

    &__list
      list-style: none
      padding: 0

</style>
