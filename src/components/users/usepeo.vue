<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>内部用户</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255,0.5)"
    >
      <!-- 搜索与添加区域 -->
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getUserList">
            <el-button slot="append" icon="el-icon-search" @click="getUserList"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="buttshi" @click="addDialogVisible = true">添加用户</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column prop="id" label="#" width="100"></el-table-column>
        <el-table-column label="姓名" prop="username"></el-table-column>
        <el-table-column label="角色" prop="gender"></el-table-column>
        <el-table-column label="注册时间" prop="register_time"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeUserById(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout=" prev, pager, next, total"
        :total="total"
        background
      ></el-pagination>
    </el-card>
    <!-- 添加用户的对话框 -->
    <el-dialog title="添加用户" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 内容主体区域 -->
      <el-form
        :model="addForm"
        :rules="addFormRules"
        ref="addFormRef"
        label-width="70px"
        :hide-required-asterisk="false"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select v-model="addForm.typeval" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <!-- 底部区域 -->
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addUser">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 获取用户列表的参数对象
      queryInfo: {
        query: '',
        // 当前的页数
        pagenum: 1,
        // 当前每页显示多少条数据
        pagesize: 2
      },
      // 用户列表
      userlist: [],
      total: 0,
      // 控制添加用户对话框的显示与隐藏
      addDialogVisible: false,
      // 添加注册用户的表单数据
      addForm: {
        username: '',
        password: '',
        typeval: null
      },
      // 添加表单的验证规则对象
      addFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '用户名的长度在3~10个字符之间',
            trigger: 'blur'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 15,
            message: '用户名的长度在6~15个字符之间',
            trigger: 'blur'
          }
        ]
      },
      options: [
        {
          value: '0',
          label: '管理员'
        },
        {
          value: '1',
          label: '编辑'
        }
      ],
      loading: false
    }
  },
  computed: {},
  created() {
    // 页面初始化获取用户列表请求
    this.getUserList()
  },
  mounted() {},
  watch: {},
  methods: {
    async removeUserById(val) {
      let usernamezhi = window.sessionStorage.getItem('pk1')
      const { data: res } = await this.$http.post('souqi/admin/delete_user/', { admin_pk: usernamezhi, pk: val })
      if (res.status !== 0) return this.$message.error(res.msg)
      this.getUserList()
    },
    // 开启加载的函数(+++++)
    openloding() {
      // 控制lodaing的真假(+++++++)
      this.loading = true
      // 5秒后不关闭加载（+++++）
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    // 点击确定按钮，添加新用户
    async addUser() {
      // 获取当前用户的pk值
      let pkval = window.sessionStorage.getItem('pk1')
      // 把用户类型转化为 0(管理员) 1(编辑)
      const { data: res } = await this.$http.post('souqi/admin/register/', {
        pk: pkval,
        username: this.addForm.username,
        password: this.addForm.password,
        user_types: this.addForm.typeval
      })
      console.log(res)
      if (res.status !== 0) return this.$message.error(res.msg)
      this.$message.success('添加用户成功！')
      // 隐藏添加用户的对话框
      this.addDialogVisible = false
      // 重新获取用户列表数据
      this.getUserList()
    },
    // 监听添加用户对话框的关闭事件
    addDialogClosed() {
      this.$refs.addFormRef.resetFields()
    },
    // 获取用户列表
    async getUserList() {
      this.openloding()
      const { data: res } = await this.$http.post('souqi/admin/interior_user/')
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取数据失败')
      this.$message.success('获取成功')
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].register_time = res.results[i].register_time.split('T')[0]
      }
      this.loading = false
      this.userlist = res.results
    },
    // 改变当前页码
    handleCurrentChange() {}
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
