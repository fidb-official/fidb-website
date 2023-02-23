import { RouteRecordRaw } from 'vue-router'
import Docs from './docs/Docs.vue'
import PageNotFound from './errors/PageNotFound.vue'
import Home from './home/Home.vue'
import Manager from './manager/Manager.vue'
import ManagerSignIn from './manager/ManagerSignIn.vue'
import Talks from './talks/Talks.vue'

export const routes: Array<RouteRecordRaw> = [
  { path: '/', component: Home },
  { path: '/talks', component: Talks },
  { path: '/docs', component: Docs },
  { path: '/manager', component: ManagerSignIn },
  { path: '/manager/:url(.*)', component: Manager },
  { path: '/:pathMatch(.*)', component: PageNotFound },
]
