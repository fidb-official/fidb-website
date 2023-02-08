<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex items-center overflow-auto px-1 text-sm">
    ManagerMessageBar
  </div>
</template>
