<script setup lang="ts">
import { ref } from 'vue'
import { Cell } from './Cell'
import { State } from './State'

const props = defineProps<{
  state: State
  cell: Cell
}>()

const text = ref(JSON.stringify(props.cell.value || null, null, 2))
</script>

<template>
  <div>
    <div class="py-1 font-bold">{{ cell.columnName }}</div>

    <textarea
      class="w-full overflow-auto border border-black p-2 font-mono focus:outline-none"
      v-focus
      :rows="text.split('\n').length"
      v-model="text"
    ></textarea>
  </div>
</template>
