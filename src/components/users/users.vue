<template>
<div>
    <el-table :data="usersData" style="width: 100%">
    <el-table-column prop="username" label="姓名" width="180"></el-table-column>
    <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
    <el-table-column prop="mobile" label="电话"></el-table-column>
    <el-table-column prop="address" label="状态"></el-table-column>
    <el-table-column prop="address" label="操作"></el-table-column>
  </el-table>
 <!-- 分页 -->
  <el-pagination
  background
  layout="prev, pager, next"
  :total="total"
  :page-size="2"
  :current-page="pagenum"
  @current-change='currentPageChange'
  >
</el-pagination>
</div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      // 表单数据
      usersData: [
        {
          username: '小仙女',
          email: '123454324@qq.com',
          mobile: '13243234151'
        }],
      // 绑定total
      total: 0,
      // 当前页
      pagenum: 1
    }
  },
  created () {
    this.getUsersDate()
  },
  methods: {
    //  加载用户列表数据
    getUsersDate (pagenum = 1) {
      axios
        .get('http://localhost:8888/api/private/v1/users', {
          params: {
            query: '',
            pagenum,
            pagesize: 2
          },
          headers: {
            Authorization: localStorage.getItem('token')
          }
        })
        .then(res => {
          console.log(res)
          // 保存获取列表数据
          this.usersData = res.data.data.users
          // 保存total
          this.total = res.data.data.total
          // 保存当前页
          this.pagenum = res.data.data.pagenum
        })
    },
    // 点击分页
    currentPageChange (curPage) {
      console.log(curPage)
      this.getUsersDate(curPage)
    }
  }
}
</script>

<style>
</style>
