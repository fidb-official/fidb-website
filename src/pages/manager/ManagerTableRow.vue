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
    <td class="overflow-auto whitespace-nowrap border border-black text-right">
      <span class="px-1"> {{ row.index }}</span>
    </td>

    <td
      v-for="(cell, index) of row.cells"
      :key="index"
      class="overflow-auto whitespace-nowrap border border-black"
    >
      <ManagerTableCell :state="state" :row="row" :cell="cell" />
    </td>
  </tr>
</template>
