// import 'babel-polyfill'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Popup, Notify, Dialog, Toast } from 'vant';
import 'lib-flexible'
import TouchCls from './assets/js/touch'
Vue.use(Popup).use(Dialog).use(Notify).use(Toast)
Vue.config.productionTip = false
import common from './assets/js/common';
import https from './assets/js/https'
import api from './assets/js/api'
Vue.prototype.$util = common;
Vue.prototype.$https = https;
Vue.prototype.$api = api;
// import Vconsole from 'vconsole';
// new Vconsole();
localStorage.setItem('openId', 'oyGbzvxcj-R6gt9MC6sKKf0JcAXc')
// 长按事件
Vue.directive('longtap', {
  bind: function (el, binding, vonde) {
    const touch = new TouchCls(el, binding, 'longtap')
    touch.initialize()
  }
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

