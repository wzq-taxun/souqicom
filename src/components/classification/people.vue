<template>
  <div>
    <el-container>
      <el-header style="none">
        <div class="blockshanghe">
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
                v-model.trim="inputpeo"
                max
                @keyup.enter.native="searchpeo"
                :disabled="isDisable"
              ></el-input>
              <el-button type="warning" @click="searchpeo" :disabled="isDisable">搜索</el-button>
            </div>
            <div class="rightheader">
              <div class="rightheaderfirst">
                <div class="commst" v-for="(item, index) in shangshiall" :key="index">
                  <router-link
                    :to="{name:'ciseasonshi',params:{ciseasonid:`${index}.html`}}"
                  >{{item}}</router-link>
                </div>
              </div>
              <!-- <div class="rightheaderlast" @click="peologo" v-show="ishow">登录 | 注册</div> -->
              <!-- 登录成功显示头像区域 -->
              <div v-if="!ishow" class="rightheaderlast" style="width: 30%;">
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
                          :src="imageUrl"
                          alt
                        />
                      </span>
                      <!-- 用户名 -->
                      <span style="display:block;width:68%;color:#fff;">{{userName}}</span>
                      <span style="display:block;color:#fff;">
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
        <p style="margin-left:14.3%;padding:0;">
          <span style="font-size:20px;color:#999;">
            <i class="el-icon-s-home"></i>
            <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
            <i class="el-icon-right" style="font-size:10px;"></i>
            <span style="font-size:10px;">个人中心</span>
          </span>
        </p>
        <div class="shezhitou" style="font-size:25px;">个人资料</div>
        <ul class="gereninfo">
          <li>
            <div class="liright">头像</div>
            <div class="picnei">
              <el-upload
                name="new_avatar"
                class="avatar-uploader"
                action="http://47.240.250.145:8000/user/set/img/"
                :limit="3"
                list-type="picture"
                :show-file-list="false"
                :http-request="handerequest"
              >
                <img v-if="imageUrl" :src="imageUrl" class="avatar" />
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <!-- <label>
                <input type="file" id="file" ref="file" v-on:change="handleFileUpload()" />
              </label>
              <button v-on:click="submitFile()">Submit</button>-->
            </div>
          </li>
          <li>
            <div class="liright">用户名</div>
            <div>
              <span style="margin-right:30px;">{{userName}}</span>
              <span>
                <a href="javascript:;" style="color:#128BED" @click="open">修改</a>
              </span>
            </div>
          </li>
          <li>
            <div class="liright">性别</div>
            <div>
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="2">女</el-radio>
            </div>
          </li>
          <li>
            <div class="liright">手机号码</div>
            <div v-if="isxianshi">暂无</div>
            <div v-if="isphone">{{shoujihao}}</div>
          </li>
          <li>
            <div class="liright">修改密码</div>
            <div>
              <a href="javascript:;" style="color:#128BED" @click="xiugaim">重置</a>
            </div>
          </li>
        </ul>
      </el-main>
      <el-footer style="padding:0">
        <!-- 底部组件 -->
        <foTer></foTer>
      </el-footer>
    </el-container>
    <!-- 点击重置按钮出现密码修改的模态框 -->
    <div v-show="showBox1" class="peomotai" @mousewheel.prevent>
      <div class="show-pa">
        <!-- 图标 -->
        <div class="sha" @click="showfp">
          <i class="el-icon-close"></i>
        </div>
        <div class="guapeo">修改密码</div>
        <div class="zhongjian">
          <div class="damianyoublack">
            <div class="hdjshjd-one">
              <p v-html="content"></p>
              <el-input
                placeholder="请输入手机号码"
                maxlength="11"
                v-model="mobilepeople"
                @blur="mobiles"
                @focus="mobileh"
                clearable
              ></el-input>
            </div>
            <!-- 错误提示符 -->
            <div class="cuocutishi">
              <p v-if="tishipeople" style="font-size:0.5px;text-align: end; color:red;">手机号格式有误</p>
            </div>
            <!-- 密码区域 -->
            <div class="passworddd">
              <p v-html="content1"></p>
              <el-input
                placeholder="请输入新密码"
                show-password
                minlength="6"
                v-model="forgetpswpeo"
                clearable
                @blur="phonespeo"
                @focus="phonehpeo"
              ></el-input>
            </div>
            <div class="cuoumaam">
              <!-- 错误提示符 -->
              <p v-if="phonetpeo" style="font-size:0.5px;text-align: end; color:red;">最少六位</p>
            </div>
            <!--确认新密码 -->
            <div class="passworddd">
              <p>确认密码</p>
              <el-input
                placeholder="确认新密码"
                show-password
                minlength="6"
                clearable
                v-model="fortpswpeo"
                @blur="phonepswpeo"
              ></el-input>
            </div>
            <!-- 短信验证码 -->
            <!-- <div class="duanxin">
              <el-input
                placeholder="请输入短信验证码"
                clearable
                v-model="fgcodedenpeo"
                class="input-with-select"
              >
                <el-button
                  :disabled="codegffpeo"
                  slot="append"
                  :style="{color:codegffpeo ? '#ccc':'#128BED'}"
                  @click="fggetCodepeo"
                >
                  <span v-show="codeshow1peo">获取验证码</span>
                  <span v-show="!codeshow1peo" class="count">{{count}} s</span>
                </el-button>
              </el-input>
            </div>-->
            <!-- 确认按钮 -->
            <div class="szanniu">
              <el-button
                type="primary"
                class="zhuced"
                @click="phonequefgpeo"
                :disabled="isDisablepeo"
              >确认</el-button>
            </div>
            <!-- <div class="fanhui" @click="funhuidenglupeo">返回登录</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      // 公司名字
      shangshiall: ['上市', '港股', '新三板'],
      isDisablepeo: false,
      // 定时器
      codetimer: null,
      // 秒数
      count: '',
      // 控制获取验证码的显影
      codeshow1peo: true,
      // 控制按钮是否警用
      codegffpeo: false,
      // 保存短信验证码
      fgcodedenpeo: '',
      // 保存确认新密码
      fortpswpeo: '',
      // 控制提示符
      phonetpeo: false,
      // 保存新密码
      forgetpswpeo: '',
      //  控制提示符
      tishipeople: false,
      // 手机号输入
      mobilepeople: '',
      // 识别空格字符
      content: '手&ensp;机&ensp;号',
      content1: '新&ensp;密&ensp;码',
      isDisable: false,
      inputpeo: '',
      ishow: false,
      // 上传图片
      imageUrl: '',
      radio: '1',
      // 模态框
      showBox1: false,
      isxianshi: true,
      isphone: false,
      // 保存手机号
      shoujihao: '',
      // 保存旧token
      peotoken: '',
      // 保存图片的根路径
      imgpicpeo: 'http://47.240.250.145:8000/media/',
      // 保存用户名
      userName: '',
      // 保存pk值
      pkzhi: '',
      // 控制图像提示
      isxi: false,
      // 保存新用户名
      newuserName: ''
    }
  },
  computed: {},
  created() {
    // 页面加载获取最新的图像
    this.imageUrl = this.imgpicpeo + window.localStorage.getItem('userimg')
  },
  mounted() {
    // 验证token值是否过期接口
    this.yantoken()
  },
  watch: {},
  methods: {
    // 退出登录功能
    handleCommand(command) {
      if (command === 'e') {
        // console.log('1111')
        // 清除token值 再刷新页面
        window.localStorage.removeItem('token')
        // this.imgpicpeo = ''
        // window.localStorage.removeItem('userimg')
        this.$router.push({
          path: '/'
        })
      } else if (command === 'h') {
        this.$router.go(0)
      }
    },
    // 点击获取激活码时候发起验证手机号是否合法
    async shoujiyanfg() {
      const { data: res } = await this.$http.post('user/mobile/', { mobile: this.mobilepeople })
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
    // 点击获取激活码时候发起发送短信接口
    // jihuomafg() {
    //   this.$http.post('user/sms/', { mobile: this.mobilepeople })
    // },
    // 返回登录事件
    // funhuidenglupeo() {},
    // 点击确认事件跳转到首页并且退出登录
    async phonequefgpeo() {
      // 防止多次点击peo
      this.isDisablepeo = true
      setTimeout(() => {
        this.isDisablepeo = false
      }, 1000)
      // // 手机前端校验方法
      this.mobiles()
      // 校验密码
      this.phonespeo()
      // 确认密码校验
      this.phonepswpeo()
      // 发起手机号验证请求
      this.shoujiyanfg()
      const { data: res } = await this.$http.post('user/change/password/', {
        mobile: this.mobilepeople,
        password: this.forgetpswpeo,
        confirm_password: this.fortpswpeo
      })
      // console.log(res)
      if (res.status !== 0) {
        return this.$message({
          type: 'error',
          message: res.msg,
          duration: 1000
        })
      }
      this.$message.success('修改密码成功')
      // 关闭模态框
      this.showfp()
      // 延迟一秒跳转到
      setTimeout(() => {
        // 清除本地token 退出登录
        window.localStorage.removeItem('token')
        // 跳转到首页
        this.$router.push({
          path: '/'
        })
      }, 1000)
    },
    // 获取短信按钮点击事件
    // fggetCodepeo() {
    //   // 手机前端校验方法
    //   this.mobiles()
    //   // 校验密码
    //   this.phonespeo()
    //   // 确认密码校验
    //   this.phonepswpeo()
    //   // 发起手机号验证请求
    //   this.shoujiyanfg()
    //   // 起发送短信接口
    //   this.jihuomafg()
    //   this.codegffpeo = true
    //   const TIME_COUNT = 60
    //   // console.log(this.codetimer)
    //   if (!this.codetimer) {
    //     this.count = TIME_COUNT
    //     this.codeshow1peo = false
    //     this.codetimer = setInterval(() => {
    //       if (this.count > 0 && this.count <= TIME_COUNT) {
    //         this.codegffpeo = true
    //         this.count--
    //       } else {
    //         this.codegffpeo = false
    //         this.codeshow1peo = true
    //         clearInterval(this.codetimer)
    //         this.codetimer = null
    //       }
    //     }, 1000)
    //   }
    // },
    // 确认新密码获取焦点
    phonepswpeo() {
      if (this.fortpswpeo !== this.forgetpswpeo) return this.$message.error('两次密码不一致')
    },
    // 输入新密码事件获取焦点
    phonehpeo() {
      this.phonetpeo = false
    },
    // 输入新密码事件失去焦点
    phonespeo() {
      if (this.forgetpswpeo.length < 6) {
        return (this.phonetpeo = true)
      }
    },
    // 手机号获取焦点事件
    mobileh() {
      this.tishipeople = false
    },
    // 手机号失去焦点事件
    mobiles() {
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.mobilepeople)) {
        return (this.tishipeople = true)
      } else {
        this.tishipeople = false
      }
    },
    // 修改昵称的事件接口
    async updatainfoer() {
      const { data: res } = await this.$http.post('user/check/username/', { pk: this.pkzhi, username: this.newuserName })
      if (res.status !== 0) return this.$message.error('修改失败')
      // 把返回的新昵称替换掉之前保存再本地的值
      window.localStorage.setItem('token', res.results.token)
      this.userName = res.results.username
      window.localStorage.setItem('username', res.results.username)
    },
    // 鼠标划过事件
    changeMask() {
      this.isxi = true
    },
    // 鼠标离开事件
    levekai() {
      this.isxi = false
    },
    // 验证token值是否过期接口
    async yantoken() {
      this.peotoken = window.localStorage.getItem('token')
      if (!this.peotoken) {
        this.ishow = this.isxianshi = true
        this.isphone = false
        return
      }
      const { data: res } = await this.$http.post('user/verify/token/', { token: this.peotoken })
      if (res.token !== this.peotoken) {
        this.isxianshi = true
        this.isphone = false
      }
      // 否者就将本地存储的手机号渲染出来
      let phone = window.localStorage.getItem('userphone')
      this.shoujihao = phone.substr(0, 3) + '****' + phone.substr(phone.length - 4)
      this.userName = window.localStorage.getItem('username')
      this.pkzhi = window.localStorage.getItem('pk')
      this.isxianshi = false
      this.isphone = true
    },
    // 关闭模态框
    showfp() {
      this.showBox1 = false
    },
    // 触发修改密码
    xiugaim() {
      // this.$alert('<strong>修改密码</strong>', '修改密码', {
      //   dangerouslyUseHTMLString: true
      // })
      this.showBox1 = true
    },
    // 修改昵称触发
    open() {
      this.$prompt('请输入昵称', '修改昵称', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^.{3,7}$/,
        inputErrorMessage: '昵称格式不正确'
      })
        .then(({ value }) => {
          // 点击确定按钮的事件
          this.$message({
            type: 'success',
            message: '您的昵称是:' + value
          })
          // 把新用户名进行保存
          this.newuserName = value
          // 发请求
          this.updatainfoer()
          // 刷新一次页面
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          })
        })
    },
    // 搜索触发
    searchpeo() {
      // 防止多次点击
      this.isDisable = true
      setTimeout(() => {
        this.isDisable = false
      }, 1000)
      // 判断输入框是否为空 空就中止
      if (this.inputpeo === '' || this.inputpeo === '公司' || this.inputpeo === '有限公司') {
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
        params: { search1: `${this.inputpeo}.html` }
      })
    },
    submitFile() {
      let formData = new FormData()
      formData.append('new_avatar', this.file)
      formData.append('pk', this.pkzhi)
      this.$http
        .post('user/set/matter_img/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(function() {
          console.log('SUCCESS!!')
        })
        .catch(function() {
          console.log('FAILURE!!')
        })
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0]
    },
    // // 登录注册
    // peologo() {},
    // 上传图片
    async handerequest(file) {
      console.log(file)
      const isJPG = file.file.type === 'image/jpeg'
      const isLt2M = file.file.size / 1024 / 1024 < 2
      if (!isJPG) {
        return this.$message.error('上传头像图片只能是 JPG 格式!')
      } else if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        return
      }
      let parm = new FormData()
      parm.append('new_avatar', file.file)
      parm.append('pk', this.pkzhi)
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      const { data: res } = await this.$http.post('user/set/matter_img/', parm, config)
      // console.log(res)
      if (res.status !== 0) return this.$message.error('上传失败')
      window.localStorage.setItem('userimg', res.results.avatar)
      this.imageUrl = this.imgpicpeo + res.results.avatar
    }
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
  .blockshanghe {
    height: 100%;
    background-color: #008bfe;
    .shangheader {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 71%;
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
          font-size: 15px;
          color: #fff;
          border-radius: 5px;
          cursor: pointer;
          margin-left: 10px;
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
  width: 100%;
  padding: 0;
  .shezhitou,
  .gereninfo {
    margin: 0 auto;
    width: 70%;
    border: 1px solid #ccc;
  }
  .shezhitou {
    height: 50px;
    line-height: 50px;
    padding-left: 20px;
    margin-top: 15px;
  }
  .gereninfo {
    padding: 0 10px;
    padding-top: 20px;
    border-top: 0px;
    height: 400px;
    margin-bottom: 400px;
    li {
      display: flex;
      justify-content: flex-start;
      // background-color: pink;
      margin: 10px 0;
      height: 60px;
      line-height: 60px;
      width: 100%;
      .liright {
        width: 20%;
        // background-color: green;
      }
      .picnei {
        display: flex;
        justify-content: flex-start;
        .avatar-uploader-icon {
          border: 1px dashed #409eff;
          font-size: 28px;
          color: #8c939d;
          width: 60px;
          height: 60px;
          line-height: 60px;
          text-align: center;
        }
        // .avatar-uploader-icon:hover {
        //   background-color: #ccc;
        // }
        .avatar {
          width: 60px;
          height: 60px;
          display: block;
        }
      }
    }
  }
}
// 模态框区域
.peomotai {
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  .show-pa {
    position: fixed;
    top: 200px;
    left: 50%;
    transform: translateX(-50%);
    width: 40%;
    height: 450px;
    border-radius: 10px;
    background-color: #fff;
    .sha {
      position: absolute;
      top: 5px;
      right: 5px;
      color: #005fc1;
      font-size: 25px;
      font-weight: 900;
    }
    .guapeo {
      position: absolute;
      transform: translateX(-50%);
      top: 30px;
      left: 50%;
      font-size: 25px;
    }
    .zhongjian {
      position: absolute;
      transform: translate(-50%, -50%);
      top: 50%;
      left: 50%;
      width: 70%;
      height: 70%;
      // background-color: pink;
      .damianyoublack {
        width: 100%;
        margin: 0 auto;
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
          width: 100%;
          margin: 0 auto;
        }
        .szanniu,
        // .duanxin {
        //   width: 100%;
        //   margin: 0 auto;
        //   margin-top: 20px;
        // }
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
}
</style>
