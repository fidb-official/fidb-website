<script setup lang="ts">
import qs from 'qs'
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

  const query = qs.parse(new URL(window.location.href).search, {
    ignoreQueryPrefix: true,
  })

  const page = Number(query.page)

  console.log({
    url,
    root,
    directories,
    page: Number.isNaN(page) ? undefined : page,
    currentRowIndex: query.currentRowIndex ? Number(query.currentRowIndex) : 1,
    currentRowIsOpen: query.currentRowIsOpen
      ? Boolean(query.currentRowIsOpen)
      : undefined,
  })

  return createState({
    url,
    root,
    directories,
    page: Number.isNaN(page) ? undefined : page,
    currentRowIndex: query.currentRowIndex ? Number(query.currentRowIndex) : 1,
    currentRowIsOpen: query.currentRowIsOpen
      ? Boolean(query.currentRowIsOpen)
      : undefined,
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
