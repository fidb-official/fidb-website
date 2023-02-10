<script setup lang="ts">
import { Cell } from './Cell'
import ManagerTableRowDialogCellArray from './ManagerTableRowDialogCellArray.vue'
import ManagerTableRowDialogCellBoolean from './ManagerTableRowDialogCellBoolean.vue'
import ManagerTableRowDialogCellNull from './ManagerTableRowDialogCellNull.vue'
import ManagerTableRowDialogCellNumber from './ManagerTableRowDialogCellNumber.vue'
import ManagerTableRowDialogCellObject from './ManagerTableRowDialogCellObject.vue'
import ManagerTableRowDialogCellString from './ManagerTableRowDialogCellString.vue'
import ManagerTableRowDialogCellTable from './ManagerTableRowDialogCellTable.vue'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <!-- prettier-ignore -->
  <div>
    <ManagerTableRowDialogCellString v-if="cell.kind === 'String'" v-bind="$props" />
    <ManagerTableRowDialogCellNumber v-else-if="cell.kind === 'Number'" v-bind="$props" />
    <ManagerTableRowDialogCellNull v-else-if="cell.kind === 'Null'" v-bind="$props" />
    <ManagerTableRowDialogCellBoolean v-else-if="cell.kind === 'Boolean'" v-bind="$props" />
    <ManagerTableRowDialogCellArray v-else-if="cell.kind === 'Array'" v-bind="$props" />
    <ManagerTableRowDialogCellObject v-else-if="cell.kind === 'Object'" v-bind="$props" />
    <ManagerTableRowDialogCellTable v-else-if="cell.kind === 'Table'" v-bind="$props" />
    <ManagerTableRowDialogCellUnknown v-else v-bind="$props" />
  </div>
</template>
