<script setup lang="ts">
import { useLocalStorage } from '@vueuse/core'
import { Pane, Splitpanes } from 'splitpanes'
import { useRouter } from 'vue-router'
import Lang from '../../components/Lang.vue'
import ManagerDataset from './ManagerDataset.vue'
import ManagerFile from './ManagerFile.vue'
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
          <div v-if="state.currentPathEntry === undefined" class="px-1">
            <Lang>
              <template #zh> 请选择路径。 </template>
              <template #en> Please choose a path. </template>
            </Lang>
          </div>
          <ManagerDataset
            v-else-if="state.currentPathEntry.kind === 'Directory'"
            :state="state"
          />
          <ManagerFile
            v-else-if="state.currentPathEntry.kind === 'File'"
            :state="state"
          />
          <div v-else>
            <Lang>
              <template #zh>
                未知的路径类型：{{ state.currentPathEntry.kind }}。
              </template>
              <template #en>
                Unknown path kind: {{ state.currentPathEntry.kind }}.
              </template>
            </Lang>
          </div>
        </Pane>
      </Splitpanes>
      <ManagerStatusBar :state="state" />
      <ManagerMessageBar :state="state" />
    </div>
    <ManagerFoot :state="state" />
  </div>
</template>
