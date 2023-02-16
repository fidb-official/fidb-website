<script setup lang="ts">
import { State } from './State'

const props = defineProps<{ state: State }>()

function pathParts(): Array<string> {
  return props.state.currentPathEntry
    ? props.state.currentPathEntry.path.split('/')
    : []
}
</script>

<template>
  <div
    v-if="state.currentPathEntry"
    class="flex overflow-x-auto whitespace-pre pb-1"
  >
    <span
      v-for="(part, index) of pathParts()"
      :key="index"
      class="hover:underline"
    >
      {{ part }}
    </span>
    <span v-if="state.currentPathEntry?.isDirectory">/</span>
  </div>
</template>
