<template>
  <el-container>
    <!-- 头部 -->
    <el-header>
      <el-row>
        <el-col :span="8">
          <img src="../../assets/logo.png" alt>
        </el-col>
        <el-col :span="8">
          <h1>后台管理系统</h1>
        </el-col>
        <el-col :span="8" class="col3">
          恭喜你进入高新阶段
          <a @click.prevent="logout" href="#">退出</a>
        </el-col>
      </el-row>
    </el-header>

    <el-container>
      <!-- 左侧 -->
      <el-aside width="200px">
        <el-menu
          :router="true"
          :default-active="handleUrlPath()"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 用户管理 -->
          <el-submenu :index="item1.id+''" v-for='item1 in menusData' :key=item1.id>
            <!-- 自定义标题 -->
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{ item1.authName }}</span>
            </template>
            <!-- 选项 -->
            <el-menu-item v-for='item2 in item1.children' :key='item2.id' :index=" '/'+ item2.path">{{ item2.authName }}</el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main>
        <!-- 嵌套路由，留一个出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data () {
    return {
      menusData: []
    }
  },
  created () {
    this.loadLeftMenusData()
  },
  methods: {
    // 动态加载左侧权限列表
    async loadLeftMenusData () {
      let res = await this.$axios.get('menus')
      console.log(res)
      this.menusData = res.data.data
    },
    // 退出登录
    async logout () {
      try {
        await this.$confirm('此操作将退出登录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        console.log('点击确定')
        // 0.退出删除本地的token
        localStorage.removeItem('token')
        // 1. 提示退出成功
        this.$message({
          message: '退出成功!',
          type: 'success',
          duration: 800
        })
        // 2.回到login页
        this.$router.push('/login')
      } catch (error) {
        console.log('点击取消')
        this.$message({
          message: '取消退出!',
          type: 'info',
          duration: 800
        })
      }

      // .then(() => {
      // // 0.退出删除本地的token
      // localStorage.removeItem('token')
      // // 1. 提示退出成功
      // this.$message({
      //   message: '退出成功!',
      //   type: 'success',
      //   duration: 800
      // })

      // // 2.回到login页
      // this.$router.push('/login')
      // })
      // .catch(() => {
      // this.$message({
      //   message: '取消退出!',
      //   type: 'info',
      //   duration: 800
      // })
      // })
    },
    // 处理路径
    handleUrlPath () {
      if (this.$route.path === '/goods-add') {
        return '/goods'
      }
      // return this.$route.path
    }
  }
}
</script>

<style scoped lang='less'>
.el-header {
  background: #b3c1cd;
  padding: 0px;
  h1 {
    color: #fff;
    font-size: 26px;
    text-align: center;
    line-height: 60px;
  }
  .col3 {
    text-align: right;
    line-height: 60px;
    padding-right: 30px;
    a {
      color: red;
    }
  }
}

.el-aside {
  background: #545c64;
}

.el-main {
  background: #eaeef1;
}
.el-container {
  height: 100%;
}
</style>
