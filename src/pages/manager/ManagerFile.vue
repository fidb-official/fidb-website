<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import ManagerFileJson from './ManagerFileJson.vue'
import ManagerFileLoading from './ManagerFileLoading.vue'
import ManagerFileOther from './ManagerFileOther.vue'
import ManagerFileText from './ManagerFileText.vue'
import { State } from './State'
import { stateFetchFile } from './stateFetchFile'

const props = defineProps<{ state: State }>()

const buffer = ref<ArrayBuffer | undefined>(undefined)

const path = computed(() => props.state.currentPathEntry?.path || '')

watch(
  () => props.state.currentPathEntry?.path,
  async (path) => {
    if (path === undefined) {
      return
    }

    buffer.value = await stateFetchFile(props.state, path)
  },
  {
    immediate: true,
  },
)
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerFileLoading v-if="buffer === undefined" :state="state" />
    <ManagerFileJson
      v-else-if="path.endsWith('.json')"
      :state="state"
      :buffer="buffer"
    />
    <ManagerFileText
      v-else-if="path.endsWith('.txt') || path.endsWith('.md')"
      :state="state"
      :buffer="buffer"
    />
    <ManagerFileOther v-else :state="state" :buffer="buffer" />
  </div>
</template>
