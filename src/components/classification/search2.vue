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
                      <li v-for="(value, name, index)  in areclslist" :key="index">
                        <a
                          href="javascript:;"
                          @click="arefenshu(name)"
                          :style="{'backgroundColor': (name===chuazhi ? '#128bed':''), 'color': (name===chuazhi ? '#fff':'')}"
                        >{{value}}</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </el-card>
            </div>

            <!--公司简介列表-->
            <div class="block" ref="box">
              <!-- +++ -->
              <span
                class="spanload"
                :style="{'height':(loading ? '800px':'')}"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <div class="jianjiewai" v-for="(item, index) in arelistall" :key="index">
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
      timer: null,
      // 接受首页传过来的参数
      chuazhi: '',
      areclslist: {
        h_b: '湖北',
        g_d: '广东',
        b_j: '北京',
        z_j: '浙江',
        j_s: '江苏',
        s_d: '山东',
        f_j: '福建',
        s_h: '上海',
        s_c: '四川',
        he_b: '河北',
        t_j: '天津',
        a_h: '安徽',
        he_n: '河南',
        g_z: '贵州',
        s_x: '山西',
        l_n: '辽宁',
        j_x: '江西',
        sh_x: '陕西',
        g_x: '广西',
        hu_n: '湖南',
        h_l_j: '黑龙江',
        y_n: '云南',
        hai_n: '海南',
        t_w: '台湾',
        n_m_g: '内蒙古',
        x_j: '新疆',
        g_s: '甘肃',
        j_l: '吉林',
        x_g: '香港',
        n_x: '宁夏',
        q_h: '青海',
        x_z: '西藏'
      },
      arelistall: [],
      pagess: 1,
      total: 1000,
      isdisabled: false,
      // (+++++)
      loading: false
    }
  },
  computed: {},
  created() {
    // console.log(this.$route.query.key)
    // 接收参数
    this.chuazhi = this.$route.params.search2.split('.')[0]
  },
  mounted() {
    // 把页码值取出来赋值给当前的页数
    this.pagess = parseInt(window.sessionStorage.getItem('page'))
    // // 页面刷新后就当前的url地址的参数//读取query参数
    let idval = this.$route.params.search2.split('.')[0]
    this.chuazhi = idval
    // 页面加载就开始请求调用
    this.handleCurrentChange(this.pagess)
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
    async arefenshu(val) {
      // 修改值
      this.chuazhi = val
      // 替换当前的url地址的参数//读取query参数
      let newQuery = JSON.parse(JSON.stringify(this.$route.params))
      newQuery.search2 = `${val}.html`
      let routeParam = {
        params: newQuery
      }
      this.$router.push(routeParam)
      // 显示当前第一页数据
      this.pagess = 1
      // (++++++++)
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/location/', {
        params: { key: this.chuazhi }
      })
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取数据失败')
      // 把结果赋值给 gonglistall
      this.arelistall = res.results
      // (++++)
      this.loading = false
    },
    // 每次改变当前页时触发请求
    async handleCurrentChange(val) {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      this.backTop()
      // window.localStorage.getItem('token')
      // if (val > 5) {
      //   // 验证token值
      //   this.yantoken()
      // }
      // 临时存储！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
      this.pagess = val
      window.sessionStorage.setItem('page', this.pagess)
      // window.sessionStorage.setItem('page', 'this.pagess')
      // (++++++++)
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/location/', {
        params: { key: this.chuazhi, page: val }
      })
      // console.log(res)
      if (res.status !== 0) {
        // this.$refs.box.style.height = '800px'
        return this.$message.error('获取数据失败')
      }
      // 把结果赋值给 gonglistall
      this.arelistall = res.results
      // (++++)
      this.loading = false
    },
    // 去登录注册
    serlogo() {
      this.$router.push({
        path: '/user_userden'
      })
    }
  },
  beforeDestroy() {
    // 页面销毁的时候清除会话存储的page值 避免再次进去所属分类后就再之前的页面
    window.sessionStorage.removeItem('page')
    // console.log('销毁组件'）
    // this.finalCart()
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
        .box-card {
          width: 900px;
          display: flex;
          padding: 0;
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
        // (+++++++)
        .spanload {
          display: block;
          width: 100%;
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
