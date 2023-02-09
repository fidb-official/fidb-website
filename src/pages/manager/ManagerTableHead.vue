<script setup lang="ts">
import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <tr class="overflow-auto">
    <th
      class="sticky left-0 overflow-auto whitespace-nowrap border border-black bg-white text-right"
    >
      <span class="px-1"> # </span>
    </th>

    <th
      v-for="name of state.table.columnNames"
      :key="name"
      class="overflow-auto whitespace-nowrap border border-black text-left"
    >
      <span class="px-1">{{ name.toString() }}</span>
    </th>
  </tr>
</template>
