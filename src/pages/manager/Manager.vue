<script setup lang="ts">
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import ManagerLoaded from './ManagerLoaded.vue'
</script>

<template>
  <PageLayout>
    <Suspense>
      <ManagerLoaded />

      <template #fallback>
        <div class="px-3">Loading...</div>
      </template>
    </Suspense>
  </PageLayout>
</template>
