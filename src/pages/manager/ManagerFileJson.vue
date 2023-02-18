<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { arrayBufferToText } from '../../utils/arrayBufferToText'
import { Json } from '../../utils/Json'
import { State } from './State'

const props = defineProps<{
  state: State
  buffer: ArrayBuffer
}>()

const text = ref('')

onMounted(() => {
  const buffer = props.buffer
  if (!isParsingError(buffer)) {
    text.value =
      JSON.stringify(arrayBufferToJsonOrError(buffer), null, 2) + '\n'
  }
})

function arrayBufferToJsonOrError(buffer: ArrayBuffer): Json | Error {
  try {
    return JSON.parse(arrayBufferToText(buffer))
  } catch (error) {
    if (error instanceof Error) {
      return error
    }

    throw error
  }
}

function isParsingError(buffer: ArrayBuffer): boolean {
  return arrayBufferToJsonOrError(buffer) instanceof Error
}
</script>

<template>
  <pre
    v-if="isParsingError(buffer)"
    class="m-2 border border-red-600 p-2 text-red-600"
    >{{ arrayBufferToJsonOrError(buffer).message }}</pre
  >

  <textarea
    v-else
    class="h-full resize-none overflow-auto border border-black p-2 font-mono focus:outline-none"
    v-model="text"
  ></textarea>
</template>
