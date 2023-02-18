<script setup lang="ts">
import { ref, watch } from 'vue'
import { State } from './State'

const props = defineProps<{
  state: State
  blob: Blob
}>()

const text = ref('')

watch(
  () => props.blob,
  async (blob) => {
    text.value = await blob.text()
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <textarea
    class="h-full resize-none overflow-auto border border-black p-2 font-mono focus:outline-none"
    v-model="text"
  ></textarea>
</template>
