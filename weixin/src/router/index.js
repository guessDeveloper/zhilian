import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue')
  },
  {
    path: '/projectPersion',
    name: 'projectPersion',
    component: () => import(/* webpackChunkName: "projectPersion" */ '../views/projectPersion.vue')
  },
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "result" */ '../views/result.vue')
  },
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach((to, from, next) => {
  // ...
  if (to.meta.title) {
    document.title = to.meta.title
  }
  document.body.scrollTop = 0
  document.documentElement.scrollTop = 0
  next()
})
export default router