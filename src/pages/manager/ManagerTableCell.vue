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
    <div>{{ cell.value.toString() }}</div>
  </div>
</template>
