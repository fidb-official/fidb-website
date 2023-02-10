<script setup lang="ts">
import { ref } from 'vue'
import { State } from './State'

defineProps<{
  state: State
}>()

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
      <div class="-m-0.5 border-r border-black px-1 text-right font-bold">
        +
      </div>
    </td>

    <td
      v-for="name of state.table.columnNames"
      :key="name"
      class="border border-black"
    ></td>
  </tr>
</template>
