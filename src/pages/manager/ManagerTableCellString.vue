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
    class="w-full bg-stone-200 px-1 focus:outline-none"
    v-model="cell.value"
    @keyup.enter="stateSaveCell(state, cell)"
    @blur="stateSaveCell(state, cell)"
  />

  <div v-else class="flex w-full whitespace-nowrap px-1">
    <span>{{ cell.value }}</span>
    <!-- for clickable -->
    <span>&nbsp;</span>
  </div>
</template>
