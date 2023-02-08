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
  <td
    v-for="(cell, index) of row.cells"
    :key="index"
    class="overflow-auto whitespace-nowrap border border-black"
  >
    <ManagerTableCell :state="state" :cell="cell" />
  </td>
</template>
