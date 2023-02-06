<script setup lang="ts">
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
import { HomepageState as State } from './HomepageState'

defineProps<{ encoded: String }>()

const router = useRouter()
const route = useRoute()

const state = reactive(new State()) as State
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col">
      What if we use file system as database?
    </div>
  </PageLayout>
</template>
