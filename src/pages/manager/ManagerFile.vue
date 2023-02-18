<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import ManagerFileLoading from './ManagerFileLoading.vue'
import { State } from './State'
import { stateStatusError } from './stateStatus'

const props = defineProps<{ state: State }>()

const buffer = ref<ArrayBuffer | undefined>(undefined)

function bufferToText(buffer: ArrayBuffer): string {
  return new TextDecoder().decode(new Uint8Array(buffer))
}

onMounted(async () => {
  if (props.state.currentPathEntry === undefined) {
    return
  }

  buffer.value = await stateFetchFile(
    props.state,
    props.state.currentPathEntry.path,
  )
})

async function stateFetchFile(
  state: State,
  path: string,
): Promise<ArrayBuffer | undefined> {
  const response = await fetch(`${state.url}/${path}`, {
    method: 'GET',
    headers: {
      'content-type': 'text/plain',
      authorization: useGlobalToken().authorization,
    },
  })

  if (response.ok) {
    return await response.arrayBuffer()
  } else {
    stateStatusError(state, {
      who: 'stateFetchFile',
      message: response.statusText,
      data: { path },
    })
  }
}
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerFileLoading v-if="buffer === undefined" :state="state" />
    <pre v-else class="p-2">{{ bufferToText(buffer) }}</pre>
  </div>
</template>
