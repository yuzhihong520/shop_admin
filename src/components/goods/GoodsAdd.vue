<template>
  <dir>
    <!-- 步骤条 -->
      <el-steps :active="active" finish-status="success">
        <el-step title="第一步" description="基本信息"></el-step>
        <el-step title="第二步" description="商品名称"></el-step>
        <el-step title="第三步" description="商品内容"></el-step>
      </el-steps>
       <!-- 标签页-->
  <el-tabs v-model="activeName" tab-position="left" style="height: 200px;">
    <el-tab-pane name='one' label="基本信息">基本信息</el-tab-pane>
    <el-tab-pane name='two' label="商品名称">商品名称</el-tab-pane>
    <el-tab-pane name='three' label="商品内容">商品内容</el-tab-pane>
  </el-tabs>
  </dir>

</template>

<script>
/* eslint-disable */
export default {
  data(){
    return{
      // 控制步骤条
      active:1,
      // 控制标签页
      activeName:'one'
    }
  }
}
</script>

<style>

</style>
