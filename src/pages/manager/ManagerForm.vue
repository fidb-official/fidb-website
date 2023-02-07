<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'

const router = useRouter()
const route = useRoute()
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col items-center justify-center">
      ManagerFrom
    </div>
  </PageLayout>
</template>
