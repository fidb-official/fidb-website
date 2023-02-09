<script setup lang="ts">
import ManagerTableHead from './ManagerTableHead.vue'
import ManagerTableRow from './ManagerTableRow.vue'

import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <table class="w-full overflow-auto">
    <ManagerTableHead :state="state" />
    <ManagerTableRow
      v-for="(row, index) of state.table.rows"
      :key="index"
      class="overflow-auto"
      :state="state"
      :row="row"
    />
  </table>
</template>
