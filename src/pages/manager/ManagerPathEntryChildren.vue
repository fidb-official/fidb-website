<script setup lang="ts">
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/Lang.vue'
import ManagerPathEntry from './ManagerPathEntry.vue'
import { PathEntryDirectory } from './PathEntry'
import { State } from './State'
import { stateLoadPathEntryChildren } from './stateLoadPathEntryChildren'

defineProps<{
  state: State
  pathEntry: PathEntryDirectory
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="pathEntry.kind === 'Directory' && pathEntry.isOpen" class="pl-2">
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
      <div class="flex justify-between bg-black text-sm text-white">
        <div></div>
        <div class="flex">
          <button
            @click="
              pathEntry.page-- && stateLoadPathEntryChildren(state, pathEntry)
            "
            :disabled="pathEntry.page === 1"
            class="px-0.5"
            :class="[pathEntry.page !== 1 && 'hover:ring-1 hover:ring-white']"
          >
            <ChevronLeftIcon class="h-4 w-4" />
          </button>
          <div class="px-2">{{ pathEntry.page }}</div>
          <button
            @click="
              pathEntry.page++ && stateLoadPathEntryChildren(state, pathEntry)
            "
            :disabled="pathEntry.children.length < pathEntry.size"
            class="px-0.5"
            :class="[
              pathEntry.children.length >= pathEntry.size &&
                'hover:ring-1 hover:ring-white',
            ]"
          >
            <ChevronRightIcon class="h-4 w-4" />
          </button>
        </div>
        <div></div>
      </div>
    </template>
  </div>
</template>
