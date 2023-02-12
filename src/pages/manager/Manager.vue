<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Lang from '../../components/Lang.vue'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import ManagerLayout from './ManagerLayout.vue'
import { createState, State } from './State'

const route = useRoute()
const state = ref<State | null>(null)

onMounted(async () => {
  state.value = await loadState({
    url: route.params.url as string,
  })
})

async function loadState(options: { url: string }): Promise<State> {
  const { url } = options

  const response = await fetch(`${url}`)
  const { root, directories } = await response.json()

  const page = Number.parseInt(route.query.page as string)

  return createState({
    url,
    root,
    directories,
    page: Number.isNaN(page) ? undefined : page,
  })
}
</script>

<template>
  <PageLayout>
    <ManagerLayout v-if="state" :state="state" />

    <Lang v-else class="px-3">
      <template #zh> 加载中。。。 </template>
      <template #en> Loading... </template>
    </Lang>
  </PageLayout>
</template>
