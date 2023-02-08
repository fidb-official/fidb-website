<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-between overflow-auto px-1 text-sm font-bold"
    :class="[
      state.status === 'ok' && 'border-x border-black bg-black text-white',
      state.status === 'running' &&
        'border-x border-yellow-500 bg-yellow-500 text-yellow-100',
      state.status === 'error' &&
        'border-x border-red-500 bg-red-500 text-red-100',
    ]"
  >
    <div></div>
    <div>{{ state.url }}</div>
  </div>
</template>
