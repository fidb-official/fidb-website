<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import ManagerFileLoading from './ManagerFileLoading.vue'
import { State } from './State'

const props = defineProps<{ state: State }>()

const buffer = ref<ArrayBuffer | undefined>(undefined)

function bufferToText(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(new Uint8Array(buffer))
}

onMounted(async () => {
  if (props.state.currentPathEntry === undefined) {
    return
  }

  const path = props.state.currentPathEntry.path

  const response = await fetch(`${props.state.url}/${path}`, {
    method: 'GET',
    headers: {
      'content-type': 'text/plain',
      authorization: useGlobalToken().authorization,
    },
  })

  buffer.value = await response.arrayBuffer()
})
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerFileLoading v-if="buffer === undefined" :state="state" />
    <pre v-else class="p-2">{{ bufferToText(buffer) }}</pre>
  </div>
</template>
