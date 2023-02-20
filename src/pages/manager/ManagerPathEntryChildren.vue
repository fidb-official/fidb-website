<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import ManagerPathEntry from './ManagerPathEntry.vue'
import { PathEntry } from './PathEntry'
import { State } from './State'

defineProps<{
  state: State
  pathEntry: PathEntry
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="pathEntry.isOpen" class="pl-2">
    <template v-if="isLoading">
      <Lang
        class="scrollbar-hide overflow-x-auto whitespace-nowrap border border-yellow-600 px-2 text-yellow-600"
      >
        <template #zh> 加载中…… </template>
        <template #en> Loading... </template>
      </Lang>
    </template>

    <template v-else-if="pathEntry.children.length === 0">
      <Lang class="border-l border-black pl-2 text-stone-400">
        <template #zh> 空 </template>
        <template #en> empty </template>
      </Lang>
    </template>

    <template v-else>
      <ManagerPathEntry
        class="border-l border-black"
        v-for="child of pathEntry.children"
        :key="child.path"
        :state="state"
        :pathEntry="child"
      />
      <!-- <div class="flex justify-between bg-black text-white text-sm">
             <div></div>
             <div>1</div>
             <div></div>
             </div> -->
    </template>
  </div>
</template>
