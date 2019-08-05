<template>
  <div>
    <el-button @click="showAddCatDialog" type="success" plain>添加分类</el-button>
    <el-table :data="catData" style="width: 100%">
      <el-table-column type="expand" width="50px">
        <template slot-scope="scope">
          <el-tree :data="scope.row.children" :props="defaultProps"></el-tree>
        </template>
      </el-table-column>
      <el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>
      <el-table-column label="是否有效" width="180">
        <template slot-scope="scope">
          <span>{{ scope.row.cat_deleted ? '否' : '是'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cat_level" label="层级">
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level == 0">一级</span>
          <span v-else-if="scope.row.cat_level == 1">二级</span>
          <span v-else>三级</span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 第一个对话框：添加分类 -->
    <el-dialog title="添加分类" :visible.sync="dialogAddCatVisible">
      <el-form :model="addCatForm" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="addCatForm.cat_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="父级名称">
          <!--级联选择器  -->
          <el-cascader v-model="addCatForm.cat_pid_arr" :props="defaultProps2" :options="options" clearable></el-cascader>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAddCatVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCat">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
/*eslint-disable */
export default {
  data () {
    return {
      catData: [
        {
          cat_name: '王小虎',
          cat_delete: '有效',
          cat_level: '一级'
        }
      ],
      defaultProps: {
        children: 'children',
        label: 'cat_name'
      },
      // 是否显示对话框
      dialogAddCatVisible: false,
      // 添加分类表单对象
      addCatForm: {
        cat_name: '', // 分类名称
        cat_pid_arr: [] // 父级名称数组
      },
      // 级联选择器
      options: [
        {
          value: 'ziyuan',
          label: '资源',
          children: [
            {
              value: 'axure',
              label: 'Axure Components'
            },
            {
              value: 'sketch',
              label: 'Sketch Templates'
            },
            {
              value: 'jiaohu',
              label: '组件交互文档'
            }
          ]
        }
      ],
      defaultProps2: {
        label: 'cat_name',
        value: 'cat_id'
      }
    }
  },
  created () {
    this.loadCatData()
    this.loadCatData2()
  },
  methods: {
    // 加载分类数据
    async loadCatData () {
      //  get(url,config)
      let res = await this.$axios.get('categories', {
        params: {
          type: 3,
          pagenum: 1,
          pagesize: 4
        }
      })
      // console.log(res);
      this.catData = res.data.data.result
    },
    //  弹出添加分类对话框
    showAddCatDialog () {
      this.dialogAddCatVisible = true
    },
    // 加载分类数据
    async loadCatData2 () {
      //  get(url,config)
      let res = await this.$axios.get('categories', {
        params: {
          type: 2
        }
      })
      console.log(res)
      this.options = res.data.data
    },
    // 添加分类
    async addCat () {
      const { cat_name, cat_pid_arr } = this.addCatForm
      let res = await this.$axios.post('categories', {
        cat_pid: cat_pid_arr[cat_pid_arr.length - 1],
        cat_name,
        cat_level: 2
      })
      console.log(res)
      if (res.data.meta.status === 201) {
      //  关闭对话框
        this.dialogAddCatVisible = false
        // 提示
        this.$message({
          message: '创建成功',
          type: 'success',
          duration: 800
        })
        // 刷新
        this.loadCatData()
      }
    }

  }
}
</script>

<style>
</style>
