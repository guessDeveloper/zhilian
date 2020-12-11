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
    component: () => import(/* webpackChunkName: "home" */ '../views/Home.vue'),
    meta: {
      title: '我的项目'
    }
  },
  //项目人员
  {
    path: '/projectPersion',
    name: 'projectPersion',
    component: () => import(/* webpackChunkName: "projectPersion" */ '../views/projectPersion.vue'),
    meta: {
      title: '项目人员'
    }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "result" */ '../views/result.vue')
  },
  //
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "submit" */ '../views/submit.vue'),
    meta: {
      title: '作答'
    }
  }, {
    path: '/answer',
    name: 'answer',
    component: () => import(/* webpackChunkName: "answer" */ '../views/answer.vue'),
    meta: {
      title: '作答'
    }
  },
  {
    path: '/answerSelect',
    name: 'answerSelect',
    component: () => import(/* webpackChunkName: "answerSelect" */ '../views/answerSelect.vue'),
    meta: {
      title: '作答'
    }
  }

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