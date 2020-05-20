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
            </div>
            <div class="rightheader">
              <div class="rightheaderfirst">
                <!-- 应用 -->
                <el-popover
                  placement="bottom"
                  width="400"
                  trigger="hover"
                  popper-class
                  style="height:35px;line-height:35px;margin-right:20px;"
                >
                  <!-- 鼠标经过应用后出现 -->
                  <div style="width:400px;height:300px;background-color: #fff;border-radius:20px;">
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
              <div class="rightheaderlast" @click="quloginn">登录</div>
            </div>
          </div>
        </div>
      </el-header>
      <el-main>
        <div class="zhongjian">
          <div class="damianyoublack">
            <!-- 用户注册 -->
            <p class="zhuyo">找回密码</p>
            <div class="hdjshjd-one">
              <p v-html="content"></p>
              <el-input
                placeholder="请输入手机号码"
                maxlength="11"
                v-model="mobileforget"
                @blur="mobiles"
                @focus="mobileh"
                clearable
              ></el-input>
            </div>
            <!-- 错误提示符 -->
            <div class="cuocutishi">
              <p v-if="tishiforget" style="font-size:0.5px;text-align: end; color:red;">手机号格式有误</p>
            </div>
            <!-- 密码区域 -->
            <div class="passworddd">
              <p v-html="content1"></p>
              <el-input
                placeholder="请输入新密码"
                show-password
                minlength="6"
                v-model="forgetpassword"
                clearable
                @blur="phones"
                @focus="phoneh"
              ></el-input>
            </div>
            <div class="cuoumaam">
              <!-- 错误提示符 -->
              <p v-if="phonet" style="font-size:0.5px;text-align: end; color:red;">最少六位</p>
            </div>
            <!--确认新密码 -->
            <div class="passworddd">
              <p>确认密码</p>
              <el-input
                placeholder="确认新密码"
                show-password
                minlength="6"
                clearable
                v-model="forgetpsw"
                @blur="phonepsw"
              ></el-input>
            </div>
            <!--滑块验证 -->
            <drag-verify
              class="huakuai"
              ref="Verify"
              :width="380"
              :circle="false"
              progressBarBg="green"
              :height="50"
              text="请按住滑块拖动"
              successText="验证通过"
              handlerIcon="el-icon-d-arrow-right"
              successIcon="el-icon-circle-check"
            ></drag-verify>
            <!-- <jcRange status="status"></jcRange> -->
            <!-- 短信验证码 -->
            <!-- <div class="duanxin">
              <el-input
                placeholder="请输入短信验证码"
                clearable
                v-model="fgcodeden"
                class="input-with-select"
              >
                <el-button
                  :disabled="codegff"
                  slot="append"
                  :style="{color:codegff ? '#ccc':'#128BED'}"
                  @click="fggetCode"
                >
                  <span v-show="codeshow1">获取验证码</span>
                  <span v-show="!codeshow1" class="count">{{count}} s</span>
                </el-button>
              </el-input>
            </div>-->
            <!-- 注册按钮 -->
            <div class="szanniu">
              <el-button type="primary" class="zhuced" @click="phonequefg" :disabled="isDisable">确认</el-button>
            </div>
            <div class="fanhui" @click="funhuidenglu">返回登录</div>
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
      content: '手&ensp;机&ensp;号',
      content1: '新&ensp;密&ensp;码',
      // 手机号
      mobileforget: '',
      tishiforget: false,
      forgetpassword: '',
      phonet: false,
      forgetpsw: '',
      fgcodeden: '',
      // codegff: false,
      // 短信验证码的倒计时的功能
      codeshow1: true,
      count: '',
      codetimer: null,
      isDisable: false,
      // 接受功能数据
      signlist: [],
      newoathlist: ['dkjsq', 'jsq', 'huilv']
    }
  },
  computed: {},
  created() {
    this.getuserway()
  },
  mounted() {},
  watch: {},
  methods: {
    // 调用 功能名称接口
    async getuserway() {
      const { data: res } = await this.$http.get('souqi/admin/tools/add/')
      if (res.status !== 0) return this.$message.warning(res.msg)
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].newname = this.newoathlist
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
    // 点击立即登录先判断,然后是否发起请求
    async phonequefg() {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      // 手机前端校验方法
      this.mobiles()
      // 校验密码
      this.phones()
      // 确认密码校验
      this.phonepsw()
      // 滑块校验
      if (!this.$refs.Verify.isPassing) return this.$message.error('请将滑块滑到最右边')
      // 判断验证码
      // let reinputmi = /^[0-9]{6}$/
      // if (!reinputmi.test(this.fgcodeden)) return this.$message.error('验证码错误')
      // 发起手机号验证请求
      this.shoujiyanfg()
      const { data: res } = await this.$http.post('user/change/password/', {
        mobile: this.mobileforget,
        password: this.forgetpassword,
        confirm_password: this.forgetpsw
      })
      // console.log(res)
      if (res.status !== 0) {
        return this.$message({
          type: 'error',
          message: res.msg,
          duration: 1000
        })
      }
      this.$message.success('找回密码成功')
      this.$router.push({
        path: '/user_userden'
      })
    },
    // 点击获取激活码时候发起发送短信接口
    // jihuomafg() {
    //   this.$http.post('user/sms/', { mobile: this.mobileforget })
    //   // console.log(res)
    //   // console.log(res.status)
    // },
    // 点击获取激活码时候发起验证手机号是否合法
    async shoujiyanfg() {
      const { data: res } = await this.$http.post('user/mobile/', { mobile: this.mobileforget })
      // console.log(res)
      // console.log(res.status)
      if (res.status !== 2) {
        if (res.status === 0) {
          return this.$message({
            type: 'error',
            message: '该用户未注册',
            duration: 1000
          })
        } else {
          return this.$message({
            type: 'error',
            message: '手机号不合法',
            duration: 1000
          })
        }
      }
    },
    // 短信验证码的倒计时的功能
    // fggetCode() {
    //   // 手机前端校验方法
    //   this.mobiles()
    //   // 校验密码
    //   this.phones()
    //   // 确认密码校验
    //   this.phonepsw()
    //   // // 验证滑块的滑动滑动
    //   // if (!this.status) return this.$message.error('请将滑块滑到最右边')
    //   // 发起手机号验证请求
    //   this.shoujiyanfg()
    //   // 起发送短信接口
    //   this.jihuomafg()
    //   this.codegff = true
    //   const TIME_COUNT = 60
    //   // console.log(this.codetimer)
    //   if (!this.codetimer) {
    //     this.count = TIME_COUNT
    //     this.codeshow1 = false
    //     this.codetimer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.codegff = true
    //         this.count--
    //       } else {
    //         this.codegff = false
    //         this.codeshow1 = true
    //         clearInterval(this.codetimer)
    //         this.codetimer = null
    //       }
    //     }, 1000)
    //   }
    // },
    // 二次确认密码校验
    phonepsw() {
      if (this.forgetpsw !== this.forgetpassword) return this.$message.error('两次密码不一致')
    },
    // 密码校验失去焦点
    phones() {
      if (this.forgetpassword.length < 6) {
        return (this.phonet = true)
      }
    },
    // 密码校验获得焦点
    phoneh() {
      this.phonet = false
    },
    // 手机号失去焦点
    mobiles() {
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.mobileforget)) {
        return (this.tishiforget = true)
      } else {
        this.tishiforget = false
      }
    },
    // 手机号获取焦点
    mobileh() {
      this.tishiforget = false
    },
    gohome() {
      this.$router.push({
        path: '/'
      })
    },
    quloginn() {
      this.$router.push({
        path: '/user_userden'
      })
    },
    // 返回到登陆界面
    funhuidenglu() {
      this.$router.push({
        path: '/user_userden'
      })
    }
  },
  components: {
    dragVerify,
    // jcRange,
    foTer
  }
}
</script>

<style lang="less" scoped>
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
  .zhongjian {
    width: 20%;
    .damianyoublack {
      width: 100%;
      margin: 0 auto;
      .zhuyo {
        color: #999;
        font-size: 20px;
        width: 100%;
        text-align: center;
        margin: 0 auto;
        margin-top: 150px;
      }
      .hdjshjd-one {
        width: 100%;
        margin: 0 auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          width: 20%;
          // text-align: center;
          font-size: 18px;
          border-right: 1px solid #ccc;
        }
        .el-input {
          width: 75%;
        }
      }
      .cuoumaam,
      .cuocutishi {
        width: 100%;
        margin: 0 auto;
      }
      .huakuai {
        width: 100% !important;
        margin: 0 auto;
        margin-top: 18px !important;
      }
      .szanniu {
        width: 100%;
        margin: 0 auto;
        margin-top: 20px;
      }
      .passworddd {
        width: 100%;
        margin: 0 auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p {
          width: 20%;
          // text-align: center;
          font-size: 18px;
          border-right: 1px solid #ccc;
        }
        .el-input {
          width: 75%;
        }
      }
      // .xieyi {
      //   width: 100%;
      //   margin: 0 auto;
      //   margin-top: 10px;
      // }
      .zhuced {
        width: 100%;
      }
      .fanhui {
        width: 100%;
        margin: 0 auto;
        margin-top: 10px;
        cursor: pointer;
        color: #128bed;
      }
    }
  }
}
</style>
