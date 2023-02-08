<script setup lang="ts">
import ManagerTableRow from './ManagerTableRow.vue'

import { State } from './State'

defineProps<{ state: State }>()
</script>

<template>
  <table class="w-full overflow-auto">
    <thead class="overflow-auto">
      <tr class="overflow-auto">
        <th
          v-for="name of state.table.columnNames"
          :key="name"
          class="overflow-auto whitespace-nowrap border border-black text-left"
        >
          <span class="px-1">{{ name.toString() }}</span>
        </th>
      </tr>
    </thead>

    <tbody class="overflow-auto">
      <tr
        v-for="(row, index) of state.table.rows"
        :key="index"
        class="overflow-auto"
      >
        <ManagerTableRow :state="state" :row="row" />
      </tr>
    </tbody>
  </table>
</template>
