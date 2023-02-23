<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import { PathEntryDirectory } from './PathEntry'
import { State } from './State'
import { stateLoadPathEntryChildren } from './stateLoadPathEntryChildren'

defineProps<{
  state: State
  pathEntry: PathEntryDirectory
}>()
</script>

<template>
  <div class="flex justify-between">
    <div></div>
    <div class="flex">
      <button
        @click="
          pathEntry.page-- && stateLoadPathEntryChildren(state, pathEntry)
        "
        :disabled="pathEntry.page === 1"
        class="px-0.5"
        :class="[pathEntry.page !== 1 && 'hover:ring-1 hover:ring-white']"
      >
        <ChevronLeftIcon class="h-4 w-4" />
      </button>
      <div class="px-2">{{ pathEntry.page }}</div>
      <button
        @click="
          pathEntry.page++ && stateLoadPathEntryChildren(state, pathEntry)
        "
        :disabled="pathEntry.children.length < pathEntry.size"
        class="px-0.5"
        :class="[
          pathEntry.children.length >= pathEntry.size &&
            'hover:ring-1 hover:ring-white',
        ]"
      >
        <ChevronRightIcon class="h-4 w-4" />
      </button>
    </div>
    <div></div>
  </div>
</template>
