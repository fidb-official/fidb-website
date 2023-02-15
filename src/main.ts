import { createHead } from '@vueuse/head'
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
import { createApp } from 'vue'
import App from './App.vue'
import './assets/fonts/index.css'
import './assets/styles/index.css'
import * as Directives from './directives'
import router from './router'

const app = createApp(App)

app.use(router)
app.use(createHead())
app.use(FloatingVue)

app.directive('focus', Directives.focus)
app.directive('blur', Directives.blur)

app.mount('#app')
