<template>
  <div>
    <el-container>
      <el-header style="none">
        <!-- 顶部组件 -->
        <headerl></headerl>
      </el-header>
      <el-main>
        <div class="fhdjksghfhdghf">
          <!-- 头部 -->
          <div class="sifyleft">
            <div class="shangbualwai">
              <el-card class="shangbual">
                <p style="margin:0">
                  <span style="font-size:20px;color:#999;">
                    <i class="el-icon-s-home"></i>
                    <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                    <i class="el-icon-right" style="font-size:10px;"></i>
                    <span style="font-size:10px;">分类页</span>
                  </span>
                </p>
                <div class="box-card">
                  <p class="suohang">所属行业:</p>
                  <div class="xiaoquyu">
                    <ul>
                      <li v-for="(item,index) in clslist" :key="index">
                        <a
                          href="javascript:;"
                          @click="fenleishu(index)"
                          :style="{'backgroundColor': (index===suo ? '#128bed':''), 'color': (index===suo ? '#fff':'')}"
                        >{{item}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </div>

            <!--公司简介列表-->
            <div class="block" ref="box">
              <!-- +++++ -->
              <span
                class="spanload"
                :style="{'height':(loading ? '800px':'')}"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <div class="jianjiewai" v-for="(item, index) in gonglistall" :key="index">
                  <el-card class="jianjie">
                    <div class="neibu">
                      <div class="neibuleft">
                        <p class="nameg">
                          <router-link
                            :to="{name:'detail',params:{detail:`${item.id}.html`}}"
                          >{{item.enterprise_name}}</router-link>
                        </p>
                        <p class="doup">
                          <span style="margin-right:30px;">
                            法定代表人：
                            <router-link
                              :to="{name:'detail',params:{detail:`${item.id}.html`}}"
                            >{{item.legal_representative}}</router-link>
                          </span>
                          <span style="margin-right:30px;">注册资本： {{item.register_fund}}</span>
                          <span>成立日期： {{item.establish_date}}</span>
                        </p>
                        <p class="doup">
                          <span style="margin-right:30px;">邮箱：{{item.email}}</span>
                          <span>电话：{{item.phone_num}}</span>
                        </p>
                        <p class="doup">地址：{{item.enterprise_address}}</p>
                      </div>
                      <div class="neiburight">
                        <div class="tiaozhang" v-if="item.manage_state === '暂无'">
                          <div style="color:#999;font-size:15px;margin-bottom:10px;">状态</div>
                          <div style="color:#409EFF;margin-bottom:10px;">
                            <i class="el-icon-caret-bottom"></i>
                          </div>
                          <div>
                            <el-tag size="medium">{{item.manage_state}}</el-tag>
                          </div>
                        </div>
                        <div
                          class="tiaozhang"
                          v-if="item.manage_state === '存续' || item.manage_state === '在业' || item.manage_state === '正常' || item.manage_state === '仍注册'|| item.manage_state === '核准设立'"
                        >
                          <div style="color:#999;font-size:15px;margin-bottom:10px;">状态</div>
                          <div style="color:#67C23A;margin-bottom:10px;">
                            <i class="el-icon-caret-bottom"></i>
                          </div>
                          <el-tag type="success" size="medium">{{item.manage_state}}</el-tag>
                        </div>
                        <div
                          class="tiaozhang"
                          v-if="item.manage_state === '注销'|| item.manage_state === '吊销'|| item.manage_state === '废止' ||item.manage_state === '迁出'||item.manage_state === '解散'||item.manage_state === '撤销' ||item.manage_state === '解散清算完结'"
                        >
                          <div style="color:#999;font-size:15px;margin-bottom:10px;">状态</div>
                          <div style="color:#F56C6C;margin-bottom:10px;">
                            <i class="el-icon-caret-bottom"></i>
                          </div>
                          <el-tag type="danger" size="medium">{{item.manage_state}}</el-tag>
                        </div>
                      </div>
                    </div>
                  </el-card>
                </div>
              </span>
              <div v-if="ishow">
                <el-pagination
                  class="pagesye"
                  background
                  layout="prev, pager, next"
                  :current-page="pagess"
                  :pager-count="11"
                  :total="total"
                  :disabled="isdisabled"
                  @current-change="handleCurrentChange"
                ></el-pagination>
              </div>
            </div>
          </div>
          <div class="sifyright"></div>
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
import headerl from '@/components/common/headerlan.vue'
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      timer: '',
      // 总条数
      total: 0,
      // 当前页码数
      pagess: 1,
      // 所属行业列表
      clslist: [
        '软件和信息技术服务业',
        '批发业',
        '商务服务业',
        '零售业',
        '房地产业 ',
        '餐饮业 ',
        '建筑装饰、装修和其他建筑业',
        '房屋建筑业',
        '科技推广和应用服务业 ',
        '农业',
        '研究和试验发展业',
        '专业技术服务业',
        '非金属矿物制品业',
        '土木工程建筑业',
        '道路运输业',
        '专用设备制造业',
        '化学原料和化学制品制造业',
        '电气机械和器材制造业',
        '通用设备制造业',
        '其他行业 '
      ],
      // 接受传递过来的参数id
      suo: '',
      // 该属行业的公司简介列表
      gonglistall: [],
      // 控制点击项的样式
      active: false,
      value1: '',
      // 控制是否可以点击
      isdisabled: false,
      ishow: true,
      // +++++++
      loading: false
    }
  },
  computed: {},
  // 实例创建之前
  created() {
    // 点击当时的索引进行数字转换
    this.suo = parseInt(this.$route.params.searchid.split('.')[0])
  },
  mounted() {
    // 把页码值取出来赋值给当前的页数
    // this.pagess = parseInt(window.sessionStorage.getItem('page'))
    // console.log(this.pagess)
    // // 页面刷新后就当前的url地址的参数//读取query参数
    // let idval = parseInt(this.$route.params.searchid.split('.')[0])
    // this.suo = idval
    // this.handleCurrentChange(this.pagess)
    this.firstlisyu()
    window.addEventListener('scroll', this.scrollToTop)
  },
  watch: {},
  methods: {
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this
      this.timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          window.clearInterval(that.timer)
        }
      }, 10)
    },
    // 为了计算距离顶部的高度
    scrollToTop() {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
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
    },
    // 点击所属分类的每一项就触发请求
    async fenleishu(val) {
      // // 清除会话存储的page值 避免再次进去所属分类后就再之前的页面
      // window.sessionStorage.removeItem('page')
      // 修改值
      this.suo = val
      // 替换当前的url地址的参数
      let newQuery = JSON.parse(JSON.stringify(this.$route.params))
      newQuery.searchid = `${val}.html`
      let routeParam = {
        params: newQuery
      }
      this.$router.push(routeParam)
      // 显示当前第一页数据
      this.pagess = 1
      // +++
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/category/', {
        params: { key: parseInt(val) + 1 }
      })
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取数据失败')
      // 把结果赋值给 gonglistall
      this.gonglistall = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      this.loading = false
    },
    // 每次改变当前页时触发请求
    async handleCurrentChange(val) {
      // 防止多次点击
      this.isDisable = true
      let dibshi = setTimeout(() => {
        this.isDisable = false
        clearTimeout(dibshi)
      }, 1000)
      this.backTop()
      // 临时存储！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      // 判断val页码值是否为1 如果是就 调用第一次请求
      // if (val.toString() === 'NaN') return this.firstlisyu()
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/category/', {
        params: { key: parseInt(this.suo) + 1, page: val }
      })
      // console.log(res)
      if (res.status !== 0) {
        return this.$message.error('获取数据失败')
      }
      // 把结果赋值给 gonglistall
      this.gonglistall = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      this.pagess = val
      // window.sessionStorage.setItem('page', this.pagess)
      this.loading = false
    },
    // 第一次请求
    async firstlisyu() {
      // console.log('111')
      // 显示当前第一页数据
      // this.pagess = 1
      // // 把页码值取出来赋值给当前的页数
      // this.pagess = parseInt(window.sessionStorage.getItem('page'))
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/category/', {
        params: { key: parseInt(this.suo) + 1 }
      })
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取数据失败')
      // 把结果赋值给 gonglistall
      this.gonglistall = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      this.loading = false
    }
  },
  beforeDestroy() {
    // 页面销毁的时候清除会话存储的page值 避免再次进去所属分类后就再之前的页面
    window.sessionStorage.removeItem('page')
    window.clearInterval(this.timer)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  components: {
    foTer,
    headerl
  }
}
</script>

<style lang="less" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
}
// 中部
.el-main {
  overflow-y: hidden !important;
  padding: 0 0;
  .fhdjksghfhdghf {
    display: flex;
    width: 70%;
    margin: 0 auto;
    justify-content: space-between;
    .sifyleft {
      width: 80%;
      .shangbual {
        width: 100%;
        height: 250px;
        .box-card {
          width: 900px;
          height: 100%;
          display: flex;
          .suohang {
            width: 10%;
            height: 100%;
            color: #999;
            padding-top: 18px;
            font-size: 14px;
          }
          .xiaoquyu {
            width: 90%;
            height: 100%;
            margin-top: 16px;
            ul {
              width: 100%;
              display: flex;
              justify-content: flex-start;
              flex-wrap: wrap;
              padding: 0;
              li {
                margin-right: 20px;
                margin-bottom: 40px;
                .pp1 {
                  background-color: #128bed;
                }
                .hh {
                  color: #fff;
                }
                a {
                  font-size: 14px;
                  display: block;
                  width: 100%;
                  color: #666666;
                }
                a:hover {
                  color: #fff;
                  background: #128bed;
                }
              }
            }
          }
        }
      }
      .block {
        .spanload {
          display: block;
          width: 100%;
        }
        .jianjiewai {
          margin-top: 10px;
          width: 100%;
          .jianjie {
            width: 100%;
            .neibu {
              width: 100%;
              display: flex;
              justify-content: space-between;
              .neibuleft {
                .nameg {
                  a {
                    color: #000;
                    font-weight: 900;
                    font-size: 20px;
                  }
                  a:hover {
                    color: #128bed;
                  }
                }
                .doup {
                  color: #999;
                  font-size: 14px;
                }
              }
              .neiburight {
                margin-top: 40px;
                .tiaozhang {
                  width: 60px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                }
              }
            }
          }
        }
        .jianjiewai:hover {
          box-shadow: 0 0 20px 10px #ccc !important;
        }
        .pagesye {
          width: 100%;
          margin: 50px 0;
          display: flex;
          justify-content: center;
        }
      }
    }
    .sifyright {
      width: 40%;
      height: 1000px;
    }
  }
}
</style>
