// import axios from 'axios'
/*eslint-disable*/
export default {
  name: 'users',
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
      pagenum: 1,
      // 输入绑定的内容
      input3: '',
      // 是否显示添加用户对话框
      dialogAddUserVisible: false,
      // 添加用户表单数据
      addUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 校验规则
      rules: {
        // 用户名
        username: [
          // 判断 *
          { required: true, message: '请输入用户名', trigger: 'blur' },
          // 判断格式
          { min: 3, max: 5, message: '长度应该在3-5之间', trigger: 'blur' }
        ],
        // 密码
        password: [
          // 判断 *
          { required: true, message: '请输入用密码', trigger: 'blur' },
          // 判断格式
          { min: 6, max: 10, message: '长度应该在6-10之间', trigger: 'blur' }
        ],
        // 邮箱
        email: [
          { pattern: /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ],
        // 手机
        mobile: [
          { pattern: /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/,
            message: '格式不正确',
            trigger: 'blur'
          }
        ]

      },
      value1: true
    }
  },
  created () {
    this.getUsersDate()
  },
  methods: {
    //  加载用户列表数据
    getUsersDate (pagenum = 1, query = '') {
      this.$axios
        .get('users', {
          params: {
            query,
            pagenum,
            pagesize: 2
          }
          // headers: {
          //   Authorization: localStorage.getItem('token')
          // }
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
      this.getUsersDate(curPage, this.input3)
    },
    // 搜索
    search () {
      //  console.log(this.input3);
      // 请求内容t的第一页内容
      this.getUsersDate(1, this.input3)
    },
    // 点击显示添加用户对话框
    showAddUserDialog () {
      this.dialogAddUserVisible = true
    },
    // 添加用户
    addUser () {
      this.$axios.post('users', this.addUserForm, {
        // headers:{
        //   Authorization:localStorage.getItem('token')
        // }
      }).then(res => {
        if (res.data.meta.status === 201) {
          // 1.关闭对话框
          this.dialogAddUserVisible = false
          // 2.提示
          this.$message({
            message: '添加用户成功',
            type: 'success',
            duration: 800
          })
          // 刷新
          this.getUsersDate(1)
        }
      })
    },
    // 监听对话框关闭
    dialogClosed () {
      // console.log('关闭了');
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    delUser (id) {
      console.log(id)
      this.$axios.delete(`users/${id}`, {
        // headers:{
        //   Authorization:localStorage.getItem('token')
        // }
      }).then(res => {
        // console.log(res)
        if (res.data.meta.status === 200) {
           this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          }),
          // 刷新
          this.getUsersDate()
        }
      })
    },
    // 改变状态
    stateChange (row) {
      // console.log('改变了');
      // 解构
      const { id, mg_state } = row
      this.$axios.put(`users/${id}/state/${mg_state}`, null, {
      // headers:{
      //   Authorization:localStorage.getItem('token')
      // }
      }).then(res => {
        console.log(res)
        if (res.data.meta.status === 200) {
          this.$message({
            message: '更新状态成功',
            type: 'success',
            duration: 800
          })
        }
      })
    }
  }
}
