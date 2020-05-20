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
              <div class="rightheaderlast" @click="funhuidenglu">登录</div>
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
          <div class="damianyoublack">
            <!-- 用户注册 -->
            <p class="zhuyo">用户注册</p>
            <div class="hdjshjd-one">
              <p>用户名</p>
              <el-input
                placeholder="请输入手机号码"
                maxlength="11"
                clearable
                v-model="reinput"
                @blur="reshiqu"
                @focus="rehuode"
              ></el-input>
            </div>
            <!-- 错误提示符 -->
            <p
              v-if="retishi"
              style="font-size:0.5px;text-align: end;padding-right:54px; color:red;"
            >手机号格式有误</p>
            <!-- 密码区域 -->
            <div class="passworddd">
              <p class="wrapper" v-html="content"></p>
              <el-input
                placeholder="请输入密码"
                minlength="6"
                clearable
                show-password
                v-model="reinputmima"
                @blur="reshiqumi"
                @focus="rehuodemi"
              ></el-input>
            </div>
            <!-- 密码错误提示符 -->
            <p
              v-if="retishimima"
              style="font-size:0.5px;text-align: end;padding-right:54px; color:red;"
            >密码最少六位</p>
            <!--滑块验证 -->
            <drag-verify
              class="huakuai"
              ref="Verify"
              :circle="false"
              progressBarBg="green"
              :height="50"
              :width="410"
              text="请按住滑块拖动"
              successText="验证通过"
              handlerIcon="el-icon-d-arrow-right"
              successIcon="el-icon-circle-check"
            ></drag-verify>
            <!-- <jcRange  status="status3"></jcRange> -->
            <!-- 短信验证码 -->
            <!-- <div class="duanxin">
              <el-input
                placeholder="请输入短信验证码"
                class="input-with-select"
                maxlength="6"
                v-model="codekuang"
              >
                <el-button
                  slot="append"
                  :disabled="shifoujinzhi"
                  :style="{color:shifoujinzhi ? '#ccc':'#128BED'}"
                  @click="getCode"
                >
                  <span v-show="show1">获取验证码</span>
                  <span v-show="!show1" class="count">{{count}} s</span>
                </el-button>
              </el-input>
            </div>-->
            <!-- 搜企的协议 -->
            <div class="xieyi">
              <el-checkbox v-model="checked">我已经仔细阅读并接受《搜企用户协议》</el-checkbox>
            </div>
            <!-- 注册按钮 -->
            <div class="szanniu">
              <el-button
                type="primary"
                class="zhuced"
                @click="zhuceshijian"
                :disabled="isDisable"
              >立即注册</el-button>
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
      content: '密&#12288;码',
      status3: false,
      // 手机号
      reinput: '',
      // 设置密码
      reinputmima: '',
      //  <!-- 错误提示符 --> 显隐
      retishi: false,
      //  <!-- 密码错误提示符 --> 显隐
      retishimima: false,
      // 短信验证码的倒计时的功能
      show1: true,
      count: '',
      timer: null,
      shifoujinzhi: false,
      // 验证码输入框
      codekuang: '',
      // 协议勾选框
      checked: false,
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
    // 返回到登陆界面
    funhuidenglu() {
      this.$router.push({
        path: '/user_userden'
      })
    },
    // 去首页
    gohome() {
      this.$router.push({
        path: '/'
      })
    },
    // 用户输入框失去焦点事件
    reshiqu() {
      // console.log('1111')
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.reinput)) {
        this.retishi = true
      } else {
        this.retishi = false
      }
    },
    // 用户名获得焦点时隐提示符
    rehuode() {
      this.retishi = false
    },
    // 密码失去获得焦点事件
    reshiqumi() {
      if (this.reinputmima.length < 6) {
        this.retishimima = true
      }
    },
    rehuodemi() {
      this.retishimima = false
    },
    // 短信验证码的倒计时的功能
    // getCode() {
    //   // 判断滑块
    //   // console.log(this.status3)
    //   // let zhutai = this.status3
    //   // if (!zhutai) return this.$message.error('请将滑块滑到最右边')
    //   // 判断手机号
    //   let myreg = /^1[3-9][0-9]{9}$/
    //   if (!myreg.test(this.reinput)) {
    //     this.retishi = true
    //     return
    //   } else {
    //     this.retishi = false
    //   }
    //   // 手机号验证接口
    //   this.mobileshou()
    //   // 判断密码
    //   if (this.reinputmima.length < 6) {
    //     this.retishimima = true
    //     return
    //   }
    //   // 发送短信接口
    //   this.fajiaoyan()
    //   const TIME_COUNT = 60
    //   // console.log(this.timer)
    //   if (!this.timer) {
    //     this.count = TIME_COUNT
    //     this.show1 = false
    //     this.timer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.shifoujinzhi = true
    //         this.count--
    //       } else {
    //         this.shifoujinzhi = false
    //         this.show1 = true
    //         clearInterval(this.timer)
    //         this.timer = null
    //       }
    //     }, 1000)
    //   }
    //   // console.log('ok')
    // },
    // 发送短信接口
    // fajiaoyan() {
    //   this.$http.post('user/sms/', { mobile: this.reinput })
    //   // console.log(res)
    // },
    // 手机号验证接口
    async mobileshou() {
      const { data: res } = await this.$http.post('user/mobile/', { mobile: this.reinput })
      // console.log(res)
      if (res.status !== 2) {
        if (res.status === 1) {
          return this.$message.error('手机号不合法')
        }
      }
    },
    // 注册用户
    async zhuceshijian() {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      // 判断手机号
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.reinput)) {
        this.retishi = true
        return
      } else {
        this.retishi = false
      }
      // 判断密码
      if (this.reinputmima.length < 6) {
        this.retishimima = true
        return
      }
      // 判断滑块
      // console.log(this.$refs.Verify.isPassing)
      if (!this.$refs.Verify.isPassing) return this.$message.error('请将滑块滑到最右边')
      // console.log(this.$refs.Verify.isPassing)
      // 判断验证码 // 判断是否勾选协议
      // let reinputmi = /^[0-9]{6}$/
      // if (!reinputmi.test(this.codekuang)) {
      //   return this.$message.error('验证码错误')
      // } else
      if (!this.checked) {
        return this.$message.error('请阅读勾选协议')
      }
      const { data: res } = await this.$http.post('user/register/mobile/', { mobile: this.reinput, password: this.reinputmima })
      // console.log(res)
      if (res.status !== 0) {
        return this.$message({
          type: 'warning',
          message: res.msg,
          duration: 1000
        })
      } else {
        this.$message.success('恭喜你，注册成功')
        this.$router.push({
          path: '/user_userden'
        })
      }
    }
  },
  components: {
    dragVerify,
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
  .damainzuo {
    width: 30%;
    height: 100%;
    // background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .damianyou {
    width: 30%;
    margin-top: 180px;
    .damianyoublack {
      width: 90%;
      margin: 0 auto;
      .zhuyo {
        color: #128bed;
        font-size: 20px;
        width: 80%;
        text-align: center;
        margin: 0 auto;
        // margin-top: 160px;
        margin-bottom: 50px;
      }
      .hdjshjd-one {
        width: 80%;
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
      .huakuai {
        width: 80% !important;
        margin: 0 auto;
        margin-top: 18px !important;
      }
      .szanniu {
        width: 80%;
        margin: 0 auto;
        margin-top: 20px;
      }
      .passworddd {
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .wrapper {
          white-space: pre-wrap;
        }
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
      .xieyi {
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
      }
      .zhuced {
        width: 100%;
      }
      .fanhui {
        width: 80%;
        margin: 0 auto;
        margin-top: 10px;
        cursor: pointer;
        color: #128bed;
      }
    }
  }
}
</style>
