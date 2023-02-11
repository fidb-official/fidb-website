<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { reactive } from 'vue'
import Lang from '../../components/Lang.vue'
import ManagerTableRowDialogCell from './ManagerTableRowDialogCell.vue'
import ManagerTableRowDialogCellNew from './ManagerTableRowDialogCellNew.vue'
import { createRow } from './Row'
import { State } from './State'

const props = defineProps<{
  state: State
  isOpen: boolean
  close: () => void
}>()

const row = reactive(
  createRow(props.state.dataset.length, props.state.table.columnNames, {}),
)
</script>

<template>
  <Dialog as="div" :open="isOpen" @close="close()" class="relative z-10">
    <div class="fixed inset-0 h-screen w-screen bg-black bg-opacity-10" />

    <div
      class="fixed inset-0 flex h-screen w-screen items-center justify-center"
    >
      <DialogPanel
        class="h-4/5 w-5/6 overflow-auto border border-black bg-white md:w-3/5"
      >
        <div class="flex h-full flex-col space-y-3 overflow-auto p-6">
          <div class="flex justify-between">
            <Lang class="font-bold">
              <template #zh> 新行 </template>
              <template #en> New row </template>
            </Lang>

            <button
              class="border border-black hover:bg-stone-100"
              @click="close()"
            >
              <XMarkIcon class="h-6 w-6 stroke-1 p-0.5" />
            </button>
          </div>

          <div class="border-t border-black"></div>

          <button v-focus class="h-0 focus:outline-none"></button>

          <ManagerTableRowDialogCell
            v-for="cell of row.cells"
            :key="cell.columnName"
            :state="state"
            :cell="cell"
          />

          <ManagerTableRowDialogCellNew :state="state" :row="row" />
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
