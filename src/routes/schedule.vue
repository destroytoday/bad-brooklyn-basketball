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
    startOfWeek,
    endOfWeek,
    eachDay,
  } from 'date-fns'

  import { db } from '../firebase'
  import BbScheduleColumn from './schedule_column'

  const weekOptions = { weekStartsOn: 1 }
  const startDate = startOfWeek(new Date, weekOptions)
  const endDate = endOfWeek(new Date, weekOptions)

  export default {
    components: {
      BbScheduleColumn,
    },

    firebase: {
      $responses: db.ref('responses')
        .orderByChild('date')
        .startAt(startDate.getTime())
        .endAt(endDate.getTime()),
    },

    computed: {
      columns () {
        return eachDay(startDate, endDate).map((date) => ({
          key: date.toString(),
          date,
          responses: this.$responses.filter((response) => response.date === date.getTime()),
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
