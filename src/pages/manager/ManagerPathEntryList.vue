<script setup lang="ts">
import { PlusIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/Lang.vue'
import ManagerPathEntry from './ManagerPathEntry.vue'
import { State } from './State'
import { stateCreateDirectory } from './stateCreateDirectory'
import { stateCreateFile } from './stateCreateFile'

defineProps<{ state: State }>()

async function createPath(state: State) {
  const message = [
    `Starting from root,`,
    'create new path (end a directory with "/"):',
  ].join('\n')

  const path = window.prompt(message)
  if (!path) {
    return
  }

  if (path.endsWith('/')) {
    await stateCreateDirectory(state, path, state.pathEntries)
  } else {
    await stateCreateFile(state, path, state.pathEntries)
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
        class="px-1 hover:ring-1 hover:ring-inset hover:ring-black"
        @click="createPath(state)"
      >
        <PlusIcon class="h-4 w-4" />
      </button>
    </div>

    <div v-for="pathEntry of state.pathEntries" :key="pathEntry.path">
      <ManagerPathEntry :state="state" :pathEntry="pathEntry" />
    </div>
  </div>
</template>
