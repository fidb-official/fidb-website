<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import ManagerTable from './ManagerTable.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentDirectory === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择件夹。 </template>
        <template #en> Please choose directory. </template>
      </Lang>
    </div>

    <div v-else-if="state.dataset.length === 0"></div>

    <ManagerTable v-else :state="state" />
  </div>
</template>
