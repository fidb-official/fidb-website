<script setup lang="ts">
import { arrayBufferToText } from '../../utils/arrayBufferToText'
import { State } from './State'

const props = defineProps<{ state: State; buffer: ArrayBuffer }>()
</script>

<template>
  <pre class="p-2">{{ arrayBufferToText(buffer) }}</pre>
</template>
