<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>友链管理</el-breadcrumb-item>
      <el-breadcrumb-item>友链列表</el-breadcrumb-item>
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
          <el-button type="primary" class="buttshi" @click="stantsshow()">添加友链</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="stantslist" border stripe>
        <el-table-column type="index" :index="indexMethod" label="排序" width="450px"></el-table-column>
        <el-table-column label="友链名称" prop="links_name"></el-table-column>
        <el-table-column label="URL" prop="links_address"></el-table-column>
        <el-table-column label="权重等级" prop="weight"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="updastants(scope.row.id, scope.row.links_name, scope.row.links_address, scope.row.weight,)"
            >修改</el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="mini"
              @click="stantrById(scope.row.id)"
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
    <!--添加工具对话框 -->
    <el-dialog title="添加友链" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="友链名称">
          <el-input v-model="form.linkname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="友链URL">
          <el-input
            v-model="form.linkurl"
            autocomplete="off"
            placeholder="格式如:https://www.baidu.com"
          ></el-input>
        </el-form-item>
        <el-form-item label="权重等级">
          <el-input v-model="form.linkweight" autocomplete="off" placeholder="权重等级越高优先显示"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addnewstants">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改工具对话框 -->
    <el-dialog title="修改友链" :visible.sync="upVisible">
      <el-form :model="form3" ref="form2Ref" :hide-required-asterisk="false">
        <el-form-item label="友链名称">
          <el-input v-model="form3.fridname"></el-input>
        </el-form-item>
        <el-form-item label="友链URL">
          <el-input v-model="form3.fridurl" placeholder="格式如:https://www.baidu.com 等"></el-input>
        </el-form-item>
        <el-form-item label="友链权重" placeholder="权重等级越高优先显示">
          <el-input v-model="form3.quanzhong"></el-input>
        </el-form-item>
        <!-- <el-form-item label="新友链URL" :label-width="formLabelWidth">
          <el-input v-model="form2.newdaurl" placeholder="格式如:https://www.baidu.com 等"></el-input>
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upVisible=false">取 消</el-button>
        <el-button type="primary" @click="upnewstants">确 定</el-button>
      </div>
    </el-dialog>
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
      loading: false,
      // 友链列表展示十条
      stantslist: [],
      // 友链列表展示总数
      stantslistall: [],
      // 总数据条数
      total: 0,
      dialogFormVisible: false,
      form: {
        linkname: '',
        linkurl: '',
        linkweight: ''
      },
      form3: {
        fridname: '',
        fridurl: '',
        quanzhong: '',
        idquan: null
      },
      upVisible: false
      // formLabelWidth: '120px'
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getstantslist()
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
    // 点击删除
    stantrById(idsta) {
      this.$confirm('是否确定删除', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 获取当前用户的pk值
          let detatepk = window.sessionStorage.getItem('pk1')
          const { data: res } = await this.$http.post('souqi/admin/friend_links/back/delete/', {
            admin_pk: detatepk,
            links_id: idsta
          })
          if (res.status !== 1) return this.$message.error(res.msg)
          // 从新获取数据
          this.getstantslist()
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
    // 点击修改按钮出现弹框
    updastants(valid, val1, val2, val3) {
      this.form3.idquan = valid
      this.form3.fridname = val1
      this.form3.fridurl = val2
      this.form3.quanzhong = val3
      this.upVisible = true
    },
    // 点击修改后的确认按钮
    async upnewstants() {
      console.log(this.form3.fridname, this.form3.fridurl, this.form3.quanzhong)
      // // 域名正则
      // let postnam = /^(?=^.{3,255}$)[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+$/
      //  匹配网址正则
      // let yesurl = /^(?=^.{3,255}$)(http(s)?:\/\/)?(www\.)?[a-zA-Z0-9][-a-zA-Z0-9]{0,62}(\.[a-zA-Z0-9][-a-zA-Z0-9]{0,62})+(:\d+)*(\/\w+\.\w+)*$/
      // 非负整数
      // let orfu = /^\d+$ /
      if (this.form3.fridname.trim() === '') return this.$message.warning('请输入友链名称')
      if (this.form3.fridurl.trim() === '') return this.$message.warning('请输入正确链接URL')
      if (this.form3.quanzhong.toString().trim() === '') return this.$message.warning('请输入正确权重值')
      let quanstr = this.form3.quanzhong.toString()
      // 获取当前用户的pk值
      let detatepk = window.sessionStorage.getItem('pk1')
      const { data: res } = await this.$http.post('souqi/admin/friend_links/back/change/', {
        admin_pk: detatepk,
        links_id: this.form3.idquan,
        links_name: this.form3.fridname,
        links_address: this.form3.fridurl,
        weight: quanstr
      })
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.getstantslist()
      this.upVisible = false
    },
    // 添加友情链接出现弹框
    stantsshow() {
      this.form.linkname = this.form.linkurl = this.form.linkweight = null
      this.dialogFormVisible = true
    },
    // 添加友情链接确定安妞
    async addnewstants() {
      // console.log(this.form.linkname, this.form.linkurl, this.form.linkweight)
      if (this.form.linkname === null) {
        return this.$message.warning('请输入友链名称')
      } else if (this.form.linkname.trim() === '') {
        return this.$message.warning('请输入友链名称')
      } else if (this.form.linkurl === null) {
        return this.$message.warning('请输入友链链接URL')
      } else if (this.form.linkurl.trim() === '') {
        return this.$message.warning('请输入友链链接URL')
      } else if (this.form.linkweight === null) {
        return this.$message.warning('请输入友链权重')
      } else if (this.form.linkweight.trim() === '') {
        return this.$message.warning('请输入友链权重')
      }
      // 获取当前用户的pk值
      let detatepk = window.sessionStorage.getItem('pk1')
      const { data: res } = await this.$http.post('souqi/admin/friend_links/back/add_check/', {
        admin_pk: detatepk,
        links_name: this.form.linkname,
        links_address: this.form.linkurl,
        weight: this.form.linkweight
      })
      // console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.$message.success('添加成功')
      this.getstantslist()
      this.dialogFormVisible = false
    },
    // 页面加载获取数据总数
    async getstantslist() {
      this.openloding()
      const { data: res } = await this.$http.get('souqi/admin/friend_links/back/add_check/')
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.$message.success('获取成功')
      // 数据总条数
      this.total = parseInt(res.results.length)
      this.stantslistall = res.results
      // 将页码赋值
      if (window.sessionStorage.getItem('stantspages')) {
        this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('stantspages'))
        this.handleCurrentChange(this.queryInfo.pagenum)
      } else {
        // 数据前十条
        this.stantslist = res.results.slice(0, 10)
      }
      this.loading = false
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 页码保存到sessionStorage中
      window.sessionStorage.setItem('stantspages', newPage)
      this.toolslist = this.toolslistall.slice(newPage * 10 - 10, newPage * 10)
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
