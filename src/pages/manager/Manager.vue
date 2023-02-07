<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import ManagerDirectories from './ManagerDirectories.vue'
import ManagerFiles from './ManagerFiles.vue'
import { ManagerState as State } from './ManagerState'

const router = useRouter()
const route = useRoute()

const state = reactive(
  new State({
    url: route.params.url as string,
  }),
)
</script>

<template>
  <PageLayout>
    <div class="flex h-full px-3">
      <ManagerDirectories :state="state" class="w-64 border-r" />
      <ManagerFiles :state="state" class="px-3" />
    </div>
  </PageLayout>
</template>
