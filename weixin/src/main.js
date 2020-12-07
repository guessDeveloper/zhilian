import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Popup, Toast, Dialog } from 'vant';
import 'lib-flexible'
import TouchCls from './assets/js/touch'
Vue.use(Popup).use(Toast).use(Dialog)
Vue.config.productionTip = false

// 长按事件
Vue.directive('longtap', {
  bind: function (el, binding) {
    const touch = new TouchCls(el, binding, 'longtap')
    touch.initialize()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

