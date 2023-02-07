<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { loadState } from './loadState'
import ManagerDirectories from './ManagerDirectories.vue'
import ManagerFiles from './ManagerFiles.vue'
import ManagerFoot from './ManagerFoot.vue'
import ManagerHead from './ManagerHead.vue'

const router = useRouter()
const route = useRoute()

const state = reactive(
  await loadState({
    url: route.params.url as string,
  }),
)
</script>

<template>
  <div class="flex h-full flex-col px-3">
    <ManagerHead :state="state" />

    <div class="flex h-full border-y border-black">
      <ManagerDirectories :state="state" class="w-80 border-r border-black" />
      <ManagerFiles :state="state" class="px-3" />
    </div>

    <ManagerFoot :state="state" />
  </div>
</template>
