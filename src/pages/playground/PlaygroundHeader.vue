<script setup lang="ts">
import { PlaygroundState as State } from './PlaygroundState'
import PlaygroundToolbar from './PlaygroundToolbar.vue'

defineProps<{
  state: State
}>()
</script>

<template>
  <div
    class="flex items-center justify-between border-b border-theme-300 bg-theme-200 px-3 py-2"
  >
    <div class="font-logo text-xl font-semibold text-theme-900">Playground</div>

    <PlaygroundToolbar :state="state" />
  </div>
</template>
