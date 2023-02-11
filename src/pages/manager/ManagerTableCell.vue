<script setup lang="ts">
import { Cell } from './Cell'
import ManagerTableCellArray from './ManagerTableCellArray.vue'
import ManagerTableCellBoolean from './ManagerTableCellBoolean.vue'
import ManagerTableCellDate from './ManagerTableCellDate.vue'
import ManagerTableCellId from './ManagerTableCellId.vue'
import ManagerTableCellNull from './ManagerTableCellNull.vue'
import ManagerTableCellNumber from './ManagerTableCellNumber.vue'
import ManagerTableCellObject from './ManagerTableCellObject.vue'
import ManagerTableCellRevision from './ManagerTableCellRevision.vue'
import ManagerTableCellString from './ManagerTableCellString.vue'
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
    <ManagerTableCellId v-if="cell.columnName === '@id'" v-bind="$props" />
    <ManagerTableCellRevision v-else-if="cell.columnName === '@revision'" v-bind="$props" />
    <ManagerTableCellDate v-else-if="cell.columnName === '@createdAt'" v-bind="$props" disabled />
    <ManagerTableCellDate v-else-if="cell.columnName === '@updatedAt'" v-bind="$props" disabled />
    <ManagerTableCellString v-else-if="cell.kind === 'String'" v-bind="$props" />
    <ManagerTableCellNumber v-else-if="cell.kind === 'Number'" v-bind="$props" />
    <ManagerTableCellNull v-else-if="cell.kind === 'Null'" v-bind="$props" />
    <ManagerTableCellBoolean v-else-if="cell.kind === 'Boolean'" v-bind="$props" />
    <ManagerTableCellArray v-else-if="cell.kind === 'Array'" v-bind="$props" />
    <ManagerTableCellObject v-else-if="cell.kind === 'Object'" v-bind="$props" />
    <ManagerTableCellUnknown v-else v-bind="$props" />
  </div>
</template>
