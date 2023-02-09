<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex h-full flex-col border-l border-black">
    <div class="flex w-full justify-between border-b border-black font-bold">
      <div class="px-2">
        <Lang>
          <template #zh> 文件夹： </template>
          <template #en> Directories: </template>
        </Lang>
      </div>

      <button class="px-2 hover:ring-2 hover:ring-inset hover:ring-black">
        +
      </button>
    </div>

    <div v-for="directory of state.directories" :key="directory">
      <button
        v-if="directory === state.currentDirectory"
        class="w-full bg-black px-2 text-left text-white"
        @click="state.currentDirectory = directory"
      >
        {{ directory }}
      </button>
      <button
        v-else
        class="w-full px-2 text-left hover:bg-stone-200"
        @click="state.currentDirectory = directory"
      >
        {{ directory }}
      </button>
    </div>
  </div>
</template>
