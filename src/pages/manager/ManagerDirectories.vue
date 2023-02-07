<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ManagerState as State } from './ManagerState'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full flex-col">
    <div v-for="directory of state.directories" :key="directory">
      {{ directory }}
    </div>
  </div>
</template>
