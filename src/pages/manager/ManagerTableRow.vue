<script setup lang="ts">
import ManagerTableCell from './ManagerTableCell.vue'
import { Row } from './Row'
import { State } from './State'

defineProps<{
  state: State
  row: Row
}>()
</script>

<template>
  <tr>
    <td
      v-for="(cell, index) of row.cells"
      :key="index"
      class="overflow-auto whitespace-nowrap border border-black"
    >
      <ManagerTableCell :state="state" :row="row" :cell="cell" />
    </td>
  </tr>
</template>
