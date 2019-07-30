// 1.引入路由
import Vue from 'vue'
import VueRouter from 'vue-router'
// 第三步：引入组件
import login from './components/login/login.vue'
import home from './components/home/home.vue'
import users from './components/users/users.vue'
import roles from './components/roles/roles.vue'
import rights from './components/rights/rights.vue'
// 安装
Vue.use(VueRouter)

// 2.实例化路由
const router = new VueRouter({
  // 第二步规则
  routes: [
    // 重定向
    { path: '/', redirect: '/login' },
    { path: '/login', component: login },
    { path: '/home',
      component: home,
      children: [
        { path: '/users', component: users },
        { path: '/roles', component: roles },
        { path: '/rights', component: rights }
      ]
    }
  ]
})

//  全局导航守卫
router.beforeEach((to, form, next) => {
  // 判断访问的是不是登录页
  // 是登录页
  if (to.path === '/login') {
    next()
  } else {
    // 不是登录页。是其他页面
    // 判断是否登录
    let token = localStorage.getItem('token')
    token ? next() : next('/login')
  }
})
// 3.导出路由 挂载
export default router
