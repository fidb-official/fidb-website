<script setup lang="ts">
import { ref, watch } from 'vue'
import { State } from './State'

const props = defineProps<{
  state: State
  blob: Blob
}>()

const text = ref('')
const error = ref<unknown | undefined>(undefined)

watch(
  () => props.blob,
  async (blob) => {
    try {
      text.value = ''
      error.value = undefined
      const json = JSON.parse(await blob.text())
      text.value = JSON.stringify(json, null, 2) + '\n'
    } catch (errorValue) {
      error.value = errorValue
    }
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div
    v-if="error"
    class="m-2 whitespace-pre-wrap border border-red-600 p-2 text-red-600"
  >
    {{ error }}
  </div>

  <textarea
    v-else
    class="h-full resize-none overflow-auto border border-black p-2 font-mono focus:outline-none"
    v-model="text"
  ></textarea>
</template>
