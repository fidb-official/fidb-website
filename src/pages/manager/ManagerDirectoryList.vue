<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import { State } from './State'
import { stateCreateDirectory } from './stateCreateDirectory'
// import { stateDeleteDirectory } from './stateDeleteDirectory'

defineProps<{ state: State }>()

async function createDirectory(state: State) {
  const directory = prompt('Directory:')
  if (!directory) {
    return
  }

  await stateCreateDirectory(state, directory)
  state.currentDirectory = directory
}

async function deleteDirectory(state: State) {
  //
}
</script>

<template>
  <div class="flex h-full flex-col border-l border-black">
    <div class="flex w-full justify-between border-b border-black">
      <div class="px-2 font-bold">
        <Lang>
          <template #zh> 文件夹： </template>
          <template #en> Directories: </template>
        </Lang>
      </div>

      <button
        class="px-2 font-bold hover:ring-2 hover:ring-inset hover:ring-black"
        @click="createDirectory(state)"
      >
        +
      </button>
    </div>

    <div v-for="directory of state.directories" :key="directory">
      <div
        v-if="directory === state.currentDirectory"
        class="flex justify-between"
      >
        <button
          class="w-full bg-black px-2 text-left text-white"
          @click="state.currentDirectory = directory"
        >
          {{ directory }}
        </button>

        <button
          class="bg-black px-2 font-bold text-white hover:ring-2 hover:ring-inset hover:ring-white"
          @click="deleteDirectory(state)"
        >
          <span class="px-0.5"> - </span>
        </button>
      </div>

      <div v-else class="flex justify-between hover:bg-stone-200">
        <button
          class="w-full px-2 text-left"
          @click="state.currentDirectory = directory"
        >
          {{ directory }}
        </button>

        <button
          class="px-2 font-bold hover:ring-2 hover:ring-inset hover:ring-black"
          @click="deleteDirectory(state)"
        >
          <span class="px-0.5"> - </span>
        </button>
      </div>
    </div>
  </div>
</template>
