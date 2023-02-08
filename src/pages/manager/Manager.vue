<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Lang from '../../components/Lang.vue'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { loadState } from './loadState'
import ManagerLayout from './ManagerLayout.vue'
import { State } from './State'

const state = ref<State | null>(null)

onMounted(async () => {
  const route = useRoute()
  state.value = await loadState({
    url: route.params.url as string,
  })
})
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
