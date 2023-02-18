<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import ManagerPathEntry from './ManagerPathEntry.vue'
import { State } from './State'
import { stateCreateDirectory } from './stateCreateDirectory'

defineProps<{ state: State }>()

async function createDirectory(state: State) {
  const directory = window.prompt('Directory:')
  if (!directory) {
    return
  }

  await stateCreateDirectory(state, directory)
}
</script>

<template>
  <div class="flex h-full flex-col overflow-y-auto border-l border-black">
    <div class="flex w-full justify-between border-b border-black">
      <div
        class="scrollbar-hide overflow-x-auto whitespace-nowrap px-2 font-bold"
      >
        <Lang>
          <template #zh> 文件夹： </template>
          <template #en> Directories: </template>
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
