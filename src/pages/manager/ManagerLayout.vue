<script setup lang="ts">
import { Pane, Splitpanes } from 'splitpanes'
import { useRouter } from 'vue-router'
import ManagerDataset from './ManagerDataset.vue'
import ManagerDirectoryList from './ManagerDirectoryList.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerMessageBar from './ManagerMessageBar.vue'
import ManagerStatusBar from './ManagerStatusBar.vue'
import { State } from './State'
import { stateReactive } from './stateReactive'
import { stateReactivelyUpdateRoute } from './stateReactivelyUpdateRoute'

const props = defineProps<{ state: State }>()

const state = stateReactive(props.state)

const router = useRouter()

stateReactivelyUpdateRoute(state, router)
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <div class="flex h-full flex-col overflow-auto border-y border-black">
      <Splitpanes class="overflow-auto">
        <Pane class="border-r border-black" size="24">
          <ManagerDirectoryList :state="state" />
        </Pane>
        <Pane>
          <ManagerDataset :state="state" />
        </Pane>
      </Splitpanes>
      <ManagerStatusBar :state="state" />
      <ManagerMessageBar :state="state" />
    </div>
    <ManagerFoot :state="state" />
  </div>
</template>
