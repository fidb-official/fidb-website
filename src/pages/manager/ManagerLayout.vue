<script setup lang="ts">
import { watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ManagerDataset from './ManagerDataset.vue'
import ManagerDirectoryList from './ManagerDirectoryList.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerHead from './ManagerHead.vue'
import ManagerMessageBar from './ManagerMessageBar.vue'
import ManagerStatusBar from './ManagerStatusBar.vue'
import { State } from './State'
import { stateReactive } from './stateReactive'

const props = defineProps<{ state: State }>()

const state = stateReactive(props.state)

const route = useRoute()
const router = useRouter()

watch(
  () => state.page,
  (page) => {
    if (page !== undefined) {
      router.replace({
        path: route.path,
        query: { ...route.query, page },
      })
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full flex-col overflow-auto border-y border-black">
      <div class="flex h-full overflow-auto">
        <ManagerDirectoryList
          class="w-24 border-r border-black sm:w-32 md:w-80"
          :state="state"
        />
        <ManagerDataset class="overflow-auto" :state="state" />
      </div>

      <ManagerStatusBar :state="state" />
      <ManagerMessageBar :state="state" />
    </div>

    <ManagerFoot :state="state" />
  </div>
</template>
