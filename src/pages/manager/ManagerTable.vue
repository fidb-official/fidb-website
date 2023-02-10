<script setup lang="ts">
import ManagerTableHead from './ManagerTableHead.vue'
import ManagerTableLastRow from './ManagerTableLastRow.vue'
import ManagerTableRow from './ManagerTableRow.vue'

import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <table>
    <thead class="sticky top-0 z-10 bg-white">
      <ManagerTableHead class="ring-1 ring-black" :state="state" />
    </thead>

    <tbody>
      <ManagerTableRow
        v-for="(row, index) of state.table.rows"
        :key="index"
        :state="state"
        :row="row"
      />
      <ManagerTableLastRow :state="state" />
    </tbody>
  </table>
</template>
