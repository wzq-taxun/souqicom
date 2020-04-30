<template>
  <div>
    <el-container>
      <el-header style="none">
        <div class="bfhdhneibu">
          <div class="shangheader">
            <div class="leftheader">
              <h1 class="leftheaderfirst" @click="gohome">
                <router-link style="display:block; width: 100%;height:100%" to="/">
                  <img src="../../assets/image/logotou.png" alt />
                </router-link>
              </h1>
              <!-- <div class="leftheaderlast"></div> -->
            </div>
            <div class="rightheader">
              <div class="rightheaderfirst">
                <div class="commst" v-for="(item, index) in shangshiall" :key="index">
                  <router-link
                    :to="{name:'ciseasonshi',params:{ciseasonid:`${index}.html`}}"
                  >{{item}}</router-link>
                </div>
              </div>
              <div class="rightheaderlast" @click="quzhuce">免费注册</div>
              <!-- <el-button type="primary">登录 | 注册</el-button> -->
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="damainzuo">
          <div>
            <img src="../../assets/image/biao.png" alt />
          </div>
          <p></p>
        </div>
        <!-- 登录模块 -->
        <div class="damianyou">
          <div class="jsdsjdiasqaq">
            <!-- 推荐这种写法-->
            <ul class="tab-tit">
              <li
                class="elmenli"
                v-html="title"
                v-for="(title,index) in tabTitle"
                :key="title"
                @click="qiehuanahijian(index)"
                :class="{active:cur==index}"
              >{{title}}</li>
            </ul>
            <div class="tab-content">
              <!-- <div v-show="cur==0" class="hdjshjd"> -->
              <!-- <div class="hdjshjd-one">
                  <p>手机号</p>
                  <el-input
                    placeholder="请输入手机号"
                    v-model="mobilehao"
                    maxlength="11"
                    clearable
                    @focus="mobilehuoqu"
                  ></el-input>
              </div>-->
              <!-- 错误提示符 -->
              <!-- <p
                  v-if="mobiletishiinput"
                  style="font-size:0.5px;text-align: end; color:red;"
              >手机号格式错误</p>-->
              <!--滑块验证 -->
              <!-- <jcRange status="status"></jcRange> -->
              <!-- 短信验证码 -->
              <!-- <div class="duanxin">
                  <el-input
                    placeholder="请输入短信验证码"
                    clearable
                    v-model="yancodeden"
                    class="input-with-select"
                  >
                    <el-button
                      :disabled="codeshifoujinzhi"
                      slot="append"
                      :style="{color:codeshifoujinzhi ? '#ccc':'#128BED'}"
                      @click="yangetCode"
                    >
                      <span v-show="codeshow1">获取验证码</span>
                      <span v-show="!codeshow1" class="count">{{count}} s</span>
                    </el-button>
                  </el-input>
              </div>-->
              <!-- 登录注册按钮 -->
              <!-- <el-button
                  type="primary"
                  class="szanniu"
                  @click="mobiledengludao"
                  :disabled="isDisable"
              >立即登录</el-button>-->
              <!-- 免费注册 -->
              <!-- <p class="mianhdfgy">
                  <span @click="quzhuce">账号注册</span>
                  <span @click="forgetmim">忘记密码？</span>
              </p>-->
              <!-- </div> -->
              <div v-show="cur==0" class="hdjshjd">
                <div class="hdjshjd-one">
                  <p>用户名</p>
                  <el-input
                    placeholder="请输入手机号码"
                    maxlength="11"
                    v-model="mobileuser1"
                    @focus="mobilehuode1"
                    clearable
                  ></el-input>
                </div>
                <!-- 错误提示符 -->
                <p v-if="mobiletishi" style="font-size:0.5px;text-align: end; color:red;">手机号格式有误</p>
                <!-- 密码 -->
                <div class="hdjshjd-one">
                  <p class="wrapper" v-html="content"></p>
                  <el-input
                    placeholder="请输入密码"
                    show-password
                    minlength="6"
                    v-model="phonepassword"
                    clearable
                    @focus="phonehuodemi"
                  ></el-input>
                </div>
                <!-- 错误提示符 -->
                <p v-if="phonetishimima" style="font-size:0.5px;text-align: end; color:red;">密码最少六位</p>
                <!--滑块验证 -->
                <drag-verify
                  class="huakuai"
                  ref="Verify"
                  :circle="false"
                  progressBarBg="green"
                  :height="50"
                  :width="400"
                  text="请按住滑块拖动"
                  successText="验证通过"
                  handlerIcon="el-icon-d-arrow-right"
                  successIcon="el-icon-circle-check"
                ></drag-verify>
                <!-- <jcRange status="status"></jcRange> -->
                <!-- 登录注册按钮 -->
                <el-button
                  type="primary"
                  class="szanniu"
                  @click="phonedenglucheng"
                  :disabled="isDisable"
                >立即登录</el-button>
                <!-- 免费注册 -->
                <p class="mianhdfgy">
                  <span @click="quzhuce">账号注册</span>
                  <span @click="forgetmim">忘记密码？</span>
                </p>
              </div>
            </div>
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
// import jcRange from '@/components/mokuai/JcRange.vue'
import dragVerify from 'vue-drag-verify'
export default {
  props: {},
  data() {
    return {
      // 公司名字
      shangshiall: ['上市', '港股', '新三板'],
      content: '密&nbsp;&nbsp;&nbsp;码',
      status: true,
      tabTitle: ['登&#12288;&#12288;录'],
      cur: 0,
      // 手机号
      mobilehao: '',
      // 手机号显隐性
      mobiletishiinput: false,
      // 控制验证码
      // 短信验证码的倒计时的功能
      codeshow1: true,
      count: '',
      codetimer: null,
      codeshifoujinzhi: false,
      // 验证码
      yancodeden: '',
      mobileuser1: '',
      mobiletishi: false,
      phonepassword: '',
      phonetishimima: false,
      isDisable: false
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 切换table事件
    qiehuanahijian(val) {
      this.cur = val
      this.mobilehao = ''
      this.mobileuser1 = ''
      this.phonepassword = ''
      this.yancodeden = ''
      this.mobiletishiinput = false
      this.mobiletishi = false
      this.phonetishimima = false
      // this.mobilehuoqu()
      // this.mobilehuode1()
      // this.phonehuodemi()
    },
    // 点击立即登录先判断,然后是否发起请求
    async phonedenglucheng() {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      // console.log('pamdj')
      // 前端校验手机号用户名
      this.mobileshiqu1()
      // 前端校验密码
      this.phoneshiqumi()
      // 滑块校验
      // 判断滑块
      // console.log(this.$refs.Verify.isPassing)
      if (!this.$refs.Verify.isPassing) return this.$message.error('请将滑块滑到最右边')
      // console.log(this.$refs.Verify.isPassing)
      const { data: res } = await this.$http.post('user/login/', {
        username: this.mobileuser1,
        password: this.phonepassword
      })
      // console.log(res)
      if (res.status !== 0) {
        return this.$message({
          type: 'error',
          message: res.msg,
          duration: 1000
        })
      }
      // console.log(res.results)
      window.localStorage.setItem('token', res.results.token)
      window.localStorage.setItem('username', res.results.username)
      window.localStorage.setItem('userimg', res.results.avatar)
      // 用来保存手机号的
      window.localStorage.setItem('userphone', res.results.mobile)
      // pk值保存
      window.localStorage.setItem('pk', res.results.pk)
      this.$router.push({
        path: '/'
      })
    },
    // 点击登陆发送请求
    // async mobiledengludao() {
    //   this.isDisable = true
    //   setTimeout(() => {
    //     this.isDisable = false
    //   }, 1000)
    //   // console.log('111')
    //   // // 验证用户名手机号调用
    //   let myreg = /^1[3-9][0-9]{9}$/
    //   if (!myreg.test(this.mobilehao)) {
    //     return (this.mobiletishiinput = true)
    //   } else {
    //     this.mobiletishiinput = false
    //   }
    //   // 发起手机号验证请求
    //   this.shoujiyan()
    //   // 验证滑块是否滑倒右侧
    //   // if (!this.status1) return this.$message.error('请将滑块滑到最右边')
    //   // 判断验证码
    //   // let reinputmi = /^[0-9]{6}$/
    //   // if (!reinputmi.test(this.yancodeden)) {
    //   //   return this.$message({
    //   //     type: 'error',
    //   //     message: '验证码错误',
    //   //     duration: 1000
    //   //   })
    //   // }
    //   // console.log(this.code)
    //   const { data: res } = await this.$http.post('user/login/mobile/', { mobile: this.mobilehao, code: this.yancodeden })
    //   // console.log(res)
    //   // 利用cookies保存token值
    //   // this.$cookies.set('token', res.results.token, '2d')
    //   // this.userinfo = res.user
    //   // 1. 将登录成功之后的 token，保存到客户端的 sessionStorage 中
    //   //   1.1 项目中出了登录之外的其他API接口，必须在登录之后才能访问
    //   //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
    //   window.localStorage.setItem('token', res.token)
    //   window.localStorage.setItem('username', res.user.username)
    //   window.localStorage.setItem('userimg', res.user.avatar)
    //   // 用来保存手机号的
    //   window.localStorage.setItem('userphone', res.results.mobile)
    //   // pk值保存
    //   window.localStorage.setItem('pk', res.results.pk)
    //   // 刷新页面
    //   this.$router.push({
    //     path: '/'
    //   })
    // },
    // 点击获取激活码时候发起发送短信接口
    // jihuoma() {
    //   this.$http.post('user/sms/', { mobile: this.mobilehao })
    //   // console.log(res)
    //   // console.log(res.status)
    // },
    // 点击获取激活码时候发起验证手机号是否合法
    async shoujiyan() {
      const { data: res } = await this.$http.post('user/mobile/', { mobile: this.mobilehao })
      // console.log(res)
      // console.log(res.status)
      if (res.status !== 2) {
        if (res.status === 0) {
          return this.$message.error('该用户未注册')
        } else {
          return this.$message.error('手机号不合法')
        }
      }
    },
    // 短信验证码的倒计时的功能
    // yangetCode() {
    //   // 手机前端校验方法
    //   this.mobileshiqu()
    //   // 验证滑块的滑动滑动
    //   // if (!this.status) return this.$message.error('请将滑块滑到最右边')
    //   // 发起手机号验证请求
    //   this.shoujiyan()
    //   // 起发送短信接口
    //   // this.jihuoma()
    //   const TIME_COUNT = 60
    //   // console.log(this.codetimer)
    //   if (!this.codetimer) {
    //     this.count = TIME_COUNT
    //     this.codeshow1 = false
    //     this.codetimer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.codeshifoujinzhi = true
    //         this.count--
    //       } else {
    //         this.codeshifoujinzhi = false
    //         this.codeshow1 = true
    //         clearInterval(this.codetimer)
    //         this.codetimer = null
    //       }
    //     }, 1000)
    //   }
    // },
    // 手机号失去焦点
    mobileshiqu() {
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.mobilehao)) {
        return (this.mobiletishiinput = true)
      } else {
        this.mobiletishiinput = false
      }
    },
    mobileshiqu1() {
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.mobileuser1)) {
        return (this.mobiletishi = true)
      } else {
        this.mobiletishi = false
      }
    },
    // 手机号获取焦点
    mobilehuoqu() {
      this.mobiletishiinput = false
    },
    mobilehuode1() {
      this.mobiletishi = false
    },
    // 密码校验失去获得焦点
    phoneshiqumi() {
      if (this.phonepassword.length < 6) {
        return (this.phonetishimima = true)
      }
    },
    phonehuodemi() {
      this.phonetishimima = false
    },
    quzhuce() {
      this.$router.push({
        path: '/user_register'
      })
    },
    gohome() {
      this.$router.push({
        path: '/'
      })
    },
    forgetmim() {
      this.$router.push({
        path: '/user_forgetmi'
      })
    }
  },
  components: {
    // jcRange,
    dragVerify,
    foTer
  }
}
</script>
<style lang="less" scoped>
.elmenli {
  border-bottom: none !important;
}
.el-container {
  height: 100%;
}
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
  .bfhdhneibu {
    background-color: #008bfe;
    height: 100%;
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
      .rightheader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 600px;
        height: 40px;
        .rightheaderfirst {
          width: 80%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          .commst {
            width: 78px;
            height: 40px;
            font-size: 15px;
            line-height: 40px;
            margin-left: 10px;
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
        }
      }
    }
  }
}
.el-main {
  width: 100%;
  height: 850px;
  // background-color: pink;
  display: flex;
  justify-content: center;
  padding: 0px;
  overflow: none;
  .damainzuo {
    width: 30%;
    // height: 100%;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .damianyou {
    width: 30%;
    // height: 100%;
    margin-top: 180px;
    .jsdsjdiasqaq {
      width: 70%;
      margin: 0 auto;
      .tab-tit {
        padding: 0;
        display: flex;
        justify-content: space-around;
        align-items: center;
        li {
          // width: 30%;
          height: 40px;
          font-size: 20px;
          text-align: center;
          color: #999999;
        }
        .active {
          border-bottom: 1px solid #128bed;
          color: #128bed;
        }
      }
      .tab-content {
        margin-top: 30px;
        width: 100%;
        .hdjshjd {
          width: 100%;
          height: 100%;
          .hdjshjd-one {
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .wrapper {
              white-space: pre-wrap;
            }
            p {
              width: 20%;
              text-align: center;
              font-size: 18px;
              border-right: 1px solid #ccc;
            }
            .el-input {
              width: 75%;
            }
          }
          .huakuai {
            // width: 80% !important;
            margin: 0 auto;
            margin-top: 18px !important;
          }
          .duanxin {
            margin-top: 20px;
          }
          .szanniu {
            width: 100%;
            margin-top: 30px;
            font-size: 20px;
          }
          .mimaquyu {
            margin-top: 20px;
          }
          .mianhdfgy {
            span {
              cursor: pointer;
            }
            span:first-child {
              margin-right: 8px;
              color: #128bed;
            }
          }
        }
      }
    }
  }
}
.el-footer {
  height: 100%;
}
</style>
