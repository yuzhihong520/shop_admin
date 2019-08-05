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
      // 开关
      value1: true,
      // 是否显示编辑对话框
      dialogEditUserVisible:false,
      // 编辑用户表单对象
      editUserForm:{
        username:'渣渣',
        email:'',
        mobile:'',
        id:0
      },
      // 是否显示分配对话框
      dialogAssignRoleVisible:false,
      // 分配角色对话框
      assignRoleForm:{
        username:'小仙女',
        id:0, //用户名id
        rid:'', //角色id
      },
      // 角色列表数据
      rolesData:[]
    }
  },
  created () {
    this.getUsersDate()
    this.loadRolesData()
  },
  methods: {
    //  加载用户列表数据
    async getUsersDate (pagenum = 1, query = '') {
      let config = {
         params: {
           query,
           pagenum,
           pagesize: 2
          }
        }
     let res = await this.$axios.get('users', config )
          // 保存获取列表数据
         this.usersData = res.data.data.users
          // 保存total
          this.total = res.data.data.total
          // 保存当前页
          this.pagenum = res.data.data.pagenum
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
    async addUser () {
      let res = await  this.$axios.post('users', this.addUserForm)
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
    },
    // 监听对话框关闭
    dialogClosed () {
      // console.log('关闭了');
      this.$refs.addUserRef.resetFields()
    },
    // 删除用户
    async delUser (id) {
      let res = await this.$axios.delete(`users/${id}`)
          if (res.data.meta.status === 200) {
            this.$message({
            message: '删除成功',
            type: 'success',
            duration: 800
          }),
          // 刷新
          this.getUsersDate()
        }
    },
    // 改变状态
    async stateChange (row) {
      const { id, mg_state } = row
      let res = await this.$axios.put(`users/${id}/state/${mg_state}`)
          if (res.data.meta.status === 200) {
            this.$message({
              message: '更新状态成功',
              type: 'success',
              duration: 800
            })
          }
    },
    // 显示编辑用户对话框
    showEditUserDialog(row){
      this.dialogEditUserVisible = true
      // 解构
      let { username,email,mobile,id} = row
      this.editUserForm.username = username
      this.editUserForm.email = email
      this.editUserForm.mobile = mobile
      this.editUserForm.id = id
    },
    // 编辑用户
    async editUser(){
      const { email , mobile ,id } = this.editUserForm
      let res = await this.$axios.put(`users/${id}`,{
        email,
        mobile
      })
      if(res.data.meta.status===200){
        // 关闭对话框
        this.dialogEditUserVisible = false
        // 提示
        this.$message({
          message:'更新成功',
          type:'success',
          duration:800
        })
        // 更新
        this.getUsersDate(this.pagenum ,this.input3)
      }
    },
    // 加载所有的角色数据
    async loadRolesData(){
         let res = await this.$axios.get('roles')
        //  console.log(res);
         this.rolesData = res.data.data
    },
    // 展示分配角色对话框
    async showAssignRoleDialog(row){
      this.dialogAssignRoleVisible=true

      const { id,username } = row
      this.assignRoleForm.id = id
      this.assignRoleForm.username = username
      let res = await this.$axios.get(`users/${id}`)
      // console.log(res);
      this.assignRoleForm.rid = res.data.data.rid ===-1 ? '': res.data.data.rid
    },
    // 分配角色
    async assignRole(){
      const { id ,rid,username} = this.assignRoleForm
      // put(url,data,config)
      let res = await this.$axios.put(`users/${id}/role`,{
        rid
      })
      console.log(res);
      if(res.data.meta.status===200){
        // 关闭对话框
        this.dialogAssignRoleVisible= false
        // 提示
        this.$message({
          message:'设置成功',
          type:'success',
          duration:800
        })
        // 刷新
        this.getUsersDate(this.pagenum,this.input3)
      }
    }
  }
}
