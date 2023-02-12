<script setup lang="ts">
import { ref } from 'vue'
import Lang from '../../components/Lang.vue'
import ManagerEmptyTable from './ManagerEmptyTable.vue'
import ManagerTable from './ManagerTable.vue'
import { State } from './State'

defineProps<{ state: State }>()

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentDirectory === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择件夹。 </template>
        <template #en> Please choose directory. </template>
      </Lang>
    </div>

    <ManagerEmptyTable v-else-if="state.dataset.length === 0" :state="state" />

    <ManagerTable v-else :state="state" />
  </div>
</template>
