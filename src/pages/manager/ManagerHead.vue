<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div class="flex justify-start overflow-x-auto whitespace-pre py-1">
    {{ state.root }}
  </div>
</template>
