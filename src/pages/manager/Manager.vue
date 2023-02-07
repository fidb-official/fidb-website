<script setup lang="ts">
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import ManagerLayout from './ManagerLayout.vue'
</script>

<template>
  <PageLayout>
    <Suspense>
      <ManagerLayout />

      <template #fallback>
        <div class="px-3">Loading...</div>
      </template>
    </Suspense>
  </PageLayout>
</template>
