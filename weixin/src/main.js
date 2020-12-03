import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Popup, Toast, } from 'vant';
import 'lib-flexible'
Vue.use(Popup).use(Toast)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
