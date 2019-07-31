import Vue from 'vue'
import App from './App.vue'
// 引入路由
import router from './router'
// 引入element
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
// 引入公共样式
import './assets/common.css'
// 引入axios
import axios from 'axios'
// 解决axios的三个问题
// 问题1：基准默认地址
axios.defaults.baseURL = 'http://localhost:8888/api/private/v1/'
// 问题2：每次每个组件都引入axios
Vue.prototype.$axios = axios // 以后的实例vue 就用this.$axios
// 问题3：每次都要遭请求头携带加token
// 请求拦截器
axios.interceptors.request.use(function (config) {
  config.headers.Authorization = localStorage.getItem('token')
  return config
}, function (error) {
  return Promise.reject(error)
})

// 使用 Vue.use 安装一下
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
