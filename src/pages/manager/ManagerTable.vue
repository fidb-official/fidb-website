<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import ManagerTableCell from './ManagerTableCell.vue'
import { State } from './State'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <table class="w-full overflow-auto">
    <thead class="overflow-auto">
      <tr class="overflow-auto">
        <th
          v-for="name of state.table.columnNames"
          :key="name"
          class="overflow-auto whitespace-nowrap border border-black px-1 text-left"
        >
          {{ name.toString() }}
        </th>
      </tr>
    </thead>

    <tbody class="overflow-auto">
      <tr
        v-for="(row, index) of state.table.rows"
        :key="index"
        class="overflow-auto"
      >
        <td
          v-for="(cell, index) of row.cells"
          :key="index"
          class="overflow-auto whitespace-nowrap border border-black px-1"
        >
          <ManagerTableCell :state="state" :cell="cell" />
        </td>
      </tr>
    </tbody>
  </table>
</template>
