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
    :disabled="state.currentCell !== cell"
    class="w-full min-w-max px-1 focus:outline-none"
    :class="[state.currentCell === cell && 'bg-stone-100']"
    v-model="cell.value"
    :size="Math.ceil(cell.value.length * 0.9)"
    @keyup.enter="stateSaveCell(state, cell)"
    @blur="stateSaveCell(state, cell)"
  />
</template>
