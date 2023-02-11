import { createHead } from '@vueuse/head'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import { app } from './app'
import App from './App.vue'
import './assets/fonts/index.css'
import './assets/styles/index.css'
import router from './router'

const root = createApp(App)

root.config.globalProperties.$app = app

declare module 'vue' {
  interface ComponentCustomProperties {
    $app: typeof app
  }
}

root.use(router)
root.use(createHead())
root.use(FloatingVue)

root.directive('focus', {
  mounted: (el) => el.focus(),
})

root.directive('blur', {
  mounted: (el) => el.blur(),
})

root.mount('#app')
