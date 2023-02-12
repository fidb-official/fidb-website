<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { loadState, LoadStateOptions } from './loadState'
import ManagerLayout from './ManagerLayout.vue'
import ManagerLoading from './ManagerLoading.vue'
import ManagerLoadingError from './ManagerLoadingError.vue'
import { State } from './State'

const route = useRoute()
const state = ref<State | null>(null)
const error = ref<Error | null>(null)

const options: LoadStateOptions = {
  url: route.params.url as string,
}

onMounted(async () => {
  try {
    state.value = await loadState(options)
  } catch (errorValue) {
    if (errorValue instanceof Error) {
      error.value = errorValue
    }

    throw errorValue
  }
})
</script>

<template>
  <PageLayout>
    <ManagerLayout v-if="state" :state="state" />
    <ManagerLoadingError v-else-if="error" :error="error" />
    <ManagerLoading v-else :options="options" />
  </PageLayout>
</template>
