<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'
import { stateSaveCell } from './stateSaveCell'
import { stateStatusError } from './stateStatus'

defineProps<{
  state: State
  cell: Cell
}>()

function saveNumber(state: State, cell: Cell) {
  const n = Number.parseFloat(cell.value)
  if (Number.isNaN(n)) {
    stateStatusError(state, {
      who: 'saveNumber',
      message: 'value is not a number',
      data: { value: cell.value },
    })
  } else {
    cell.value = n
    stateSaveCell(state, cell)
  }
}
</script>

<template>
  <input
    :disabled="state.currentCell !== cell"
    class="w-full min-w-max px-1 text-right text-yellow-600 focus:outline-none"
    :class="[state.currentCell === cell && 'bg-stone-200']"
    v-model="cell.value"
    :size="cell.value.toString().length * 0.9"
    @keyup.enter="saveNumber(state, cell)"
    @blur="saveNumber(state, cell)"
  />
</template>
