import { RouteRecordRaw } from 'vue-router'
import Docs from './docs/Docs.vue'
import PageNotFound from './errors/PageNotFound.vue'
import Home from './home/Home.vue'
import Manager from './manager/Manager.vue'
import ManagerLogin from './manager/ManagerLogin.vue'
import Troll from './troll/Troll.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/troll', component: Troll },
  { path: '/docs', component: Docs },
  { path: '/manager', component: ManagerLogin },
  { path: '/manager/:url(.*)', component: Manager },
  { path: '/:pathMatch(.*)', component: PageNotFound },
]
