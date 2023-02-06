<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { ManagerState as State } from './ManagerState'

const router = useRouter()
const route = useRoute()

const state = reactive(new State())
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col items-center justify-center">
      ManagerFrom
    </div>
  </PageLayout>
</template>
