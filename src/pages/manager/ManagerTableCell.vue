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
  <div class="hover:bg-stone-200" @click="state.currentCell = cell">
    <ManagerTableCellString v-if="cell.kind === 'String'" :state="state" :cell="cell" />
    <ManagerTableCellNumber v-else-if="cell.kind === 'Number'" :state="state" :cell="cell" />
    <ManagerTableCellNull v-else-if="cell.kind === 'Null'" :state="state" :cell="cell" />
    <ManagerTableCellBoolean v-else-if="cell.kind === 'Boolean'" :state="state" :cell="cell" />
    <ManagerTableCellArray v-else-if="cell.kind === 'Array'" :state="state" :cell="cell" />
    <ManagerTableCellObject v-else-if="cell.kind === 'Object'" :state="state" :cell="cell" />
    <ManagerTableCellTable v-else-if="cell.kind === 'Table'" :state="state" :cell="cell" />
    <ManagerTableCellUnknown v-else :state="state" :cell="cell" />
  </div>
</template>
