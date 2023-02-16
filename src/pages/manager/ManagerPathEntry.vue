<script setup lang="ts">
import { PathEntry } from './PathEntry'
import { State } from './State'
import { stateDeleteDirectory } from './stateDeleteDirectory'

const props = defineProps<{
  state: State
  pathEntry: PathEntry
}>()

async function deleteDirectory(state: State, directory: string) {
  const message = `[deleteDirectory] directory: ${directory}`
  if (!window.confirm(message)) {
    return
  }

  await stateDeleteDirectory(state, directory)
}

function isSelected(): boolean {
  return props.pathEntry.path === props.state.currentPathEntry?.path
}
</script>

<template>
  <div
    class="flex justify-between"
    :class="[isSelected() ? 'hover:bg-black' : 'hover:bg-stone-200']"
  >
    <button
      class="scrollbar-hide w-full overflow-x-auto whitespace-nowrap px-2 text-left"
      :class="[isSelected() && 'bg-black text-white']"
      @click="state.currentPathEntry = pathEntry"
    >
      {{ pathEntry.path }}
    </button>

    <button
      class="px-2 font-bold hover:ring-2 hover:ring-inset"
      :class="[
        isSelected()
          ? 'bg-black text-white hover:ring-white'
          : 'hover:ring-black',
      ]"
      @click="deleteDirectory(state, pathEntry.path)"
    >
      <span class="px-0.5"> - </span>
    </button>
  </div>
</template>
