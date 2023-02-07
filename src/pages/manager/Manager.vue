<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import ManagerLayout from './ManagerLayout.vue'
</script>

<template>
  <PageLayout>
    <Suspense>
      <ManagerLayout />

      <template #fallback>
        <Lang class="px-3">
          <template #zh> 加载中。。。 </template>
          <template #en> Loading... </template>
        </Lang>
      </template>
    </Suspense>
  </PageLayout>
</template>
