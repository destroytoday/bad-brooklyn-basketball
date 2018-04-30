<template>
  <div class='bb-schedule-column'>
    <header class='bb-schedule-column__header'>
      {{ date | date('ddd') }}<br>
      {{ date | date('MMM D') }}
    </header>

    <div style='display: flex'>
      <select
        v-model='datetime'
      >
        <option
          v-for='time in times'
          :key='time'
          :value='time'
        >{{ time | date('h:mma') }}</option>
      </select>

      <button
        class='bb-schedule-column__button'
        style='flex: 1'
        @click='setResponse({ isIn: true, datetime })'
      >
        <span v-if='!response || !response.isIn'>I’m in</span>
        <span v-else>Update Time</span>
      </button>
    </div>

    <button
      v-if='!response || response.isIn'
      class='bb-schedule-column__button'
      @click='setResponse({ isIn: false, datetime: date.getTime() })'
    >
      <span v-if='response && response.isIn'>Actually,</span> I’m out
    </button>

    <ul class='bb-schedule-column__list'>
      <li
        v-for='response in responses'
        :key='response[".key"]'
        class='bb-schedule-column__item'
      >
        {{ response.user.displayName }}
        is
        <span v-if='response.isIn'>in for {{ response.datetime | date('h:mma') }}</span>
        <span v-else>out</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import {
    getDay,
    setHours,
    setMinutes,
    format as formatDate,
  } from 'date-fns'

  import { db, auth } from '../firebase'

  const defaultTimes = [9, 18, 18, 18, 18, 7, 9]

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

    data () {
      return {
        datetime: null,
      }
    },

    created () {
      this.datetime = setHours(this.date, defaultTimes[getDay(this.date)]).getTime()
    },

    computed: {
      response () {
        return this.responses.find(({ user }) => user.uid === auth.currentUser.uid)
      },

      times () {
        const minHour = 7
        const maxHour = 21

        return Array((maxHour - minHour) * 2).fill().map((_, n) => {
          return setMinutes(this.date, (minHour + n / 2) * 60).getTime()
        })
      },
    },

    methods: {
      setResponse ({ isIn, datetime }) {
        if (!this.response) {
          db.ref('responses').push({
            datetime,
            isIn,
            user: {
              uid: auth.currentUser.uid,
              displayName: auth.currentUser.displayName,
            },
          })
        } else {
          db.ref('responses').child(this.response['.key']).update({ datetime, isIn })
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
