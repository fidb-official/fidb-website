<script setup lang="ts">
import { createPathEntry, PathEntry } from './PathEntry'
import { State } from './State'

const props = defineProps<{ state: State }>()

function pathEntries(): Array<PathEntry> {
  const currentPathEntry = props.state.currentPathEntry

  if (currentPathEntry === undefined) {
    return []
  }

  const basenames = currentPathEntry.path.split('/')

  const prefix: Array<string> = []

  return basenames.map((basename, index) => {
    const path = [...prefix, basename].join('/')

    prefix.push(basename)

    const kind =
      index === basenames.length - 1 ? currentPathEntry.kind : 'Directory'

    return createPathEntry({
      kind,
      path,
    })
  })
}

function prefixEntries(): Array<PathEntry> {
  const entries = pathEntries()
  return entries.slice(0, entries.length - 1)
}

function lastEntry(): PathEntry | undefined {
  const entries = pathEntries()
  return entries[entries.length - 1]
}
</script>

<template>
  <div v-if="state.currentPathEntry" class="flex overflow-x-auto pb-1">
    <button
      v-for="(entry, index) of prefixEntries()"
      :key="index"
      class="whitespace-pre hover:underline"
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
