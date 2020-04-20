<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>常规用户</el-breadcrumb-item>
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
          <el-button type="primary" class="buttshi" icon="el-icon-refresh" @click="getUserList()">更新</el-button>
        </el-col>
      </el-row>

      <!-- 用户列表区域 -->
      <el-table :data="userlist" border stripe>
        <el-table-column prop="id" label="#" width="100"></el-table-column>
        <el-table-column label="昵称" prop="username"></el-table-column>
        <el-table-column label="电话" prop="mobile"></el-table-column>
        <el-table-column label="注册时间" prop="register_time"></el-table-column>
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
      loading: false
    }
  },
  computed: {},
  created() {
    // 获取用户列表
    this.getUserList()
  },
  mounted() {},
  watch: {},
  methods: {
    // 开启加载的函数(+++++)
    openloding() {
      // 控制lodaing的真假(+++++++)
      this.loading = true
      // 5秒后不关闭加载（+++++）
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    // 获取用户列表
    async getUserList() {
      this.openloding()
      const { data: res } = await this.$http.post('souqi/admin/user_manage/')
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
    // 分页事件
    handleSizeChange() {},
    // 改变当前页码
    handleCurrentChange() {}
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
