<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-between overflow-auto px-1 text-sm font-bold"
    :class="[
      'transition duration-150',
      'border-x',
      state.status === 'ok' && 'border-black bg-black text-white',
      state.status === 'running' &&
        'border-yellow-500 bg-yellow-500 text-yellow-100',
      state.status === 'error' && ' border-red-500 bg-red-500 text-red-100',
    ]"
  >
    <div></div>
    <div class="flex space-x-3">
      <button @click="state.page--" :disabled="state.page === 1">
        {{ '<' }}
      </button>
      <div :title="`Page: ${state.page}`">{{ state.page }}</div>
      <button @click="state.page++">{{ '>' }}</button>
    </div>
    <div></div>
  </div>
</template>
