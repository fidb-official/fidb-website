<script setup lang="ts">
import { Cell } from './Cell'
import ManagerTableCellJsonDialog from './ManagerTableCellJsonDialog.vue'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
  isOpen: boolean
  close: () => void
}>()
</script>

<template>
  <div
    class="w-full min-w-max px-1 focus:outline-none"
    :class="[state.isCurrentCell(cell) && 'bg-stone-100']"
    @click="state.currentCellIsOpen = true"
  >
    {{ cell.value }}

    <ManagerTableCellJsonDialog
      :state="state"
      :isOpen="isOpen"
      :close="close"
      :cell="cell"
    />
  </div>
</template>
