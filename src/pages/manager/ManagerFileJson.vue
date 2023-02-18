<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { arrayBufferToJsonOrError } from '../../utils/arrayBufferToJsonOrError'
import { State } from './State'

const props = defineProps<{
  state: State
  buffer: ArrayBuffer
}>()

const text = ref('')

onMounted(() => {
  const buffer = props.buffer
  if (!isParsingError(buffer)) {
    const json = arrayBufferToJsonOrError(buffer)
    text.value = JSON.stringify(json, null, 2) + '\n'
  }
})

function isParsingError(buffer: ArrayBuffer): boolean {
  return arrayBufferToJsonOrError(buffer) instanceof Error
}
</script>

<template>
  <pre
    v-if="isParsingError(buffer)"
    class="m-2 border border-red-600 p-2 text-red-600"
    >{{ arrayBufferToJsonOrError(buffer) }}</pre
  >

  <textarea
    v-else
    class="h-full resize-none overflow-auto border border-black p-2 font-mono focus:outline-none"
    v-model="text"
  ></textarea>
</template>
