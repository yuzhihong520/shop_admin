// 1.引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 第三步：引入组件
import login from './components/login/login.vue'
import home from './components/home/home.vue'
// 安装
Vue.use(VueRouter)

// 2.实例化路由
const router = new VueRouter({
  // 第二步规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/home', component: home },
    { path: '/login', component: login }
  ]
})
// 3.导出路由 挂载
export default router
