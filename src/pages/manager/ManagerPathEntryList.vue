<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import ManagerPathEntry from './ManagerPathEntry.vue'
import { State } from './State'
import { stateCreateDirectory } from './stateCreateDirectory'
import { stateCreateFile } from './stateCreateFile'

defineProps<{ state: State }>()

async function createDirectory(state: State) {
  const path = window.prompt('New path (end a directory with "/"):')
  if (!path) {
    return
  }

  if (path.endsWith('/')) {
    await stateCreateDirectory(state, path)
  } else {
    await stateCreateFile(state, path)
  }
}
</script>

<template>
  <div class="flex h-full flex-col overflow-y-auto border-l border-black">
    <div class="flex w-full justify-between border-b border-black">
      <div
        class="scrollbar-hide overflow-x-auto whitespace-nowrap px-2 font-bold"
      >
        <Lang>
          <template #zh> 根目录 </template>
          <template #en> Root </template>
        </Lang>
      </div>

      <button
        class="px-2 font-bold hover:ring-1 hover:ring-inset hover:ring-black"
        @click="createDirectory(state)"
      >
        +
      </button>
    </div>

    <div v-for="pathEntry of state.pathEntries" :key="pathEntry.path">
      <ManagerPathEntry :state="state" :pathEntry="pathEntry" />
    </div>
  </div>
</template>
