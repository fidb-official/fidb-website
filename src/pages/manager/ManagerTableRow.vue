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
      class="sticky left-0 border border-black bg-white text-right ring-1 ring-black"
    >
      <div class="-m-0.5 border-r border-black px-1">{{ row.index }}</div>
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
