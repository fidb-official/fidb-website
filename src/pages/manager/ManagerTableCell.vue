<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'
import { tableColumnNames } from './Table'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <div
    class="flex space-x-0.5 px-1 hover:bg-stone-200"
    :class="state.currentCell === cell && 'bg-stone-200 ring-4 ring-stone-400'"
    @click="state.currentCell = cell"
  >
    <template v-if="cell.kind === 'Array'">
      <span class="text-blue-600">Array</span>
      <span>(</span>
      <span>{{ cell.value.length }}</span>
      <span>)</span>
    </template>

    <template v-if="cell.kind === 'Object'">
      <span class="text-blue-600">Object</span>
      <span>(</span>
      <span>{{ cell.value.length }}</span>
      <span>)</span>
    </template>

    <template v-else-if="cell.kind === 'Table'">
      <span class="text-blue-600">Table</span>
      <span>(</span>
      <span>{{ cell.value.length }}</span>
      <span>,</span>
      <span>{{ tableColumnNames(cell.value) }}</span>
      <span>)</span>
    </template>

    <template v-else>
      <span>{{ cell.value }}</span>
    </template>
  </div>
</template>
