<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <div
    class="flex items-center overflow-auto border-x border-stone-900 px-1 text-sm"
  >
    {{ state.message }}
    &nbsp;
  </div>
</template>
