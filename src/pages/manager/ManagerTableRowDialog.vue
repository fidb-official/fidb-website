<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import Lang from '../../components/Lang.vue'
import { Row } from './Row'
import { State } from './State'
import { stateDeleteRow } from './stateDeleteRow'

defineProps<{
  state: State
  row: Row
  isOpen: boolean
  close: () => void
}>()
</script>

<template>
  <Dialog as="div" :open="isOpen" @close="close()" class="relative z-10">
    <div class="fixed inset-0 h-screen w-screen bg-black bg-opacity-10" />

    <div
      class="fixed inset-0 flex h-screen w-screen items-center justify-center"
    >
      <DialogPanel
        class="relative h-4/5 w-5/6 overflow-auto border border-black bg-white md:w-3/5"
      >
        <button
          class="absolute top-4 right-4 hover:ring-2 hover:ring-black"
          @click="close()"
        >
          <XMarkIcon class="h-8 w-8 stroke-1" />
        </button>

        <div class="h-full overflow-auto p-6">
          <div class="flex flex-col space-y-3">
            <div class="flex space-x-0.5">
              <div class="font-bold">#</div>
              <div>{{ row.index }}</div>
            </div>

            <div v-for="cell of row.cells" :key="cell.columnName">
              <div class="font-bold">{{ cell.columnName }}</div>
              <div>{{ cell.value }}</div>
            </div>

            <div class="flex justify-end">
              <button
                class="rounded-sm border border-black p-3 font-bold hover:bg-stone-100"
                @click="
                  () => {
                    stateDeleteRow(state, row.index)
                    close()
                  }
                "
              >
                <Lang>
                  <template #zh> 删除 </template>
                  <template #en> Delete </template>
                </Lang>
              </button>
            </div>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
