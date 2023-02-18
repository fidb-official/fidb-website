<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { arrayBufferToText } from '../../utils/arrayBufferToText'
import ManagerFileLoading from './ManagerFileLoading.vue'
import { State } from './State'
import { stateFetchFile } from './stateFetchFile'

const props = defineProps<{ state: State }>()

const buffer = ref<ArrayBuffer | undefined>(undefined)

onMounted(async () => {
  if (props.state.currentPathEntry === undefined) {
    return
  }

  buffer.value = await stateFetchFile(
    props.state,
    props.state.currentPathEntry.path,
  )
})
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerFileLoading v-if="buffer === undefined" :state="state" />
    <pre v-else class="p-2">{{ arrayBufferToText(buffer) }}</pre>
  </div>
</template>
