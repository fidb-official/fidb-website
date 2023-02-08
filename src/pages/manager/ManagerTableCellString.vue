<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'
import { stateSaveCell } from './stateSaveCell'

const { state, cell } = defineProps<{
  state: State
  cell: Cell
}>()

function isActive(): boolean {
  return state.currentCell === cell
}
</script>

<template>
  <input
    v-if="isActive()"
    class="w-full bg-stone-200 px-1 ring-4 ring-stone-500 focus:outline-none"
    :length="cell.value.length"
    v-model="cell.value"
    @keyup.enter="stateSaveCell(state, cell)"
    @blur="stateSaveCell(state, cell)"
  />

  <div v-else class="flex space-x-0.5 px-1">
    <span class="whitespace-pre">{{ cell.value }}</span>
  </div>
</template>
