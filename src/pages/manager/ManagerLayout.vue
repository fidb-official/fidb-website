<script setup lang="ts">
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
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full flex-col overflow-auto border-y border-black">
      <div class="flex h-full overflow-auto">
        <ManagerDirectoryList
          class="w-80 border-r border-black"
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
