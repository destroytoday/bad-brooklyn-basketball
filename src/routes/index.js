import VueRouter from 'vue-router'
import Schedule from './schedule'

export const routes = [
  {
    path: '/',
    component: Schedule,
  },
]

export const router = new VueRouter({
  mode: 'history',
  routes,
})
