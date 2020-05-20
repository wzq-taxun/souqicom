<template>
  <div class="blockshanghe">
    <div class="shangheader">
      <div class="leftheader">
        <h1 class="leftheaderfirst">
          <span class="doindexpage" @click="gohomepage">
            <img src="../../assets/image/logotou.png" alt />
          </span>
        </h1>
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
              应用<i class="el-icon-caret-bottom el-icon--right"></i>
              <!-- <i style="color: #008bfe;" class="el-icon-s-platform" /> -->
            </span>
          </el-popover>
          <div class="commst" v-for="(item, index) in shangshiall" :key="index">
            <router-link :to="{name:'ciseasonshi',params:{ciseasonid:`${index}.html`}}">{{item}}</router-link>
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
    <!-- 鼠标经过应用后出现 -->
    <!-- <div
      v-show="ishowkuai"
      class="zhanshiyu"
      @mouseover="mouseOver"
      @mouseleave="mouseLeave"
      @mousewheel.prevent
    >
      <div class="common-use">
        <p>
          <el-divider>
            <i class="el-icon-s-platform" />
            <span style="font-weight: bold;font-size:14px;">快捷服务</span>
          </el-divider>
        </p>
        <ul>
          <li @click="gointerest(item, index)" v-for="(item, index) in signlist" :key="index">
            <p>
              <i class="iconfont" :class="item.tool_taxon"></i>
            </p>
            <p>{{item.tools_name}}</p>
          </li>
        </ul>
      </div>
    </div>-->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
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
      oldtoken: '',
      // 应用
      // ishowkuai: false,
      // 接受功能数据
      signlist: [],
      newoathlist: ['dkjsq', 'jsq', 'huilv']
      // iconlist: ['icon-daikuanlishuaitiaozhengbiao', 'icon-DVLINK_lishuaibaobei', 'icon-icon-test']
    }
  },
  computed: {},
  created() {},
  mounted() {
    this.getuserway()
    // 页面刷新验证token
    this.yantoken1()
  },
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
    mouseLeave() {
      this.ishowkuai = false
    },
    mouseOver() {
      // console.log('1111')
      this.ishowkuai = true
    },
    gohomepage() {
      this.$router.push({
        path: '/'
      })
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
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
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
        .doindexpage {
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
          width: 70px!important;
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
  // 鼠标滑过出现下拉框
  // .zhanshiyu {
  //   z-index: 1000;
  //   position: fixed;
  //   top: 58px;
  //   right: 550px;
  //   width: 400px;
  //   height: 300px;
  //   background-color: #fff;
  //   border-radius: 10px;
  //   .common-use {
  //     width: 100%;
  //     i {
  //       color: #008bfe;
  //     }
  //     ul {
  //       padding: 0;
  //       margin: 0;
  //       width: 100%;
  //       display: flex;
  //       justify-content: flex-start;
  //       flex-wrap: wrap;
  //       li {
  //         width: 33.33%;
  //         cursor: pointer;
  //         padding: 0;
  //         margin-bottom: 15px;
  //         display: flex;
  //         flex-direction: column;
  //         align-items: center;
  //         justify-content: space-around;
  //         p {
  //           margin: 5px 0;
  //           padding: 0;
  //           font-size: 13px;
  //           i {
  //             font-size: 30px;
  //           }
  //         }
  //       }
  //       li:hover {
  //         color: #008bfe;
  //       }
  //     }
  //   }
  // }
}
</style>
