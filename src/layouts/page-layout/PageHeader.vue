<script setup lang="ts">
import IconGithub from '../../components/icons/IconGithub.vue'
import Lang from '../../components/Lang.vue'
import Link from '../../components/Link.vue'
import PageLang from './PageLang.vue'
import PageLogo from './PageLogo.vue'
</script>

<template>
  <div class="flex items-center justify-between">
    <Link href="/" class="hover:underline">
      <PageLogo />
    </Link>

    <div class="flex items-center space-x-2">
      <Link href="/manager" class="hover:underline">
        <Lang>
          <template #zh> 管理器 </template>
          <template #en> Manager </template>
        </Lang>
      </Link>

      <PageLang class="hover:underline" />

      <a href="https://github.com/xieyuheng/fidb" target="_blank">
        <IconGithub class="h-5 w-5" />
      </a>
    </div>
  </div>
</template>
