import { RouteRecordRaw } from 'vue-router'
import PageNotFound from './errors/PageNotFound.vue'
import Homepage from './homepage/Homepage.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Homepage },
  { path: '/:pathMatch(.*)', component: PageNotFound },
]
