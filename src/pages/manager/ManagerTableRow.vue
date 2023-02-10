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
  <tr :class="[state.currentRowIndex === row.index && 'bg-stone-200']">
    <td
      class="sticky left-0 border border-black ring-1 ring-black"
      :class="[
        state.currentRowIndex === row.index ? 'bg-stone-200' : 'bg-white',
      ]"
    >
      <!-- negative margin for chrome (must use div) -->
      <div
        class="-m-0.5 border-r border-black px-1 text-right"
        @mouseover="state.currentRowIndex = row.index"
      >
        {{ row.index }}
      </div>
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
