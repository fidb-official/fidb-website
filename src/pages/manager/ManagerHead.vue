<script setup lang="ts">
import { PathEntry, pathEntryPartialSummation } from './PathEntry'
import { State } from './State'

const props = defineProps<{ state: State }>()

function prefixEntries(): Array<PathEntry> {
  if (props.state.currentPathEntry === undefined) {
    return []
  }

  const entries = pathEntryPartialSummation(props.state.currentPathEntry)
  return entries.slice(0, entries.length - 1)
}

function lastEntry(): PathEntry | undefined {
  if (props.state.currentPathEntry === undefined) {
    return undefined
  }

  const entries = pathEntryPartialSummation(props.state.currentPathEntry)
  return entries[entries.length - 1]
}
</script>

<template>
  <div v-if="state.currentPathEntry" class="flex overflow-x-auto pb-1">
    <button
      v-for="(entry, index) of prefixEntries()"
      :key="index"
      class="whitespace-pre font-bold hover:underline"
      @click="state.currentPathEntry = entry"
    >
      <span class="whitespace-pre">{{ entry.basename }}</span>
      <span class="whitespace-pre">/</span>
    </button>
    <button v-if="lastEntry()" disabled>
      <span class="whitespace-pre">{{ lastEntry()?.basename }}</span>
      <span
        v-if="state.currentPathEntry?.kind === 'Directory'"
        class="whitespace-pre"
        >/</span
      >
    </button>
  </div>
</template>
