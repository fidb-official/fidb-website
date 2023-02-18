<script setup lang="ts">
import { basename } from 'path-browserify'
import Lang from '../../components/Lang.vue'
import { downloadBlob } from '../../utils/downloadBlob'
import { State } from './State'

defineProps<{
  state: State
  path: string
  blob: Blob
}>()
</script>

<template>
  <div class="flex h-full items-center justify-center">
    <div
      class="mx-6 flex w-full max-w-sm flex-col items-start space-y-2 overflow-x-auto border border-black p-3"
    >
      <div>
        <div class="font-bold">
          <Lang>
            <template #zh> 文件 </template>
            <template #en> file </template>
          </Lang>
        </div>
        <div>{{ path }}</div>
      </div>

      <div>
        <div class="font-bold">
          <Lang>
            <template #zh> 大小 </template>
            <template #en> size </template>
          </Lang>
        </div>
        <div>{{ blob.size }} bytes</div>
      </div>

      <div class="w-full border-t border-black py-0.5"></div>

      <button
        class="border border-black px-3 py-2 hover:bg-stone-100"
        @click="downloadBlob(blob, basename(path))"
      >
        <Lang>
          <template #zh> 下载 </template>
          <template #en> Download </template>
        </Lang>
      </button>
    </div>
  </div>
</template>
