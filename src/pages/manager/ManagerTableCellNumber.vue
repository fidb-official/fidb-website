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
  <div class="text-yellow-600">
    <input
      v-if="state.currentCell === cell"
      class="w-full bg-stone-200 px-1 ring-2 ring-stone-500 focus:outline-none"
      v-model="cell.value"
      @keyup.enter="saveNumber(state, cell)"
      @blur="saveNumber(state, cell)"
    />

    <div v-else class="flex justify-end space-x-0.5 px-1">
      <span class="whitespace-nowrap">{{ cell.value }}&nbsp;</span>
    </div>
  </div>
</template>
