<script setup lang="ts">
import ManagerTable from './ManagerTable.vue'
import ManagerTableEmpty from './ManagerTableEmpty.vue'
import ManagerTableLoading from './ManagerTableLoading.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <ManagerTableLoading v-if="state.datasetIsLoading" :state="state" />
    <ManagerTableEmpty v-else-if="state.dataset.length === 0" :state="state" />
    <ManagerTable v-else :state="state" />
  </div>
</template>
