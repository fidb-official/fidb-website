<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ManagerState as State } from './ManagerState'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full w-full flex-col border-r border-black">
    [TODO] ManagerFiles
  </div>
</template>
