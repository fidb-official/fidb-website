<script setup lang="ts">
import { Cell } from './Cell'
import ManagerTableCellString from './ManagerTableCellString.vue'
import { State } from './State'
import { tableColumnNames } from './Table'

const { state, cell } = defineProps<{
  state: State
  cell: Cell
}>()

function active(): void {
  state.currentCell = cell
}

function isActive(): boolean {
  return state.currentCell === cell
}
</script>

<template>
  <div class="hover:bg-stone-200" @click="active()">
    <div v-if="cell.kind === 'Array'">
      <div class="flex space-x-0.5 px-1">
        <span class="text-blue-600">Array</span>
        <span>(</span>
        <span>{{ cell.value.length }}</span>
        <span>)</span>
      </div>
    </div>

    <div v-if="cell.kind === 'Object'">
      <div class="flex space-x-0.5 px-1">
        <span class="text-blue-600">Object</span>
        <span>(</span>
        <span>{{ cell.value.length }}</span>
        <span>)</span>
      </div>
    </div>

    <div v-else-if="cell.kind === 'Table'">
      <div class="flex space-x-0.5 px-1">
        <span class="text-blue-600">Table</span>
        <span>(</span>
        <span>{{ cell.value.length }}</span>
        <span>,</span>
        <span>{{ tableColumnNames(cell.value) }}</span>
        <span>)</span>
      </div>
    </div>

    <ManagerTableCellString
      v-else-if="cell.kind === 'String'"
      :state="state"
      :cell="cell"
    />

    <div v-else>
      <div class="flex space-x-0.5 px-1">
        <span>{{ cell.value }}</span>
      </div>
    </div>
  </div>
</template>
