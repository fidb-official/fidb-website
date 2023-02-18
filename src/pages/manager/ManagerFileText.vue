<script setup lang="ts">
import { ref, watch } from 'vue'
import { arrayBufferToText } from '../../utils/arrayBufferToText'
import { State } from './State'

const props = defineProps<{
  state: State
  buffer: ArrayBuffer
}>()

const text = ref('')

watch(
  () => props.buffer,
  (value) => {
    text.value = arrayBufferToText(value)
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
