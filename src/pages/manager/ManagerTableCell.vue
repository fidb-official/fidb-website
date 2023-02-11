<script setup lang="ts">
import { Cell } from './Cell'
import ManagerTableCellArray from './ManagerTableCellArray.vue'
import ManagerTableCellBoolean from './ManagerTableCellBoolean.vue'
import ManagerTableCellNull from './ManagerTableCellNull.vue'
import ManagerTableCellNumber from './ManagerTableCellNumber.vue'
import ManagerTableCellObject from './ManagerTableCellObject.vue'
import ManagerTableCellString from './ManagerTableCellString.vue'
import ManagerTableCellTable from './ManagerTableCellTable.vue'
import ManagerTableCellUnknown from './ManagerTableCellUnknown.vue'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <!-- prettier-ignore -->
  <div
    class="scrollbar-hide w-full max-w-prose overflow-x-auto whitespace-nowrap"
    :class="[state.currentCell === cell && 'ring-2 ring-stone-500']"
    @mouseover="state.currentCell = cell"
  >
    <ManagerTableCellString v-if="cell.kind === 'String'" v-bind="$props" />
    <ManagerTableCellNumber v-else-if="cell.kind === 'Number'" v-bind="$props" />
    <ManagerTableCellNull v-else-if="cell.kind === 'Null'" v-bind="$props" />
    <ManagerTableCellBoolean v-else-if="cell.kind === 'Boolean'" v-bind="$props" />
    <ManagerTableCellArray v-else-if="cell.kind === 'Array'" v-bind="$props" />
    <ManagerTableCellObject v-else-if="cell.kind === 'Object'" v-bind="$props" />
    <ManagerTableCellTable v-else-if="cell.kind === 'Table'" v-bind="$props" />
    <ManagerTableCellUnknown v-else v-bind="$props" />
  </div>
</template>
