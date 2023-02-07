<script setup lang="ts">
import Lang from './Lang.vue'
</script>

<template>
  <div class="flex flex-col items-start">
    <slot>
      <Lang>
        <template #zh>加载中……</template>
        <template #en>Loading...</template>
      </Lang>
    </slot>
  </div>
</template>
