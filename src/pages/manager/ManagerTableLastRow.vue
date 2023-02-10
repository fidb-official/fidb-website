<script setup lang="ts">
import { ref } from 'vue'
import ManagerTableLastRowDialog from './ManagerTableLastRowDialog.vue'
import { State } from './State'

defineProps<{ state: State }>()

const isOpen = ref(false)

function close() {
  isOpen.value = false
}
</script>

<template>
  <tr
    class="bg-white hover:bg-stone-200"
    @click="isOpen = true"
    @mouseover="
      () => {
        state.currentRowIndex = undefined
        state.currentCell = undefined
      }
    "
  >
    <td class="sticky left-0 border border-black ring-1 ring-black">
      <!-- negative margin for chrome (must use div) -->
      <div class="-m-0.5 border-r border-black px-1 text-center font-bold">
        +
      </div>
    </td>

    <td
      v-for="columnName of state.table.columnNames"
      :key="columnName"
      class="border border-black"
    ></td>

    <ManagerTableLastRowDialog :state="state" :isOpen="isOpen" :close="close" />
  </tr>
</template>
