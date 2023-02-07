<script setup lang="ts">
import { ManagerState as State } from './ManagerState'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex justify-end overflow-x-auto whitespace-pre pb-1 text-sm">
    {{ state.url }}
  </div>
</template>
