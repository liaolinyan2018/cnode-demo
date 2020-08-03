// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 在 main.js 中，全局引入axios
import Vue from 'vue'
import App from './App'
import router from './router/index'
import axios from 'axios'

Vue.config.productionTip = false

// 将页面都要用到的方法挂载到 vue 实例，成为全局方法
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  axios,
  components: { App },
  template: '<App/>'
})
