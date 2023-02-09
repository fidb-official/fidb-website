<script setup lang="ts">
import Lang from '../../components/Lang.vue'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'
</script>

<template>
  <PageLayout>
    <div class="flex h-full flex-col items-center justify-center">
      <div class="flex flex-col space-y-2 px-3">
        <div class="text-6xl font-bold">FiDB</div>
        <Lang>
          <template #zh> 如果用文件系统当数据库会怎样？ </template>
          <template #en> What if we use file system as database? </template>
        </Lang>

        <div>
          <a
            class="underline decoration-2"
            href="https://github.com/fidb-official/fidb"
            target="_blank"
          >
            <Lang>
              <template #zh> 来试试看！ </template>
              <template #en> Let's find out! </template>
            </Lang>
          </a>
        </div>

        <div class="py-16"></div>
      </div>
    </div>
  </PageLayout>
</template>
