<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工具管理</el-breadcrumb-item>
      <el-breadcrumb-item>工具列表</el-breadcrumb-item>
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
          <el-button type="primary" class="buttshi" @click="dialadd()" v-if="usertpte==='管理员'">添加工具</el-button>
        </el-col>
      </el-row>

      <!-- table表格区域 -->
      <el-table :data="toolslist" border stripe>
        <el-table-column type="index" :index="indexMethod" label="排序" width="450px"></el-table-column>
        <el-table-column label="工具名称" prop="tools_name"></el-table-column>
        <el-table-column label="阿里图标类名" prop="tool_taxon"></el-table-column>
        <el-table-column label="是否显示">
          <template slot-scope="scope">
            <el-switch
              disabled
              v-model="scope.row.is_show"
              active-text="显示"
              inactive-text="隐藏"
              active-color="#13ce66"
              inactive-color="#ff4949"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="usertpte==='管理员'"
              type="primary"
              icon="el-icon-edit"
              size="mini"
              @click="updatool(scope.row.id,scope.row.tools_name, scope.row.tool_taxon)"
            >修改</el-button>
            <el-button
              type="success"
              icon="el-icon-thumb"
              size="mini"
              @click="infoById(scope.row.id)"
            >进入</el-button>
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
    <el-dialog title="添加新工具" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="工具名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="阿里图标类名" :label-width="formLabelWidth">
          <el-input v-model="form.alitubiao" autocomplete="off" placeholder="参考阿里图标库"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <!-- <el-input v-model="form.alitubiao" autocomplete="off" placeholder="参考阿里图标库"></el-input> -->
          <el-switch
            v-model="value"
            active-text="显示"
            inactive-text="隐藏"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            @change="changegaibian()"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addnewtools">确 定</el-button>
      </div>
    </el-dialog>
    <!--修改工具对话框 -->
    <el-dialog title="修改工具" :visible.sync="upVisible">
      <el-form :model="form2" ref="form2Ref" :hide-required-asterisk="false">
        <el-form-item label="原工具名称" :label-width="formLabelWidth">
          <el-input v-model="oldname" disabled></el-input>
        </el-form-item>
        <el-form-item label="原图标类名" :label-width="formLabelWidth">
          <el-input v-model="oldalitu" disabled></el-input>
        </el-form-item>
        <el-form-item label="新工具名称" :label-width="formLabelWidth">
          <el-input v-model="form2.newname"></el-input>
        </el-form-item>
        <el-form-item label="新图标类名" :label-width="formLabelWidth">
          <el-input v-model="form2.newalitu" placeholder="参考阿里图标库"></el-input>
        </el-form-item>
        <el-form-item label="是否显示" :label-width="formLabelWidth">
          <el-switch
            v-model="value"
            active-text="显示"
            inactive-text="隐藏"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0"
            @change="changegaibian()"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="upVisible=false">取 消</el-button>
        <el-button type="primary" @click="upnewtools">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      value: '0',
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 工具列表展示十条
      toolslist: [],
      // 数据总的数据
      toolslistall: [],
      // 总数据条数
      total: 0,
      loading: false,
      upVisible: false,
      dialogFormVisible: false,
      formLabelWidth: '120px',
      form: {
        name: '',
        alitubiao: ''
      },
      form2: {
        newname: '',
        newalitu: ''
      },
      oldid: '',
      oldname: '',
      oldalitu: '',
      // 判断用户类型
      usertpte: ''
    }
  },
  computed: {},
  created() {
    // 判断用户类型
    this.usertpte = window.sessionStorage.getItem('user_type1')
  },
  mounted() {
    this.getoollist()
  },
  watch: {},
  methods: {
    // 控制工具是否显示
    changegaibian() {
      console.log(this.value)
    },
    indexMethod(index) {
      return (this.queryInfo.pagenum - 1) * 10 + index + 1
    },
    infoById(idval) {
      console.log(idval)
      this.$router.push({
        path: '/toolist/subordinate',
        query: {
          codeid: idval
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
    // 页面加载获取数据总数
    async getoollist() {
      this.openloding()
      const { data: res } = await this.$http.get('souqi/admin/tools/add/')
      if (res.status !== 0) return this.$message.warning(res.msg)
      this.$message.success('获取成功')
      console.log(res)
      // 数据总条数
      this.total = parseInt(res.results.length)
      this.toolslistall = res.results
      // 将页码赋值
      if (window.sessionStorage.getItem('newPagetool')) {
        this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPagetool'))
        this.handleCurrentChange(this.queryInfo.pagenum)
      } else {
        // 数据前十条
        this.toolslist = res.results.slice(0, 10)
      }
      this.loading = false
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      // 页码保存到sessionStorage中
      window.sessionStorage.setItem('newPagetool', newPage)
      this.toolslist = this.toolslistall.slice(newPage * 10 - 10, newPage * 10)
    },
    // 监听添加用户对话框的关闭事件
    // addDialogClosed() {
    //   this.$refs.form2Ref.resetFields()
    // },
    dialadd() {
      this.form.name = ''
      this.form.alitubiao = ''
      this.dialogFormVisible = true
    },
    async addnewtools() {
      if (this.form.name.trim() === '') return this.$message.warning('请输入工具名')
      if (this.form.alitubiao.trim() === '') return this.$message.warning('请输入图标类名')
      let newzhi = this.form.name
      const { data: res } = await this.$http.post('souqi/admin/tools/add/', { tool_name: newzhi, tool_taxon: this.form.alitubiao, is_show: this.value })
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.$message.success('添加成功')
      this.getoollist()
      this.dialogFormVisible = false
    },
    updatool(value1, value2, value3) {
      this.upVisible = true
      this.oldid = value1
      this.oldname = value2
      this.oldalitu = value3
      this.form2.newname = ''
      this.form2.newalitu = ''
    },
    async upnewtools() {
      if (this.form2.newname.trim() === '') return this.$message.warning('请输入正确工具名')
      if (this.form2.newalitu.trim() === '') return this.$message.warning('请输入图标类名')
      const { data: res } = await this.$http.post('souqi/admin/t_c/update/', {
        tools_id: this.oldid,
        tools_name: this.form2.newname,
        tool_taxon: this.form2.newalitu,
        is_show: this.value
      })
      // console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.$message.success('修改成功！')
      this.getoollist()
      this.upVisible = false
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
</style>
