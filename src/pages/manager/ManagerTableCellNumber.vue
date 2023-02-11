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
    v-if="state.currentCell === cell"
    class="scrollbar-hide w-full max-w-prose overflow-x-auto bg-stone-200 px-1 text-right text-yellow-600 ring-2 ring-stone-500 focus:outline-none"
    v-model="cell.value"
    @keyup.enter="saveNumber(state, cell)"
    @blur="saveNumber(state, cell)"
  />

  <div
    v-else
    class="scrollbar-hide flex max-w-prose justify-end overflow-x-auto whitespace-nowrap px-1 text-yellow-600"
  >
    <span>{{ cell.value }}</span>
    <!-- for clickable -->
    <span>&nbsp;</span>
  </div>
</template>
