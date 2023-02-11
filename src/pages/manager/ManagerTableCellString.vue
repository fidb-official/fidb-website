<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'
import { stateSaveCell } from './stateSaveCell'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <input
    v-if="state.currentCell === cell"
    class="scrollbar-hide w-full max-w-prose overflow-x-auto bg-stone-200 px-1 ring-2 ring-stone-500 focus:outline-none"
    v-model="cell.value"
    @keyup.enter="stateSaveCell(state, cell)"
    @blur="stateSaveCell(state, cell)"
  />

  <div
    v-else
    class="scrollbar-hide flex w-full max-w-prose overflow-x-auto overflow-x-auto whitespace-nowrap px-1"
  >
    <span>{{ cell.value }}</span>
    <!-- for clickable -->
    <span>&nbsp;</span>
  </div>
</template>
