<script setup lang="ts">
import { Cell } from './Cell'
import { State } from './State'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <div>
    <div class="font-bold">{{ cell.columnName }}</div>
    <div>{{ cell.value }}</div>
  </div>
</template>
