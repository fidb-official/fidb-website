<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ManagerState as State } from './ManagerState'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col">ManagerDirectories</div>
  </PageLayout>
</template>
