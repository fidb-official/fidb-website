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
    type="text"
    class="w-full bg-stone-200 px-1 ring-4 ring-stone-500 focus:outline-none"
    v-model="cell.value"
    @keyup.enter="stateSaveCell(state, cell)"
    @blur="stateSaveCell(state, cell)"
  />

  <div v-else class="flex space-x-0.5 px-1">
    <span class="whitespace-pre">{{ cell.value }}&nbsp;</span>
  </div>
</template>
