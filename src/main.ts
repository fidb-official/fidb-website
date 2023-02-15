import { createHead } from '@vueuse/head'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/fonts/index.css'
import './assets/styles/index.css'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createHead())
app.use(FloatingVue)

app.directive('focus', {
  mounted: (el) => el.focus(),
})

app.directive('blur', {
  mounted: (el) => el.blur(),
})

app.mount('#app')
