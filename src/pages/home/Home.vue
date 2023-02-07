<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { HomeState as State } from './HomeState'

const router = useRouter()
const route = useRoute()

const state = reactive(new State())
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col items-center justify-center">
      <div class="flex flex-col space-y-2 px-3">
        <div class="text-6xl font-bold">FiDB</div>
        <div>What if we use file system as database?</div>
        <div>
          <a
            class="underline decoration-2"
            href="https://github.com/xieyuheng/fidb"
            target="_blank"
          >
            Let's find out.
          </a>
        </div>
        <div class="py-16"></div>
      </div>
    </div>
  </PageLayout>
</template>
