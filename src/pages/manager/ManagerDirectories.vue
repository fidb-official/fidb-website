<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { State } from './State'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full flex-col border-l border-black">
    <div v-for="directory of state.directories" :key="directory">
      <button
        v-if="directory === state.currentDirectory"
        class="w-full bg-stone-200 px-2 text-left"
        @click="state.currentDirectory = directory"
      >
        {{ directory }}
      </button>
      <button
        v-else
        class="w-full px-2 text-left hover:bg-stone-100"
        @click="state.currentDirectory = directory"
      >
        {{ directory }}
      </button>
    </div>
  </div>
</template>
