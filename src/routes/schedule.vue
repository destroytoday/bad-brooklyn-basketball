<template>
  <div class='bb-schedule'>
    <bb-schedule-column
      v-for='column in columns'
      :key='column.key'
      :date='column.date'
      :responses='column.responses'
    />
  </div>
</template>

<script>
  import {
    addDays,
    eachDay,
    endOfDay,
    isSameDay,
  } from 'date-fns'

  import { db } from '../firebase'
  import BbScheduleColumn from './schedule_column'

  const startDate = new Date
  const endDate = endOfDay(addDays(new Date, 6))

  export default {
    components: {
      BbScheduleColumn,
    },

    firebase: {
      $responses: db.ref('responses')
        .orderByChild('datetime')
        .startAt(startDate.getTime())
        .endAt(endDate.getTime()),
    },

    computed: {
      columns () {
        return eachDay(startDate, endDate).map((date) => ({
          key: date.toString(),
          date,
          responses: this.$responses.filter((response) => isSameDay(response.datetime, date)),
        }))
      },
    },
  }
</script>

<style lang='sass' scoped>

  .bb-schedule
    display: flex

    & /deep/ .bb-schedule-column
      flex: 1

</style>
