<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center justify-between overflow-x-auto overflow-y-hidden whitespace-nowrap px-1 text-sm font-bold"
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
    <div class="flex">
      <button
        @click="state.page--"
        :disabled="state.page === 1"
        class="px-0.5"
        :class="[state.page !== 1 && 'hover:ring-1 hover:ring-white']"
      >
        <ChevronLeftIcon class="h-4 w-4" />
      </button>
      <div class="px-2" :title="`Page: ${state.page}`">{{ state.page }}</div>
      <button
        @click="state.page++"
        :disabled="state.dataset.length < state.size"
        class="px-0.5"
        :class="[
          state.dataset.length >= state.size && 'hover:ring-1 hover:ring-white',
        ]"
      >
        <ChevronRightIcon class="h-4 w-4" />
      </button>
    </div>
    <div></div>
  </div>
</template>
