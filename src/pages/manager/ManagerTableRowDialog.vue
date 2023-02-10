<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { State } from './State'

defineProps<{
  state: State
  isOpen: boolean
  close: () => void
}>()
</script>

<template>
  <Dialog as="div" :open="isOpen" @close="close()" class="relative z-10">
    <div class="fixed inset-0 bg-black bg-opacity-10" />

    <div class="fixed inset-0">
      <div class="flex min-h-full items-center justify-center">
        <DialogPanel
          class="max-w-md border border-black bg-white p-6 text-left"
        >
          <div class="text-lg font-bold">Payment successful</div>

          <div class="pt-2">
            <p>
              Your payment has been successfully submitted. We’ve sent you an
              email with all of the details of your order.
            </p>
          </div>

          <div class="pt-4">
            <button
              class="justify-center border border-black p-3"
              @click="close()"
            >
              Got it, thanks!
            </button>
          </div>
        </DialogPanel>
      </div>
    </div>
  </Dialog>
</template>
