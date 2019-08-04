/*eslint-disable*/
export default {
  data() {
    return {
      // 角色列表数据
      rolesData: [{
        roleName: '2016-05-02',
        roleDesc: '王小虎',
      }
     ],
    //  是否显示权限分配对话框
    dialogAssignRightsVisible:false,
    //  树的数据
    treeData: [{
      id: 1,
      label: '一级 1',
      children: [{
        id: 4,
        label: '二级 1-1',
        children: [{
          id: 9,
          label: '三级 1-1-1'
        }, {
          id: 10,
          label: '三级 1-1-2'
        }]
      }]
    }, {
      id: 2,
      label: '一级 2',
      children: [{
        id: 5,
        label: '二级 2-1'
      }, {
        id: 6,
        label: '二级 2-2'
      }]
    }, {
      id: 3,
      label: '一级 3',
      children: [{
        id: 7,
        label: '二级 3-1'
      }, {
        id: 8,
        label: '二级 3-2'
      }]
    }],
    defaultProps: {
      children: 'children',
      label: 'authName'
    },
    // 角色id
      roleId:0
    }
  },
  created(){
    this.loadRolesData()
    this.loadRightsData()
  },
  methods:{
    // 加载角色
   async loadRolesData(){
    let res = await this.$axios.get('roles')
    console.log(res);
      this.rolesData = res.data.data
   },
  //  处理索引
   indexMethod(index){
     return index
   },
  //  加载权限数据
  async loadRightsData(){
      let res = await this.$axios.get('rights/tree')
      console.log(res);
      this.treeData = res.data.data
  },
  // 显示分配权限对话框
   showAssignRightsDialog(row){
     this.roleId = row.id
    this.dialogAssignRightsVisible = true

    // 获取第三层的id
    let keys = []
    row.children.forEach(item1 =>{
      item1.children.forEach(item2 =>{
        item2.children.forEach(item3 =>{
          keys.push(item3.id)
        })
      })
    })
    // dom更新完毕之后。自动调用回调
    this.$nextTick(() =>{
      // 处理row
    this.$refs.tree.setCheckedKeys(keys);
       })
     },
    //  添加分配权限
     async assignRights(){
      //  1.获取半选和全选的key(id)
      let keys1 = this.$refs.tree.getHalfCheckedKeys()
      let keys2 = this.$refs.tree.getCheckedKeys()

      let keys = [...keys1,...keys2]
      let res =await this.$axios.post(`roles/${this.roleId}/rights`,{
        rids:keys.join(','),
      })
      // console.log(res);
      if(res.data.meta.status===200){
        // 关闭对话框
        this.dialogAssignRightsVisible = false
        // 提示
        this.$message({
          message:'角色授权成功',
          type:'success',
          duration:800
        })
       // 刷新
        this.loadRolesData()
      }
     }
   }
}
