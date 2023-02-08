<script setup lang="ts">
import ManagerDirectories from './ManagerDirectories.vue'
import ManagerFiles from './ManagerFiles.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerHead from './ManagerHead.vue'
import { State } from './State'
import { stateReactive } from './stateReactive'

const props = defineProps<{ state: State }>()

const state = stateReactive(props.state)
</script>

<template>
  <div class="flex h-full flex-col overflow-auto px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full overflow-auto border-y border-black">
      <ManagerDirectories :state="state" class="w-80 border-r border-black" />
      <ManagerFiles :state="state" class="overflow-auto" />
    </div>

    <ManagerFoot :state="state" />
  </div>
</template>
