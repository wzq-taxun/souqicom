<template>
  <div>
    <!-- pc端代码 -->
    <el-container v-if="showxiang">
      <el-header style="none">
        <div class="blocksdjks">
          <div class="shangheader">
            <div class="leftheader">
              <h1 class="leftheaderfirst">
                <router-link style="display:block; width: 100%;height:100%" to="/">
                  <img src="../../assets/image/logotou.png" alt />
                </router-link>
              </h1>
            </div>
            <!-- 中部输入框 -->
            <div class="zhongbushu">
              <el-input
                placeholder="请输入企业名称"
                v-model.trim="inputc"
                max
                @keyup.enter.native="claser"
                :disabled="isDis"
              ></el-input>
              <el-button type="warning" :disabled="isDis" @click="claser">搜索</el-button>
            </div>
            <div class="rightheader">
              <div class="rightheaderfirst">
                <!-- 应用 -->
                <el-popover
                  placement="bottom"
                  width="400"
                  trigger="hover"
                  popper-class
                  style="height:35px;line-height:35px;"
                >
                  <!-- 鼠标经过应用后出现 -->
                  <div style="width:400px;height:300px;background-color: #fff;border-radius: 20px;">
                    <div class="common-use" style=" width: 100%;">
                      <p>
                        <el-divider>
                          <i style="color: #008bfe;" class="el-icon-s-platform" />
                          <span style="font-weight: bold;font-size:14px;">快捷服务</span>
                        </el-divider>
                      </p>
                      <ul
                        style="padding: 0; margin: 0;width: 100%;display: flex;justify-content: flex-start; flex-wrap: wrap;"
                      >
                        <li
                          onmouseover="this.style.color='#008bfe'"
                          onmouseout="this.style.color='#333'"
                          style="cursor: pointer;padding: 0;width: 33.33%;margin-bottom: 15px;display: flex;flex-direction: column;align-items: center;justify-content: space-around;"
                          @click="gointerest(item, index)"
                          v-for="(item, index) in signlist"
                          :key="index"
                        >
                          <p style=" margin: 5px 0;padding: 0;font-size:13px;">
                            <i
                              style="color: #008bfe;font-size:25px;"
                              class="iconfont"
                              :class="item.tool_taxon"
                            ></i>
                          </p>
                          <p style="margin:0;">{{item.tools_name}}</p>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <span slot="reference">
                    应用
                    <i class="el-icon-caret-bottom el-icon--right"></i>
                    <!-- <i style="color: #008bfe;" class="el-icon-s-platform" /> -->
                  </span>
                </el-popover>
                <div class="commst" v-for="(item, index) in shangshiall" :key="index">
                  <router-link
                    :to="{name:'ciseasonshi',params:{ciseasonid:`${index}.html`}}"
                  >{{item}}</router-link>
                </div>
              </div>
              <div class="rightheaderlast" @click="claseden" v-show="isshow">登录 | 注册</div>
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
                          :src="imginfossou"
                          alt
                        />
                      </span>
                      <!-- 用户名 -->
                      <span style="display:block;width:68%;color:#fff">{{infosersou}}</span>
                      <span style="display:block;color:#fff">
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
        <div class="fhdjksghfhdghf">
          <!-- 头部 -->
          <div class="sifyleft">
            <div class="shangbualwai">
              <el-card class="shangbual">
                <p style="margin:0px">
                  <span style="font-size:20px;color:#999;">
                    <i class="el-icon-s-home"></i>
                    <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                    <i class="el-icon-right" style="font-size:10px;"></i>
                    <span style="font-size:10px;">搜索页</span>
                  </span>
                </p>
                <p>
                  <span style="color:#666;">
                    搜企为您搜索:
                    <span style="color:#128BED">{{shouinput}}</span>，
                    如下所示
                  </span>
                </p>
              </el-card>
            </div>

            <!--公司简介列表-->
            <div v-if="!shifhdi" class="boxs">暂无该公司</div>
            <div class="block" v-if="shifhdi">
              <span
                class="loadinjia"
                :style="{'height':(loading ? '800px':'')}"
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <div class="jianjiewai" v-for="(item, index) in gonglist" :key="index">
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
    <!-- 移动端代码 -->
    <div v-if="!showxiang" class="mobsearch">
      <p class="mobnumber">
        <i class="el-icon-mouse"></i>搜索
        <span style="color:red">{{shouinput}}</span>,结果如下:
      </p>
      <div v-if="!shifhdi" class="mobboxs">暂无该公司</div>
      <ul v-if="shifhdi">
        <li v-for="(item, index) in gonglist" :key="index">
          <router-link :to="{name:'detail',params:{detail:`${item.id}.html`}}">
            <div class="mobleftdetail">
              <p>
                <span
                  v-html="getmabnameen(item.enterprise_name)"
                >{{getmabnameen(item.enterprise_name)}}</span>
                <el-tag class="mobeltal">{{item.manage_state}}</el-tag>
              </p>
              <p
                class="mobdeta"
                v-show="!(item.legal_representative===''&&item.establish_date==='')"
              >{{getmoblength(item.legal_representative)}} | {{item.establish_date}}</p>
              <p
                class="mobdeta"
                v-show="item.legal_representative===''&&item.establish_date===''"
              >-- | --</p>
            </div>
            <div class="mobtidhi">
              <i class="el-icon-arrow-right"></i>
            </div>
          </router-link>
        </li>
      </ul>
      <el-pagination
        v-if="shifhdi"
        class="mobpagesye"
        background
        layout="prev, pager, next"
        :current-page="pagess"
        :pager-count="5"
        :total="total"
        small
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      timer: null,
      // 控制pc端还是移动端----------------------------------------------------
      showxiang: true,
      // 公司名字
      shangshiall: ['上市', '港股', '新三板'],
      // 是否显示
      shifhdi: true,
      // 保存用户名昵称
      infosersou: '',
      // 保存用户名图片
      imginfossou: '',
      // 保存图片的根路径
      imgpsou: 'http://47.240.250.145:8000/media/',
      inputc: '',
      gonglist: [],
      // 首页搜索所传过来的值
      shouinput: '',
      total: 0,
      pagesize: 10,
      pagess: 1,
      oldtoken: '',
      isshow: false,
      isDis: false,
      loading: false,
      // 接受功能数据
      signlist: [],
      newoathlist: ['dkjsq', 'jsq', 'huilv']
    }
  },
  computed: {},
  created() {
    this.getuserway()
    // 页面刷新后获取之前的页码数
    // 把页码值取出来赋值给当前的页数
    // this.pagess = parseInt(window.sessionStorage.getItem('pag'))
    // 获取首页搜索所传过来的值
    this.shouinput = this.$route.params.search1.split('.')[0]
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    this.yantoken1()
    // 发起搜索的请求
    this.fashousuo()
    // 可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w < 1025) {
      this.showxiang = false
    }
  },
  watch: {},
  methods: {
    // 调用 功能名称接口
    async getuserway() {
      const { data: res } = await this.$http.get('souqi/admin/tools/add/home/')
      if (res.status !== 0) return this.$message.warning(res.msg)
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].newname = this.newoathlist
        // res.results[i].icon = this.iconlist
      }
      this.signlist = res.results
    },
    // 去各自的功能页面
    gointerest(val, index) {
      let compath = `${val.id}.html`
      const { href } = this.$router.resolve({
        name: val.newname[index],
        params: { commonpathid: compath }
      })
      window.open(href, '_blank')
    },
    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this
      that.timer = setInterval(() => {
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
    getmabnameen(val) {
      // console.log(val.replace(/小米/g, `<span style="color:red">${this.shouinput}</span>`))
      return val.replace(this.shouinput, `<span style="color:red">${this.shouinput}</span>`)
    },
    getmoblength(value) {
      if (value.length > 4) return value.substring(0, 2)
      return value
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
    //   // 退出登录功能
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
    // 点击搜索触发
    async claser() {
      // 防止多次点击
      this.isDis = true
      setTimeout(() => {
        this.isDis = false
      }, 1000)
      // 判断输入框是否为空 空就中止
      if (this.inputc === '' || this.inputc === '公司' || this.inputc === '有限公司') {
        return this.$notify({
          title: '温馨提示',
          message: '搜索范围过大或内容不能为空',
          type: 'warning',
          duration: 1000,
          offset: 50,
          showClose: false
        })
      }
      // 替换当前的url地址的参数//读取query参数
      let newQuery = JSON.parse(JSON.stringify(this.$route.params))
      newQuery.search1 = `${this.inputc}.html`
      let routeParam = {
        params: newQuery
      }
      this.$router.push(routeParam)
      this.backTop()
      // 显示当前第一页数据
      this.pagess = 1
      this.openloding()
      // 发搜索请求
      const { data: res } = await this.$http.get('enterprise/search/', {
        params: { key: this.inputc }
      })
      // console.log(res)
      // 判断
      if (res.status !== 0) {
        this.shifhdi = false
        return this.$message.error('未发现该公司')
      }
      this.shifhdi = true
      // 将在本页面搜素的值 赋值给shouinput进项渲染
      this.shouinput = this.inputc
      // 赋值给数组进行遍历
      this.gonglist = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      // 加载效果终止
      this.loading = false
    },
    async yantoken1() {
      this.oldtoken = window.localStorage.getItem('token')
      if (!this.oldtoken) return (this.isshow = true)
      const { data: res } = await this.$http.post('user/verify/token/', { token: this.oldtoken })
      // console.log(res)
      if (res.token !== this.oldtoken) return (this.isshow = true)
      // 获取用户的图像
      this.imginfossou = this.imgpsou + window.localStorage.getItem('userimg')
      // 获取用户的昵称
      this.infosersou = window.localStorage.getItem('username')
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
    // 跳转登录注册页面
    claseden() {
      this.$router.push({
        path: '/user_userden'
      })
    },
    // 页码改变后
    async handleCurrentChange(val) {
      this.backTop()
      this.pagess = val
      // window.sessionStorage.setItem('pag', this.pagess)
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/search/', {
        params: { key: this.shouinput, page: val }
      })
      // console.log(res)
      if (res.status !== 0) {
        // this.$refs.box.style.height = '800px'
        return this.$message.error('获取数据失败')
      }
      // 把结果赋值给 gonglistall
      this.gonglist = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      // 加载效果终止
      this.loading = false
    },
    // 发起搜索的请求
    async fashousuo() {
      this.backTop()
      this.openloding()
      const { data: res } = await this.$http.get('enterprise/search/', {
        params: { key: this.shouinput }
      })
      // console.log(res)
      // 判断
      if (res.status !== 0) {
        this.shifhdi = false
        return this.$message.error('未发现该公司')
      }
      this.shifhdi = true
      // 赋值给数组进行遍历
      this.gonglist = res.results.data
      let strr = res.results.contacts.split(' ')[res.results.contacts.split(' ').length - 1]
      this.total = parseInt(strr.substring(0, strr.length - 1)) * 10
      // 加载效果终止
      this.loading = false
    }
  },
  beforeDestroy() {
    // 页面销毁的时候清除会话存储的pag值 避免再次进后就再之前的页面
    // window.sessionStorage.removeItem('pag')
    // console.log('销毁组件'）
    // this.finalCart()
    window.clearInterval(this.timer)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  },
  components: {
    foTer
  }
}
</script>

<style lang="less" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
  .blocksdjks {
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
          line-height: 58px;
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
            span {
              display: block;
              height: 100%;
              height: 100%;
              color: #fff;
              cursor: pointer;
            }
            a {
              color: #fff;
            }
            span:hover,
            a:hover {
              color: #ffa500;
            }
          }
          .el-popover__reference {
            display: block;
            color: #fff;
            width: 70px !important;
          }
          .el-popover__reference:hover {
            color: #ffa500;
            cursor: pointer;
          }
        }
        .rightheaderlast {
          width: 15%;
          height: 40px;
          line-height: 40px;
          text-align: center;
          font-size: 15px;
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
// 中部
.el-main {
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
        padding: 0;
      }
      .block {
        // (+++++++)
        .loadinjia {
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
      .boxs {
        height: 700px;
        background: #ccc;
        text-align: center;
        line-height: 700px;
      }
    }
    .sifyright {
      height: 1000px;
      width: 40%;
    }
  }
}
// 鼠标滑过出现下拉框
.zhanshiyu {
  // z-index: 1000;
  position: fixed;
  top: 58px;
  right: 550px;
  width: 400px;
  height: 500px;
  background-color: #fff;
  border-radius: 10px;
  .common-use {
    width: 100%;
    i {
      color: #008bfe;
    }
    ul {
      padding: 0 20px;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        cursor: pointer;
        padding: 0;
        width: 33.33%;
        margin-bottom: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        p {
          margin: 5px 0;
          padding: 0;
          font-size: 13px;
          i {
            font-size: 30px;
          }
        }
      }
      li:hover {
        color: #008bfe;
      }
    }
  }
}
// 移动端代码
.mobsearch {
  width: 100%;
  .mobnumber {
    width: 100%;
    position: fixed;
    top: 0;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
    margin: 0 auto;
    font-size: 15px;
    background-color: #f2f3f5;
  }
  .mobboxs {
    height: 400px;
    background: #ccc;
    text-align: center;
    line-height: 400px;
    width: 95%;
    margin: 30px auto;
  }
  ul {
    width: 95%;
    margin: 50px auto;
    padding: 0;
    // background-color: pink;
    li {
      width: 100%;
      margin-bottom: 20px;
      a {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #333;
        .mobleftdetail {
          display: flex;
          flex-direction: column;
          justify-content: center;
          font-size: 15px;
          .mobeltal {
            height: 20px !important;
            line-height: 20px;
          }
          .mobdeta {
            color: #999;
            margin: 0;
          }
        }
        .mobtidhi {
          font-size: 25px;
        }
      }
    }
  }
  // .mobpagesye {
  //   margin-left:50px;
  // }
}
</style>
