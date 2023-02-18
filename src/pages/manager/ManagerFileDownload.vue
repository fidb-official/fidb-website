<script setup lang="ts">
import { State } from './State'

const props = defineProps<{
  state: State
  blob: Blob
}>()
</script>

<template>
  <pre class="p-2">{{ blob }}</pre>
</template>
