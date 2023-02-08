<script setup lang="ts">
import { State } from './State'
import { Cell } from './Table'

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
