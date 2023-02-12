<script setup lang="ts">
import { Dialog, DialogPanel } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { ref } from 'vue'
import Lang from '../../components/Lang.vue'
import { State } from './State'
import { stateCreateRowFromTexts } from './stateCreateRowFromTexts'
import { stateStatusError } from './stateStatus'

const props = defineProps<{
  state: State
  isOpen: boolean
  close: () => void
}>()

const generatedNames = ['@id', '@revision', '@createdAt', '@updatedAt']

const keys = props.state.table.columnNames.filter(
  (name) => !generatedNames.includes(name),
)

const texts = ref(Object.fromEntries(keys.map((name) => [name, ''])))

const id = ref('')

async function create(state: State) {
  if (!state.currentDirectory) {
    stateStatusError(state, {
      message: 'no current directory',
    })
    return
  }

  if (id.value.includes('/')) {
    stateStatusError(state, {
      message: 'id should not includes /',
      data: {
        id: id.value,
      },
    })
    return
  }

  const ok = await stateCreateRowFromTexts(state, {
    '@id': `"${state.currentDirectory}/${id.value}"`,
    ...texts.value,
  })

  if (ok) {
    props.close()
    id.value = ''
    texts.value = Object.fromEntries(keys.map((name) => [name, '']))
  }
}
</script>

<template>
  <Dialog as="div" :open="isOpen" @close="close()" class="relative z-10">
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

          <div>
            <div class="flex items-center justify-between pb-1">
              <div class="font-bold">@id</div>
            </div>

            <div class="flex items-baseline space-x-1">
              <span class="text-lg font-bold">"</span>
              <div class="font-bold">{{ state.currentDirectory }}/</div>
              <textarea
                class="w-full resize-none overflow-auto border border-black p-2 font-mono focus:outline-none disabled:bg-stone-100"
                rows="1"
                v-model="id"
              ></textarea>
              <span class="text-xl font-bold">"</span>
            </div>
          </div>

          <div v-for="(text, key) of texts" :key="key">
            <div class="flex items-center justify-between pb-1">
              <div class="font-bold">{{ key }}</div>
            </div>

            <textarea
              class="w-full overflow-auto border border-black p-2 font-mono focus:outline-none disabled:bg-stone-100"
              :rows="text.split('\n').length"
              :value="text"
              @input="
                (event: any) => {
                  texts[key] = event.target.value
                }
              "
            ></textarea>
          </div>

          <div class="border-t border-black"></div>

          <div class="flex justify-start">
            <button
              class="rounded-sm border border-black p-3 hover:bg-stone-100"
              @click="create(state)"
            >
              <Lang>
                <template #zh> 创建 </template>
                <template #en> Create </template>
              </Lang>
            </button>
          </div>
        </div>
      </DialogPanel>
    </div>
  </Dialog>
</template>
