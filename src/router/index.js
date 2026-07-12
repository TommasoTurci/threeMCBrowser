import { createRouter, createWebHashHistory } from 'vue-router'
import ViewIntroduction from '../views/ViewIntroduction.vue'
import ViewDeepDive from '../views/ViewDeepDive.vue'
import ViewBlockBrowser from '../views/ViewBlockBrowser.vue'
import ViewCollection from '../views/ViewCollection.vue'

const routes = [
  { path: '/', redirect: '/introduction' },
  { path: '/introduction', name: 'introduction', component: ViewIntroduction },
  { path: '/deep-dive',    name: 'deep-dive',    component: ViewDeepDive },
  { path: '/browser',      name: 'browser',      component: ViewBlockBrowser },
  { path: '/collection',   name: 'collection',   component: ViewCollection },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 }),
})

export default router
