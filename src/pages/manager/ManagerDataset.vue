<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Lang from '../../components/Lang.vue'
import ManagerTableCell from './ManagerTableCell.vue'
import { State } from './State'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full w-full flex-col overflow-auto border-r border-black">
    <div v-if="state.currentDirectory === undefined" class="px-1">
      <Lang>
        <template #zh> 请选择件夹。 </template>
        <template #en> Please choose directory. </template>
      </Lang>
    </div>

    <div v-else-if="state.dataset.length === 0" class="px-1">
      <Lang>
        <template #zh> 还没有数据。 </template>
        <template #en> No data yet. </template>
      </Lang>
    </div>

    <table v-else class="w-full overflow-auto">
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
  </div>
</template>
