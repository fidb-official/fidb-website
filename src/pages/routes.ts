import { RouteRecordRaw } from 'vue-router'
import PageNotFound from './errors/PageNotFound.vue'
import Home from './home/Home.vue'
import Manager from './manager/Manager.vue'
import ManagerStart from './manager/ManagerStart.vue'
import Troll from './troll/Troll.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/troll', component: Troll },
  { path: '/manager', component: ManagerStart },
  { path: '/manager/:url(.*)', component: Manager },
  { path: '/:pathMatch(.*)', component: PageNotFound },
]
