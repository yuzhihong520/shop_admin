<template>
<el-row type='flex' justify='center' align='middle' >

  <el-col :span='8'>
    <el-form :model="loginForm" :rules="rules" ref="loginForm"  >
  <!-- 用户名 -->
  <el-form-item label="用户名" prop="username">
    <el-input v-model="loginForm.username"></el-input>
  </el-form-item>

  <!-- 密码 -->
   <el-form-item label="密码" prop="password">
    <el-input v-model="loginForm.password"></el-input>
  </el-form-item>

  <!-- 登录部分 -->
  <el-form-item>
    <el-button type="primary" @click='startlogin'>登录</el-button>
    <el-button @click="resetForm">重置</el-button>
  </el-form-item>
  <h1>登录页</h1>
</el-form>

  </el-col>
</el-row>

</template>

<script>
/* eslint-disable */
  // 引入axios
  import axios from 'axios'
// import { url } from 'inspector';

  export default {
    data() {
      return {
        loginForm: {
          username: 'admin',
          password: '123456',

        },
        rules: {
          // 用户名
          username: [
            { required: true, message: '请输入用户名', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
           password: [
            { required: true, message: '请输入密码', trigger: 'blur' },
            { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      // 开始登录
      startlogin() {
        this.$refs.loginForm.validate((valid) => {
          if (!valid) {
            // return console.log('校验失败');
            this.$message({
              message:'校验失败',
              type:'error',
              duration:800
            });
            return;
          }
          //  console.log('校验成功.开始登录');
          // axios.post(url,data,config)
          axios.post('http://localhost:8888/api/private/v1/login',this.loginForm).then(res =>{
            console.log(res);
            if(res.data.meta.status === 200){
              this.$message({
                message:'校验正确',
                type:'success',
                duration:800
              });
              // 跳转到home页
                this.$router.push('/home')
            }
             else{
               this.$message({
                message:'校验失败',
                type:'error',
                duration:800
            });
             }
          })

        });
      },
      // 重置
      resetForm() {
        this.$refs.loginForm.resetFields()
      }
    }
  }
</script>

<style scoped>

  /* 行 */
  .el-row{
    height: 100%;
    background: #2d434c;
  }
  /* 表单 */
  .el-form{
    background: #fff;
    padding: 20px 30px;
  border-radius:20px;
  }
  h1{
    color: red;
  }

</style>
