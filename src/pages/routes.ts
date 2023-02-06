import { RouteRecordRaw } from 'vue-router'
import PageNotFound from './errors/PageNotFound.vue'
import Homepage from './homepage/Homepage.vue'
import Manager from './manager/Manager.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Homepage },
  { path: '/manager', component: Manager },
  { path: '/:pathMatch(.*)', component: PageNotFound },
]
