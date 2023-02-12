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
  const response = await fetch(`${options.url}`)
  const { root, directories } = await response.json()

  const query = qs.parse(new URL(window.location.href).search, {
    ignoreQueryPrefix: true,
  })

  return createState({
    url: options.url,
    root,
    directories,
    currentDirectory:
      query.currentDirectory === undefined
        ? undefined
        : String(query.currentDirectory),
    page: Number.isNaN(Number.parseInt(String(query.page)))
      ? 1
      : Number.parseInt(String(query.page)),
    currentRowIndex: Number.isNaN(
      Number.parseInt(String(query.currentRowIndex)),
    )
      ? 1
      : Number.parseInt(String(query.currentRowIndex)),
    currentRowIsOpen: query.currentRowIsOpen === undefined ? undefined : true,
    currentCellIndex: Number.isNaN(
      Number.parseInt(String(query.currentCellIndex)),
    )
      ? undefined
      : Number.parseInt(String(query.currentCellIndex)),
    currentCellColumnName: query.currentCellIndex
      ? String(query.currentCellIndex)
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
