<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State; data: any }>()
</script>

<template>
  <div>{{ data.toString() }}</div>
</template>
