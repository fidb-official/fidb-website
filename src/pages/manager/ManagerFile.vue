<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentPathEntry === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择路径。 </template>
        <template #en> Please choose a path. </template>
      </Lang>
    </div>

    <div v-else>
      <div>TODO</div>
    </div>
  </div>
</template>
