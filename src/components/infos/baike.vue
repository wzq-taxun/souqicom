<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>百科列表</el-breadcrumb-item>
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
          <el-input placeholder="请输入内容" v-model="queryInfo.query" clearable @clear="getGoodsList">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" class="buttshi" @click="goAddpage">添加百科</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="goodslist" border stripe>
        <el-table-column type="index" :index="indexMethod" label="排序" prop="id" width="100px"></el-table-column>
        <el-table-column label="百科标题" prop="title"></el-table-column>
        <el-table-column label="发布时间" prop="issue_time" width="140px"></el-table-column>
        <el-table-column label="文章来源" prop="encyclopedias_source" width="150px"></el-table-column>
        <el-table-column label="发布人" prop="issuer_name" width="150px"></el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="edit(scope.row.id)">编辑</el-button>
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
      // 百科列表展示十条
      goodslist: [],
      // 数据总的数据
      goodslistall: [],
      // 总数据条数
      total: 0,
      loading: false
    }
  },
  computed: {},
  created() {
    // 页面初始化加载
    this.getGoodsList()
  },
  mounted() {},
  watch: {},
  methods: {
    // 索引展示
    indexMethod(index) {
      return (this.queryInfo.pagenum - 1) * 10 + index + 1
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
          const { data: res } = await this.$http.post('souqi/admin/encyclopedias_manage/delete/', {
            admin_pk: detatepk,
            pk: idzhi
          })
          if (res.status !== 1) return this.$message.error(res.msg)
          // 从新获取数据
          this.getGoodsList()
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
    },
    // 点击编辑按钮携带该行的id进行跳转到添加百科的页面
    edit(idvalue) {
      // console.log(idvalue)
      this.$router.push({
        path: '/baike/addbaike',
        query: {
          code: idvalue
        }
      })
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
    goAddpage() {
      this.$router.push({ path: '/baike/addbaike' })
    },
    async getGoodsList() {
      this.openloding()
      const { data: res } = await this.$http.post('souqi/admin/encyclopedias_manage/')
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取数据失败')
      this.$message.success('获取成功')
      this.loading = false
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].issue_time = res.results[i].issue_time.split('T')[0]
      }
      // 数据总条数
      this.total = parseInt(res.results.length)
      // 数据总表
      this.goodslistall = res.results
      // 将页码赋值
      if (window.sessionStorage.getItem('newPage1')) {
        this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPage1'))
        this.handleCurrentChange(this.queryInfo.pagenum)
      } else {
        // 数据前十条
        this.goodslist = res.results.slice(0, 10)
      }
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 页码保存到sessionStorage中
      window.sessionStorage.setItem('newPage1', newPage)
      this.goodslist = this.goodslistall.slice(newPage * 10 - 10, newPage * 10)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
