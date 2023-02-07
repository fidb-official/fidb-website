<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import Lang from '../../components/Lang.vue'
import { State } from './State'

defineProps<{ state: State }>()

const router = useRouter()
const route = useRoute()
</script>

<template>
  <div class="flex h-full w-full flex-col border-r border-black">
    <div v-if="state.currentDirectory === undefined">
      <Lang>
        <template #zh> 请选择件夹。 </template>
        <template #en> Please choose directory. </template>
      </Lang>
    </div>

    <div v-else>[TODO] ManagerFiles</div>
  </div>
</template>
