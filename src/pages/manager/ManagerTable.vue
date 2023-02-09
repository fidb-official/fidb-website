<script setup lang="ts">
import ManagerTableHead from './ManagerTableHead.vue'
import ManagerTableRow from './ManagerTableRow.vue'

import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <table>
    <ManagerTableHead class="sticky top-0 z-10 bg-white" :state="state" />
    <ManagerTableRow
      v-for="(row, index) of state.table.rows"
      :key="index"
      :state="state"
      :row="row"
    />
  </table>
</template>
