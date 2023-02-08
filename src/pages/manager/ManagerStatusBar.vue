<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-between overflow-auto px-1 text-sm font-bold"
    :class="true && 'border-x border-black bg-black text-white'"
  >
    <div></div>
    <div>{{ state.url }}</div>
  </div>
</template>
