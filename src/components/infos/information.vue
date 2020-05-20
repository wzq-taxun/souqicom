<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工具管理</el-breadcrumb-item>
      <el-breadcrumb-item>资讯列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片视图区域 -->
    <el-card
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(255,255,255,0.5)"
    >
      <el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="buttshi" @click="goAddinfolist">添加资讯</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="infoslist" border stripe>
        <el-table-column type="index" :index="indexMethod" label="排序" width="100px"></el-table-column>
        <el-table-column label="资讯标题" prop="title"></el-table-column>
        <el-table-column label="关联工具" prop="associated_tools_name" width="140px"></el-table-column>
        <el-table-column label="发布时间" prop="issue_time" width="140px"></el-table-column>
        <el-table-column label="文章来源" prop="consulting_source" width="150px"></el-table-column>
        <el-table-column label="发布人" prop="issuer_name" width="150px"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="goinfoedit(scope.row.id)"
            >编辑</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="removeById(scope.row.id)"
            >删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页区域 -->
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout="prev, pager, next, total"
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
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 工具列表展示十条
      infoslist: [],
      // 数据总的数据
      infoslistall: [],
      // 总数据条数
      total: 0,
      loading: false
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getinfolist()
  },
  watch: {},
  methods: {
    indexMethod(index) {
      return (this.queryInfo.pagenum - 1) * 10 + index + 1
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
    // 页面加载获取数据总数
    async getinfolist() {
      this.openloding()
      const { data: res } = await this.$http.get('souqi/admin/consulting/add/')
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.$message.success('获取成功')
      console.log(res)
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].issue_time = res.results[i].issue_time.split('T')[0]
      }
      // 数据总条数
      this.total = parseInt(res.results.length)
      this.infoslistall = res.results
      // 将页码赋值
      if (window.sessionStorage.getItem('newPage3')) {
        this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPage3'))
        this.handleCurrentChange(this.queryInfo.pagenum)
      } else {
        // 数据前十条
        this.infoslist = res.results.slice(0, 10)
      }
      this.loading = false
    },
    goinfoedit(idzhival) {
      this.$router.push({ path: '/information/addinfomation', query: { idzhival } })
    },
    goAddinfolist() {
      this.$router.push({ path: '/information/addinfomation' })
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 页码保存到sessionStorage中
      window.sessionStorage.setItem('newPage3', newPage)
      this.infoslist = this.infoslistall.slice(newPage * 10 - 10, newPage * 10)
    },
    // 删除事件刷新当前页面从新获取当前页面数据
    removeById(idzhi) {
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 获取当前用户的pk值
          let detatepk = window.sessionStorage.getItem('pk1')
          const { data: res } = await this.$http.post('souqi/admin/consulting/delete/', {
            admin_pk: detatepk,
            consulting_id: idzhi
          })
          if (res.status !== 1) return this.$message.error(res.msg)
          // 从新获取数据
          this.getinfolist()
          this.$message({
            type: 'success',
            message: res.msg
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
