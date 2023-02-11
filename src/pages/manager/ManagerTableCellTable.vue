<script setup lang="ts">
import { ref } from 'vue'
import { Cell } from './Cell'
import ManagerTableCellJsonDialog from './ManagerTableCellJsonDialog.vue'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
}>()

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div
    class="w-full min-w-max px-1 focus:outline-none"
    :class="[state.currentCell === cell && 'bg-stone-100']"
    @click="isOpen = true"
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
