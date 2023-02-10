<script setup lang="ts">
import { ref } from 'vue'
import ManagerTableCell from './ManagerTableCell.vue'
import ManagerTableRowDialog from './ManagerTableRowDialog.vue'
import { Row } from './Row'
import { State } from './State'

defineProps<{
  state: State
  row: Row
}>()

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
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
        @click="isOpen = true"
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

    <ManagerTableRowDialog
      :state="state"
      :row="row"
      :isOpen="isOpen"
      :close="close"
    />
  </tr>
</template>
