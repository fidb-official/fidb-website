<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'

const props = defineProps<{
  state: State
  cell: Cell
}>()

function columnKind(): string | undefined {
  const column = props.state.table.columns.find(
    (column) => column.name === props.cell.columnName,
  )

  return column?.kind
}
</script>

<template>
  <div
    disabled
    class="w-full min-w-max px-1 text-stone-600 focus:outline-none"
    :class="[
      state.currentCell === cell && 'bg-stone-100',
      columnKind() === 'Number' && 'text-right',
      columnKind() === 'Boolean' && 'text-right',
    ]"
  >
    null
  </div>
</template>
