<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex justify-end overflow-x-auto whitespace-pre pb-1 text-sm">
    {{ state.url }}
  </div>
</template>
