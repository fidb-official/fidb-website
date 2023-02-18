<script setup lang="ts">
import { ref } from 'vue'
import Lang from '../../components/Lang.vue'
import { PathEntry } from './PathEntry'
import { State } from './State'
import { stateDeleteDirectory } from './stateDeleteDirectory'
import { stateLoadPathEntryChildren } from './stateLoadPathEntryChildren'

const props = defineProps<{
  state: State
  pathEntry: PathEntry
}>()

const isChildrenLoading = ref(false)

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

async function select() {
  if (props.state.currentPathEntry?.path !== props.pathEntry.path) {
    props.state.currentPathEntry = props.pathEntry
  } else if (isSelected() && props.pathEntry.kind === 'Directory') {
    await toggleOpen()
  }
}

async function toggleOpen() {
  props.pathEntry.isOpen = !props.pathEntry.isOpen

  if (props.state.currentPathEntry !== undefined) {
    props.state.currentPathEntry.isOpen = props.pathEntry.isOpen
  }

  if (props.pathEntry.isOpen) {
    isChildrenLoading.value = true
    await stateLoadPathEntryChildren(props.state, props.pathEntry)
    isChildrenLoading.value = false
  }
}
</script>

<template>
  <div class="flex flex-col">
    <div class="flex justify-between hover:bg-stone-200">
      <button
        class="scrollbar-hide w-full overflow-x-auto whitespace-nowrap px-2 text-left"
        :class="[isSelected() && 'bg-black text-white']"
        @click="select()"
      >
        <span>{{ pathEntry.basename }}</span>
        <span v-if="pathEntry.kind === 'Directory'">/</span>
      </button>

      <button
        class="px-2 font-bold hover:ring-1 hover:ring-inset"
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

    <div v-if="pathEntry.isOpen && isChildrenLoading" class="pl-2">
      <Lang
        class="scrollbar-hide overflow-x-auto whitespace-nowrap border border-yellow-600 px-2 text-yellow-600"
      >
        <template #zh> 加载中…… </template>
        <template #en> Loading... </template>
      </Lang>
    </div>

    <div v-if="pathEntry.isOpen && !isChildrenLoading" class="pl-2">
      <template v-if="pathEntry.children.length === 0">
        <Lang class="border-l border-black pl-2 text-stone-400">
          <template #zh> 空 </template>
          <template #en> empty </template>
        </Lang>
      </template>
      <template v-else>
        <ManagerPathEntry
          class="border-l border-black"
          v-for="child of pathEntry.children"
          :key="child.path"
          :state="state"
          :pathEntry="child"
        />
      </template>
    </div>
  </div>
</template>
