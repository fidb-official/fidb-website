<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Lang from '../../components/Lang.vue'
import ManagerTable from './ManagerTable.vue'
import { State } from './State'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentDirectory === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择件夹。 </template>
        <template #en> Please choose directory. </template>
      </Lang>
    </div>

    <div v-else-if="state.dataset.length === 0" class="px-1">
      <Lang>
        <template #zh> 还没有数据。 </template>
        <template #en> No data yet. </template>
      </Lang>
    </div>

    <ManagerTable v-else :state="state" />
  </div>
</template>
