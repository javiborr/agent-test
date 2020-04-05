import Vue from 'vue'
import VueRouter from 'vue-router'
import TestOutbound from '../views/test.outbound.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'TestOutbound',
    component: TestOutbound
  },
  {
    path: '/inbound',
    name: 'TestInbound',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/test.inbound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
