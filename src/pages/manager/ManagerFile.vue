<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ManagerFileDownload from './ManagerFileDownload.vue'
import ManagerFileJson from './ManagerFileJson.vue'
import ManagerFileLoading from './ManagerFileLoading.vue'
import ManagerFileText from './ManagerFileText.vue'
import { State } from './State'
import { stateFetchFile } from './stateFetchFile'

const props = defineProps<{ state: State }>()

const blob = ref<Blob | undefined>(undefined)

const path = computed(() => props.state.currentPathEntry?.path || '')

watch(
  () => props.state.currentPathEntry?.path,
  async (path) => {
    if (path === undefined) {
      return
    }

    blob.value = undefined
    blob.value = await stateFetchFile(props.state, path)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerFileLoading v-if="blob === undefined" :state="state" />
    <ManagerFileJson
      v-else-if="path.endsWith('.json')"
      :state="state"
      :blob="blob"
    />
    <ManagerFileText
      v-else-if="path.endsWith('.txt') || path.endsWith('.md')"
      :state="state"
      :blob="blob"
    />
    <ManagerFileDownload v-else :state="state" :path="path" :blob="blob" />
  </div>
</template>
