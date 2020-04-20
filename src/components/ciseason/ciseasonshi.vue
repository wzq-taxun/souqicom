<template>
  <div>
    <el-container>
      <el-header style="none">
        <!-- 顶部组件 -->
        <div class="blockshanghe">
          <div class="shangheader">
            <div class="leftheader">
              <div class="leftheaderfirst">
                <router-link style="display:block; width: 100%;height:100%" to="/">
                  <img src="../../assets/image/logotou.png" alt />
                </router-link>
              </div>
            </div>
            <!-- 中部输入框 -->
            <div class="zhongbushu">
              <el-input
                placeholder="请输入企业名称"
                v-model.trim="inputdetail"
                max
                @keyup.enter.native="detaiser"
                :disabled="isDisable"
              ></el-input>
              <el-button type="warning" @click="detaiser" :disabled="isDisable">搜索</el-button>
            </div>
            <div class="rightheader">
              <div class="rightheaderfirst">
                <div
                  class="commst"
                  v-for="(item, index) in shangshiall"
                  :key="index"
                  @click="qiehuan(index)"
                >
                  <a href="javascript:;">{{item}}</a>
                </div>
              </div>
              <div class="rightheaderlast" @click="detailogo" v-show="isshow">登录 | 注册</div>
              <!-- 登录成功显示头像区域 -->
              <div v-if="!isshow" class="rightheaderlast" style="width: 30%;">
                <div style="margin-left:31px">
                  <el-dropdown :hide-on-click="false" @command="handleCommand">
                    <span class="el-dropdown-link">
                      <!-- 用户名图像 -->
                      <span
                        style="vertical-align:middle;width:40px;
                   height:40px; display:block"
                      >
                        <img
                          style="vertical-align:middle;width:100%;
                       height:100%;"
                          :src="imginfosdt"
                          alt
                        />
                      </span>
                      <!-- 用户名 -->
                      <span style="display:block;width:68%;color:#fff;">{{infoserdt}}</span>
                      <span style="display:block; color:#fff;">
                        <i class="el-icon-arrow-down el-icon--right"></i>
                      </span>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item command="h">用户设置</el-dropdown-item>
                      <el-dropdown-item divided command="e">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <p style="margin-left:15%;padding:0;">
          <span style="font-size:20px;color:#999;">
            <i class="el-icon-s-home"></i>
            <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
            <i class="el-icon-right" style="font-size:10px;"></i>
            <span style="font-size:10px;">{{0===flad ?'上市公司':1===flad ? '港股公司':'新三版公司'}}</span>
          </span>
        </p>
        <div class="cinshigo">
          <!-- 左侧列表 -->
          <div class="cishigolist">
            <ul>
              <li
                v-for="(item, index) in cilistbiaoxin"
                :key="index"
                @click="qiehuan(index)"
                :style="{'color': (index===flad ? '#128bed':'')}"
              >{{item}}</li>
            </ul>
          </div>
          <!-- 右侧表格 -->
          <div class="formlists">
            <!-- 卡片区域 -->
            <el-card class="bcard">
              <!--  表格区域 -->
              <el-table
                :data="tableData"
                style="width: 100%"
                border
                stripe
                @cell-click="turnToRequestPage"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <el-table-column prop="id" align="center" label="序号" width="100"></el-table-column>
                <el-table-column prop="stock_name" align="center" label="股票名称" width="150"></el-table-column>
                <el-table-column prop="stock_code" align="center" label="股票代码" width="100"></el-table-column>
                <el-table-column prop="enterprise_name" align="center" label="公司名称"></el-table-column>
                <el-table-column prop="industry_category" align="center" label="所属行业"></el-table-column>
                <el-table-column prop="stock_date" align="center" label="上市日期" width="200"></el-table-column>
              </el-table>
              <!-- 分页区域 -->
              <div class="fenyemian">
                <el-pagination
                  @current-change="handleCurrentChange"
                  :current-page="queryInfo.pagenum"
                  :page-size="queryInfo.pagesize"
                  layout="prev, pager, next"
                  :total="total"
                  background
                ></el-pagination>
              </div>
            </el-card>
          </div>
        </div>
      </el-main>
      <el-footer style="padding:0">
        <!-- 底部组件 -->
        <foTer></foTer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      // 初始值
      flad: 0,
      cilistbiaoxin: ['上市公司', '港股公司', '新三板公司'],
      // 分页数据
      queryInfo: {
        pagenum: 1,
        pagesize: 10
      },
      // 总数据条数
      total: 0,
      // 表格数据
      tableData: [],
      // 表格加载效果可以通过数据请求前后控制lodaing的真假(+++++++)
      loading: false,
      // 所有表格数据
      yuantablelist: [],
      // --------------------------------
      // 公司名字
      shangshiall: ['上市', '港股', '新三板'],
      // 保存用户名昵称
      infoserdt: '',
      // 保存用户名图片
      imginfosdt: '',
      // 保存图片的根路径
      imgpdt: 'http://47.240.250.145:8000/media/',
      // 输入框的值
      inputdetail: '',
      isDisable: false,
      isshow: false,
      oldtoken: ''
    }
  },
  computed: {},
  created() {
    // 点击当时的索引进行数字转换
    this.flad = parseInt(this.$route.params.ciseasonid.split('.')[0])
    // 页面加载的时候请求(表格数据展示)
    this.getgupaiolist()
    // this.newloding()
  },
  mounted() {
    // 页面刷新验证token
    this.yantoken1()
  },
  watch: {},
  methods: {
    // 单元格触发事件跳转页面传递参数
    turnToRequestPage(cell) {
      // console.log(cell)
      this.$router.push({ name: 'seadetail', params: { seadetail: `${cell.id}.html`, biao: this.flad } })
      // let idk = parseInt(cell.id)
      // const { data: res } = await this.$http.get(`enterprise/A/detailed/${idk}`)
      // console.log(res)
    },
    // 开启加载的函数(+++++)
    openloding() {
      // 控制lodaing的真假(+++++++)
      this.loading = true
      // 5秒后不关闭加载（+++++）
      setTimeout(() => {
        this.loading = false
      }, 10000)
    },
    // 页面加载的时候请求
    async getgupaiolist() {
      if (this.flad === 0) {
        this.openloding() // 控制lodaing的真假(+++++++)
        // 上市表格请求
        const { data: res } = await this.$http.post('enterprise/A/')
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取失败')
        // 先把原始值进行保存
        this.yuantablelist = res.results
        this.total = res.results.length
        // 将页码赋值
        if (window.sessionStorage.getItem('newPage')) {
          this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPage'))
          this.handleCurrentChange(this.queryInfo.pagenum)
        } else {
          // console.log(res.results.slice(0, 10))
          let newshitime = res.results.slice(0, 10)
          for (let i = 0; i < newshitime.length; i++) {
            newshitime[i].stock_date = newshitime[i].stock_date.split(' ')[0]
          }
          this.tableData = newshitime
        }
        // 控制lodaing的真假(+++++++)
        this.loading = false
      } else if (this.flad === 1) {
        this.openloding()
        // 港股信息表格展示：
        const { data: res } = await this.$http.post('enterprise/G/')
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取失败')
        // 先把原始值进行保存
        this.yuantablelist = res.results
        this.total = res.results.length
        // 将页码赋值
        if (window.sessionStorage.getItem('newPage')) {
          this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPage'))
          this.handleCurrentChange(this.queryInfo.pagenum)
        } else {
          let newshitime = res.results.slice(0, 10)
          for (let i = 0; i < newshitime.length; i++) {
            newshitime[i].stock_date = newshitime[i].stock_date.split(' ')[0]
          }
          this.tableData = newshitime
        }
        this.loading = false
      } else {
        this.openloding()
        // 新三板信息表格展示：
        const { data: res } = await this.$http.post('enterprise/XSB/')
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取失败')
        // 先把原始值进行保存
        this.yuantablelist = res.results
        this.total = res.results.length
        // 将页码赋值
        if (window.sessionStorage.getItem('newPage')) {
          this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPage'))
          this.handleCurrentChange(this.queryInfo.pagenum)
        } else {
          let newshitime = res.results.slice(0, 10)
          for (let i = 0; i < newshitime.length; i++) {
            newshitime[i].stock_date = newshitime[i].stock_date.split(' ')[0]
          }
          this.tableData = newshitime
        }
        this.loading = false
      }
    },
    // 切换表格
    qiehuan(valzhi) {
      // 切换值
      this.flad = valzhi
      // 替换当前的url地址的参数
      let newQuery = JSON.parse(JSON.stringify(this.$route.params))
      newQuery.ciseasonid = `${valzhi}.html`
      let routeParam = {
        params: newQuery
      }
      this.$router.push(routeParam)
      // 先清除临时存储的 newPage
      window.sessionStorage.removeItem('newPage')
      this.getgupaiolist()
      this.queryInfo.pagenum = 1
    },
    handleCurrentChange(newPage) {
      // if (newPage > 5) {
      //   this.yantoken()
      // }
      this.queryInfo.pagenum = newPage
      // 页码保存到sessionStorage中
      window.sessionStorage.setItem('newPage', newPage)
      let newshitime = this.yuantablelist.slice(newPage * 10 - 10, newPage * 10)
      for (let i = 0; i < newshitime.length; i++) {
        newshitime[i].stock_date = newshitime[i].stock_date.split(' ')[0]
      }
      this.tableData = newshitime
    },
    detailogo() {
      // 去登录页面
      this.$router.push({
        path: '/user_userden'
      })
    },
    // 搜素和回车事件
    detaiser() {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      // 判断输入框是否为空 空就中止
      if (this.inputdetail === '' || this.inputdetail === '公司' || this.inputdetail === '有限公司') {
        return this.$notify({
          title: '温馨提示',
          message: '搜索范围过大或内容不能为空',
          type: 'warning',
          duration: 1000,
          offset: 50,
          showClose: false
        })
      }
      this.$router.push({
        name: 'clasearc',
        params: { search1: `${this.inputdetail}.html` }
      })
    },
    // 退出登录功能
    handleCommand(command) {
      if (command === 'e') {
        // console.log('1111')
        // 清除token值 再刷新页面
        window.localStorage.removeItem('token')
        this.$router.go(0)
      } else if (command === 'h') {
        this.$router.push({ path: '/people' })
      }
    },
    // 验证token值
    async yantoken1() {
      this.oldtoken = window.localStorage.getItem('token')
      if (!this.oldtoken) return (this.isshow = true)
      const { data: res } = await this.$http.post('user/verify/token/', { token: this.oldtoken })
      // console.log(res)
      if (res.token !== this.oldtoken) return (this.isshow = true)
      // 获取用户的图像
      this.imginfosdt = this.imgpdt + window.localStorage.getItem('userimg')
      // 获取用户的昵称
      this.infoserdt = window.localStorage.getItem('username')
    },
    // 验证token值是否过期接口
    async yantoken() {
      this.oldtoken = window.localStorage.getItem('token')
      if (!this.oldtoken) {
        this.$message.warning('登录查看更多')
        return this.$router.push({ path: '/user_userden' })
      }
      const { data: res } = await this.$http.post('user/verify/token/', { token: this.oldtoken })
      // console.log(res)
      if (res.token !== this.oldtoken) {
        this.$message.warning('登录查看更多')
        return this.$router.push({ path: '/user_userden' })
      }
    }
  },
  components: {
    foTer
  },
  beforeDestroy() {
    // 页面销毁前 清除 临时存储的值
    window.sessionStorage.removeItem('newPage')
  }
}
</script>
<style lang="less" scoped>
/* 上市公司列表页 */
/deep/ .el-table_1_column_2,
/deep/ .el-table_1_column_4,
/deep/ .el-table_1_column_5 {
  color: #008bfe !important;
  cursor: pointer !important;
}
/deep/ .is-leaf {
  color: #909399 !important;
}
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
  .blockshanghe {
    height: 100%;
    background-color: #008bfe;
    .shangheader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 70%;
      margin: 0 auto;
      height: 50px;
      padding-top: 5px;
      .leftheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 300px;
        height: 40px;
        .leftheaderfirst {
          width: 50%;
          height: 58px;
          font-size: 20px;
          font-weight: 900;
          text-align: center;
          a {
            display: block;
            width: 100%;
            height: 100%;
            background-color: #008bfe;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
        .leftheaderlast {
          width: 50%;
          height: 100%;
          background-color: red;
        }
      }
      .zhongbushu {
        width: 30%;
        display: flex;
        align-content: center;
      }
      .rightheader {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        width: 600px;
        height: 40px;
        .rightheaderfirst {
          width: 40%;
          height: 100%;
          display: flex;
          justify-content: space-around;
          align-items: center;
          .commst {
            width: 78px;
            height: 40px;
            font-size: 15px;
            line-height: 40px;
            a {
              color: #fff;
            }
            a:hover {
              color: #ffa500;
            }
          }
        }
        .rightheaderlast {
          width: 15%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 80px;
          .el-dropdown-link {
            display: flex;
            justify-content: space-between;
            cursor: pointer;
            color: #409eff;
          }
          .el-icon-arrow-down {
            font-size: 11px;
          }
          .el-icon--right {
            margin-left: 0px;
          }
        }
      }
    }
  }
}
.el-main {
  padding: 0;
  .cinshigo {
    width: 70%;
    margin: 0 auto;
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    .cishigolist {
      flex: 1;
      // background-color: green;
      ul {
        height: 100%;
        height: 1000px;
        padding: 0;
        margin: 0;
        li {
          cursor: pointer;
          margin: 0;
          color: #333;
          width: 100%;
          height: 50px;
          font-size: 15px;
          line-height: 50px;
          text-align: center;
          margin: 0 auto;
          border: 0.2px solid #ebeef5;
          border-bottom: none;
        }
        li:last-child {
          border-bottom: 0.2px solid #ebeef5;
        }
        li:hover {
          color: #128bed;
        }
      }
    }
    .formlists {
      flex: 6;
      margin-left: 20px;
      .bcard {
        .fenyemian {
          margin: 40px auto;
          margin-bottom: 20px;
          width: 100%;
          text-align: center;
        }
      }
    }
  }
}
</style>
