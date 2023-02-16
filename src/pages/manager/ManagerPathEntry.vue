<script setup lang="ts">
import { PathEntry } from './PathEntry'
import { State } from './State'
import { stateDeleteDirectory } from './stateDeleteDirectory'
import { stateLoadPathEntryChildren } from './stateLoadPathEntryChildren'

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

async function onclick() {
  if (props.state.currentPathEntry?.path !== props.pathEntry.path) {
    props.state.currentPathEntry = props.pathEntry
  } else if (isSelected()) {
    props.pathEntry.isOpen = !props.pathEntry.isOpen
    if (props.pathEntry.isOpen) {
      await stateLoadPathEntryChildren(props.state, props.pathEntry)
    }
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div
      class="flex justify-between"
      :class="[isSelected() ? 'hover:bg-black' : 'hover:bg-stone-200']"
    >
      <button
        class="scrollbar-hide w-full overflow-x-auto whitespace-nowrap px-2 text-left"
        :class="[isSelected() && 'bg-black text-white']"
        @click="onclick"
      >
        {{ pathEntry.basename }}
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

    <div v-if="pathEntry.isOpen" class="pl-2">
      <ManagerPathEntry
        v-for="child of pathEntry.children"
        :key="child.path"
        :state="state"
        :pathEntry="child"
      />
    </div>
  </div>
</template>
