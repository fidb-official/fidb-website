<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import ManagerTable from './ManagerTable.vue'
import ManagerTableEmpty from './ManagerTableEmpty.vue'
import ManagerTableLoading from './ManagerTableLoading.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentPathEntry === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择路径。 </template>
        <template #en> Please choose a path. </template>
      </Lang>
    </div>

    <ManagerTableLoading v-else-if="state.datasetIsLoading" :state="state" />
    <ManagerTableEmpty v-else-if="state.dataset.length === 0" :state="state" />
    <ManagerTable v-else :state="state" />
  </div>
</template>
