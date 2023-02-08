<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-between overflow-auto px-1 text-sm"
    :class="true && 'bg-red-200 text-red-800'"
  >
    <div></div>
    <div>{{ state.url }}</div>
  </div>
</template>
