<script setup lang="ts">
import { ManagerState as State } from './ManagerState'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex overflow-x-auto whitespace-pre border-b">
    {{ state.root }}
  </div>
</template>
