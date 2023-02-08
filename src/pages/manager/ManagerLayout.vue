<script setup lang="ts">
import ManagerDataset from './ManagerDataset.vue'
import ManagerDirectories from './ManagerDirectories.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerHead from './ManagerHead.vue'
import { State } from './State'
import { stateReact } from './stateReact'

const props = defineProps<{ state: State }>()

const state = stateReact(props.state)
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full overflow-auto border-y border-black">
      <ManagerDirectories :state="state" class="w-80 border-r border-black" />
      <ManagerDataset :state="state" class="overflow-auto" />
    </div>

    <ManagerFoot :state="state" />
  </div>
</template>
