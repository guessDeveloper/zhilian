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
      title: '选择人员'
    }
  },
  {
    path: '/result',
    name: 'result',
    component: () => import(/* webpackChunkName: "result" */ '../views/result.vue'),
    meta: {
      title: '查看结果'
    }
  },
  //
  {
    path: '/submit',
    name: 'submit',
    component: () => import(/* webpackChunkName: "submit" */ '../views/submit.vue'),
    meta: {
      title: 'MAP胜任力卡片建模'
    }
  }, {
    path: '/answer',
    name: 'answer',
    component: () => import(/* webpackChunkName: "answer" */ '../views/answer.vue'),
    meta: {
      title: 'MAP胜任力卡片建模',
      keepAlive: true,
    }
  },
  {
    path: '/answerSelect',
    name: 'answerSelect',
    component: () => import(/* webpackChunkName: "answerSelect" */ '../views/answerSelect.vue'),
    meta: {
      title: 'MAP胜任力卡片建模'
    }
  },
  {
    path: "/projectClose",
    name: 'projectClose',
    component: () => import(/* webpackChunkName: "projectClose" */ '../views/projectClose.vue'),
    meta: {
      title: 'MAP胜任力卡片建模'
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