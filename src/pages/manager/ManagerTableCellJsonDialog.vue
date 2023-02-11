<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import { Cell } from './Cell'
import { State } from './State'

const props = defineProps<{
  state: State
  isOpen: boolean
  close: () => void
  cell: Cell
}>()

const text = ref(JSON.stringify(props.cell.value || null, null, 2))
</script>

<template>
  <Dialog as="div" :open="isOpen" @close="close()" class="relative z-10">
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
            <div class="flex space-x-1">
              <span class="font-bold"> # </span>
              <span>{{ cell.index }}</span>
              <span class="font-bold"> {{ cell.columnName }}</span>
            </div>

            <div class="border-t border-black"></div>

            <textarea
              class="h-full"
              :rows="text.split('\n').length"
              v-model="text"
            ></textarea>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
