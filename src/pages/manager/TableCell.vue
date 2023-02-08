<script setup lang="ts">
import { State } from './State'
import { Cell } from './Table'

defineProps<{
  state: State
  cell: Cell
}>()
</script>

<template>
  <div>{{ cell.value.toString() }}</div>
</template>
