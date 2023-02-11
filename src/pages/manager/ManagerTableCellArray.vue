<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <div
    class="w-full min-w-max px-1 focus:outline-none"
    :class="[state.currentCell === cell && 'bg-stone-100']"
  >
    {{ cell.value }}
  </div>
</template>
