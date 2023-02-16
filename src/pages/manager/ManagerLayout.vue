<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Pane, Splitpanes } from 'splitpanes'
import { useRouter } from 'vue-router'
import ManagerDataset from './ManagerDataset.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerHead from './ManagerHead.vue'
import ManagerMessageBar from './ManagerMessageBar.vue'
import ManagerPathEntryList from './ManagerPathEntryList.vue'
import ManagerStatusBar from './ManagerStatusBar.vue'
import { State } from './State'
import { stateReactive } from './stateReactive'
import { stateReactivelyUpdateRoute } from './stateReactivelyUpdateRoute'

const props = defineProps<{ state: State }>()

const state = stateReactive(props.state)

const router = useRouter()

stateReactivelyUpdateRoute(state, router)

const splitpanesSize = useLocalStorage('ManagerLayout.splitpanesSize', 24)
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full flex-col overflow-auto border-y border-black">
      <Splitpanes
        class="overflow-auto"
        @resized="splitpanesSize = $event[0].size"
      >
        <Pane class="border-r border-black" :size="splitpanesSize">
          <ManagerPathEntryList :state="state" />
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
