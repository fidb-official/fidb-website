<script setup lang="ts">
import ManagerStatusBarPagination from './ManagerStatusBarPagination.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-center overflow-x-auto overflow-y-hidden px-1 text-sm"
    :class="[
      'transition duration-150',
      'border-x',
      state.status === 'ok' && 'border-black bg-black text-white',
      state.status === 'running' &&
        'border-yellow-500 bg-yellow-500 text-yellow-100',
      state.status === 'error' && ' border-red-500 bg-red-500 text-red-100',
    ]"
  >
    <ManagerStatusBarPagination :state="state" />
  </div>
</template>
