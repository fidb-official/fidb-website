<script setup lang="ts">
import { Head } from '@vueuse/head'
import { useRoute, useRouter } from 'vue-router'
import FormButton from '../../components/FormButton.vue'
import FormDivider from '../../components/FormDivider.vue'
import FormInput from '../../components/FormInput.vue'
import Lang from '../../components/Lang.vue'
import { useForm } from '../../hooks/useForm'
import PageLayout from '../../layouts/page-layout/PageLayout.vue'

const router = useRouter()
const route = useRoute()

const form = useForm({ url: '' })

function submit(event: Event) {
  form.submit(event, (values) => {
    router.push(`/manager/${values.url}`)
  })
}
</script>

<template>
  <PageLayout>
    <Head>
      <title v-if="$app.lang.zh">管理器 | FiDB</title>
      <title v-else>Manager | FiDB</title>
    </Head>

    <div class="flex h-full flex-col items-center justify-center">
      <form class="flex w-full flex-col px-3 md:w-96" @submit.prevent="submit">
        <div class="flex flex-col">
          <div class="flex items-baseline justify-between">
            <div class="text-2xl font-bold">
              <Lang>
                <template #zh> 管理器 </template>
                <template #en> Manager </template>
              </Lang>
            </div>
          </div>
        </div>

        <FormInput :form="form" name="url" type="url" required>
          <template #label>
            <Lang>
              <template #zh>数据库网址</template>
              <template #en>Database URL</template>
            </Lang>
          </template>
        </FormInput>

        <FormDivider />

        <FormButton :disabled="form.processing">
          <Lang>
            <template #zh>登陆</template>
            <template #en>Login</template>
          </Lang>
        </FormButton>
      </form>
    </div>
  </PageLayout>
</template>
