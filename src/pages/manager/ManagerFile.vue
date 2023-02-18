<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useGlobalToken } from '../../reactives/useGlobalToken'
import { State } from './State'

const props = defineProps<{ state: State }>()

const text = ref<string | undefined>(undefined)

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

  text.value = await response.text()
})
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <pre v-if="text" class="p-2">{{ text }}</pre>
  </div>
</template>
