<template>
  <div class="mainzong">
    <!-- pc端 -->
    <el-container class="homezhu" v-if="showxiang">
      <!-- 头部区域 -->
      <el-header style="none">
        <div class="sjjhdjh">
          <div class="shangheader">
            <div class="leftheader">
              <h1 class="leftheaderfirst">
                <img src="../assets/image/logotou.png" alt />
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
                  style="height:60px;line-height:60px;padding-right:30px;"
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
                  </span>
                </el-popover>
                <div class="commst" v-for="(item, index) in shangshiall" :key="index">
                  <router-link
                    :to="{name:'ciseasonshi',params:{ciseasonid:`${index}.html`}}"
                  >{{item}}</router-link>
                </div>
              </div>
              <div v-if="shifoushow" class="rightheaderlast" @click="show">登录 | 注册</div>
              <!-- 登录成功显示头像区域 -->
              <div
                v-if="!shifoushow"
                class="rightheaderlast"
                style="background-color: #008BFE;width: 30%;"
              >
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
                        :src="pcimg + userinfo.avatar"
                        alt
                      />
                    </span>
                    <!-- 用户名 -->
                    <span
                      style="display:block; width:68%; overflow:hidden;text-overflow:ellipsis;color:#fff"
                    >{{userinfo.username}}</span>
                    <span style="display:block; color:#fff">
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
        <div class="xiaheader">
          <h1>搜企业，上搜企</h1>
          <!-- <div class="xaiobiao">全 国 搜</div> -->
          <div class="xaioshuru">
            <el-input
              placeholder="请输入企业名称"
              v-model.trim="input"
              @keyup.enter.native="chaxung"
              :disabled="isDisable"
              class="opus-item"
            ></el-input>
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="chaxung"
              :disabled="isDisable"
              class="sizewu"
            >搜一下</el-button>
          </div>
          <div class="reidian">
            <div class="reileft" v-html="contrt">热门公司：</div>
            <div class="reiright">
              <router-link
                :to="{name:'detail',params:{detail:`${item.id}.html`}}"
                v-for="(item,index) in nhotslist"
                :key="index"
              >{{item.enterprise_name}}</router-link>
            </div>
          </div>
        </div>
      </el-header>
      <!-- 内容区域 -->
      <el-main>
        <!-- 轮播图 -->
        <div class="block">
          <!-- <el-carousel height="200px" arrow="never">
          <el-carousel-item v-for="item in 4" :key="item">-->
          <!-- <h3 class="small">{{ item }}</h3> -->
          <!-- <img src="../assets/image/规范化.gif" alt />
          </el-carousel-item>-->
          <!-- </el-carousel> -->
        </div>
        <!-- 热门栏目 -->
        <div class="hotquyu">
          <div class="hotquyutou">
            <span>热门新闻</span>
            <span>百科知识</span>
          </div>
          <div class="hotquyucard">
            <div class="nwesleft">
              <el-card class="box-card" v-for="(item,index) in newsall" :key="index">
                <div class="neibuxueqiu">
                  <div
                    class="box-cardtu"
                    @click="shijianadjios(item.id)"
                    v-show="item.news_picture !== null"
                  >
                    <img :src="`http://47.240.250.145:8000/${item.news_picture}`" alt />
                  </div>
                  <ul>
                    <li @click="shijianadjios(item.id)">{{getTitle(item.title)}}</li>
                    <li>
                      <p>来源：{{item.news_source}}</p>
                      <p>{{item.issue_time}}</p>
                    </li>
                  </ul>
                </div>
              </el-card>
            </div>
            <div class="baikesright">
              <el-card class="box-card" v-for="(item,index) in baikeall" :key="index">
                <div class="neibuxueqiu">
                  <div
                    class="box-cardtu"
                    @click="baikeshi(item.id)"
                    v-show="item.encyclopedias_picture !== null"
                  >
                    <img :src="`http://47.240.250.145:8000/${item.encyclopedias_picture}`" alt />
                  </div>
                  <ul>
                    <li @click="baikeshi(item.id)">{{getTitle(item.title)}}</li>
                    <li>
                      <p>来源：{{item.encyclopedias_source}}</p>
                      <p>{{item.issue_time}}</p>
                    </li>
                  </ul>
                </div>
              </el-card>
            </div>
          </div>
          <!-- 更多内容 -->
          <div class="morenei">
            <p>
              <router-link to="/todaytitle">查看更多</router-link>
            </p>
            <p>
              <router-link to="/articlewe">查看更多</router-link>
            </p>
          </div>
        </div>
        <!-- 企业查询 -->
        <div class="qiyecha">
          <p style="font-weight:900;font-size:30px;">企业查询</p>
          <el-tabs v-model="activeName">
            <!-- <el-tab-pane label="企业查询" disabled></el-tab-pane> -->
            <el-tab-pane label="按地区查询" name="first">
              <div class="shuhangye">
                <ul>
                  <li v-for="(value, name, index)  in areshens" :key="index">
                    <router-link :to="{name:'search2',params:{search2:`${name}.html`}}">{{value}}</router-link>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
            <el-tab-pane label="按行业查询" name="second">
              <div class="shuhangye">
                <ul>
                  <li v-for="(item,index) in hclslist" :key="index">
                    <router-link :to="{name:'classify',params:{searchid:`${index}.html`}}">{{item}}</router-link>
                  </li>
                </ul>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
      <!-- 底部 -->
      <el-footer style="padding:0">
        <!--引入底部组件 -->
        <fo-ter></fo-ter>
      </el-footer>
    </el-container>
    <!-- 点击登录注册按钮出现模态框 -->
    <div v-show="showBox" class="motaikuang" @mousewheel.prevent>
      <div class="show-parent">
        <div class="shard" @click="showfase">
          <i class="el-icon-close"></i>
        </div>
        <!-- 左边区域 -->
        <div class="guanggao">
          <div style="width: 50%;height: 40%;">
            <img style="width: 100%;height: 100%;" src="../assets/image/biao.png" alt />
          </div>
          <p></p>
        </div>
        <!-- 右侧区域  登录区域-->
        <div class="dengluquyu">
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
                  @focus="huoquinput1"
                  placeholder="请输入手机号"
                  maxlength="11"
                  clearable
                  v-model="input1"
                ></el-input>
            </div>-->
            <!-- 错误提示符 -->
            <!-- <p v-if="tishiinput" style="font-size:0.5px;text-align: end; color:red;">手机号格式错误</p> -->
            <!--滑块验证 -->
            <!-- <jcRange status="status1"></jcRange> -->
            <!-- 短信验证码 -->
            <!-- <div class="duanxin">
                <el-input placeholder="请输入短信验证码" clearable v-model="code" class="input-with-select">
                  <el-button
                    :disabled="shifoujinzhi"
                    slot="append"
                    :style="{color:shifoujinzhi ? '#ccc':'#128BED'}"
                    @click="getCode"
                  >
                    <span v-show="show1">获取验证码</span>
                    <span v-show="!show1" class="count">{{count}} s</span>
                  </el-button>
                </el-input>
            </div>-->
            <!-- 登录注册按钮 -->
            <!-- <el-button type="primary" class="szanniu" @click="qudengludao">登录</el-button> -->
            <!-- </div> -->
            <div v-show="cur==0" class="hdjshjd">
              <div class="hdjshjd-one">
                <p>用户名</p>
                <el-input
                  placeholder="请输入手机号码"
                  maxlength="11"
                  v-model="user1"
                  @focus="huode"
                  clearable
                  name="uphone"
                ></el-input>
              </div>
              <!-- 错误提示符 -->
              <p v-if="tishi" style="font-size:0.5px;text-align: end; color:red;">手机号格式有误</p>
              <!-- 密码 -->
              <div class="hdjshjd-one">
                <p v-html="content">密码</p>
                <el-input
                  placeholder="请输入密码"
                  minlength="6"
                  v-model="password"
                  clearable
                  show-password
                  @focus="huodemi"
                ></el-input>
              </div>
              <!-- 错误提示符 -->
              <p v-if="tishimima" style="font-size:0.5px;text-align: end; color:red;">密码最少六位</p>
              <!--滑块验证 -->
              <drag-verify
                ref="Verify"
                :circle="false"
                progressBarBg="green"
                :height="50"
                :width="380"
                text="请按住滑块拖动"
                successText="验证通过"
                handlerIcon="el-icon-d-arrow-right"
                successIcon="el-icon-circle-check"
              ></drag-verify>
              <!-- <jcRange status="status"></jcRange> -->
              <!-- 登录按钮 -->
              <el-button type="primary" class="szanniu" @click="denglucheng">立即登录</el-button>
              <!-- 免费注册 -->
              <p class="mianhdfgy">
                <span @click="handere">免费注册</span>
                <span @click="quforgrt">忘记密码？</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 移动端 -->
    <div class="mobmain" v-if="!showxiang">
      <div class="mobhome">
        <h2 class="mobtitle">搜企业，上搜企</h2>
        <div class="mobxaioshuru">
          <input type="text" placeholder="请输入企业名称" v-model.trim="input" :disabled="isDisable" />
          <el-button
            type="primary"
            icon="el-icon-search"
            class="mobsouyi"
            @click="chaxung"
            :disabled="isDisable"
          >搜一下</el-button>
        </div>
      </div>
      <!-- 文章列表 -->
      <div class="mobnewslist">
        <div class="mobnew">
          <p style="color:#333333;font-weight:bold">热门新闻</p>
          <p>
            <router-link to="/todaytitle" style="color:#128BED;font-size:14px;">更多></router-link>
          </p>
        </div>
        <ul class="mobul">
          <li v-for="(item, index) in mobnewsall" :key="index" @click="shijianadjios(item.id)">
            <div class="mabimg" v-show="item.news_picture !== null">
              <img :src="`http://47.240.250.145:8000/${item.news_picture}`" alt />
            </div>
            <div class="mabtext">
              <p>{{getTitle(item.title)}}</p>
              <p style="height:20px;color:#999999;">{{item.issue_time}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="mobnewslist">
        <div class="mobnew">
          <p style="color:#333333;font-weight:bold">百科知识</p>
          <p>
            <router-link to="/articlewe" style="color:#128BED;font-size:14px">更多></router-link>
          </p>
        </div>
        <ul class="mobul">
          <li v-for="(item, index) in mobbaikeall" :key="index" @click="baikeshi(item.id)">
            <div class="mabimg" v-show="item.encyclopedias_picture !== null">
              <img :src="`http://47.240.250.145:8000/${item.encyclopedias_picture}`" alt />
            </div>
            <div class="mabtext">
              <p>{{getTitle(item.title)}}</p>
              <p style="height:20px;color:#999999;">{{item.issue_time}}</p>
            </div>
          </li>
        </ul>
      </div>
      <!-- 最热注册企业 -->
      <div class="mobnewslist">
        <div class="mobnew">
          <p style="color:#333333;font-weight:bold">最热注册企业</p>
          <!-- <p style="color:#128BED;font-size:15px">更多></p> -->
        </div>
        <ul class="mobul">
          <li
            style="height:20px;margin-bottom:20px;justify-content: space-between;"
            v-for="(item, index) in mobnewhot"
            :key="index"
            @click="mongodetail(item.id)"
          >
            <span style="font-size:14px;">
              {{mobgetname(item.enterprise_name)}}
              <el-tag
                type="success"
                class="mobeltal"
                v-if="item.manage_state === '存续'"
              >{{item.manage_state}}</el-tag>
              <el-tag
                type="warning"
                class="mobeltal"
                v-if="item.manage_state !== '存续'"
              >{{item.manage_state}}</el-tag>
            </span>
            <span>
              <i class="el-icon-arrow-right"></i>
            </span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import foTer from '@/components/common/FoTer.vue'
// import jcRange from '@/components/mokuai/JcRange.vue'
import dragVerify from 'vue-drag-verify'
export default {
  metaInfo: {
    title: '搜企业-上搜企',
    meta: [
      {
        name: 'keywords',
        content: '搜企'
      },
      {
        name: 'description',
        content: '搜企业-上搜企'
      }
    ]
  },
  // props: {},
  data() {
    return {
      // 移动端
      mobnewhot: [],
      mobbaikeall: [],
      mobnewsall: [],
      // 控制pc端还是移动端----------------------------------------------------
      showxiang: true,
      // 识别换行符号
      contrt: '热门<br/>公司',
      // 公司名字
      shangshiall: ['上市', '港股', '新三板'],
      // 首页新闻和百科
      content: '密&#12288;码',
      // table栏的选中状态
      activeName: 'second',
      // 按省份分类的数组
      areshens: {
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
      // 按行业分类的数组
      hclslist: [
        '软件和信息技术服务业',
        '批发业',
        '商务服务业',
        '零售业',
        '房地产业',
        '餐饮业',
        '建筑装饰、装修和其他建筑业',
        '房屋建筑业',
        '科技推广和应用服务业',
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
        '其他行业'
      ],
      list: [1, 1, 1, 1, 1, 1, 1, 1],
      showBox: false,
      tabTitle: ['登&#12288;&#12288;录'],
      // 默认选中第一个tab
      cur: 0,
      status: false,
      status1: false,
      input: '',
      // 快捷登录输入框
      input1: '',
      code: '',
      // input2: '',
      // 密码登录输入框
      user1: '',
      password: '',
      //  <!-- 错误提示符 --> 显隐
      tishi: false,
      tishimima: false,
      tishiinput: false,
      // 短信验证码的倒计时的功能
      show1: true,
      count: '',
      timer: null,
      shifoujinzhi: false,
      // 页面头像的显隐
      shifoushow: true,
      // 登录成功后用户信息进行保存
      userinfo: {
        avatar: '',
        username: ''
      },
      // 用户头像的协议前缀
      pcimg: 'http://47.240.250.145:8000/media/',
      // 保存token
      oldtoken: '',
      // 按钮是否禁止
      isDisable: false,
      // 新闻数组保存
      newsall: [],
      // 百科数组保存
      baikeall: [],
      // 保存热门搜素数据
      nhotslist: [],
      // 应用
      // ishowkuai: false,
      // 接受功能数据
      signlist: [],
      newoathlist: ['dkjsq', 'jsq', 'huilv', 'fangdai']
      // iconlist: ['icon-daikuanlishuaitiaozhengbiao', 'icon-DVLINK_lishuaibaobei', 'icon-icon-test']
    }
  },
  created() {
    this.getuserway()
  },
  mounted() {
    this.mobgetlist()
    // 调用校验token接口
    this.yantoken()
    // 首页加载事件 新闻 及百科
    this.gethotnews()
    // 页面加载事件 热门搜素
    this.gethotseach()
    // 可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w < 1025) {
      this.showxiang = false
    }
  },
  // watch: {},
  methods: {
    // 调用 功能名称接口
    async getuserway() {
      const { data: res } = await this.$http.get('souqi/admin/tools/add/home/')
      console.log(res)
      if (res.status !== 0) return this.$message.warning(res.msg)
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].newname = this.newoathlist
        // res.results[i].icon = this.iconlist
      }
      // console.log(res.results)
      this.signlist = res.results
      // console.log(this.signlist)
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
    // mouseLeave() {
    //   this.ishowkuai = false
    // },
    // mouseOver() {
    //   console.log('1111')
    //   this.ishowkuai = true
    // },
    // 去
    mongodetail(value) {
      this.$router.push({
        name: 'detail',
        params: { detail: `${value}.html` }
      })
    },
    // 移动公司名
    mobgetname(value) {
      if (value.length > 15) return value.substring(0, 15)
      return value
    },
    // 移动最热注册企业
    async mobgetlist() {
      const { data: res } = await this.$http.post('enterprise/hot_ph/search/')
      console.log(res)
      if (res.status !== 0) return this.$message.error(res.msg)
      this.mobnewhot = res.results
    },
    // 发起热门搜素接口
    async gethotseach() {
      const { data: res } = await this.$http.post('enterprise/hot/search/')
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取失败')
      this.nhotslist = res.results
    },
    // 判断标题的长短
    getTitle(data) {
      if (data.length > 30) return data.substring(0, 22)
      return data
    },
    // 首页加载事件 新闻 及百科
    async gethotnews() {
      // 主页新闻
      const { data: res } = await this.$http.post('news/')
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取失败')
      for (let j = 0, len = res.results.length; j < len; j++) {
        res.results[j].issue_time = res.results[j].issue_time.split('T')[0]
      }
      this.newsall = res.results
      // console.log(this.newsall.slice(0, 2))
      // 移动热搜新闻
      this.mobnewsall = this.newsall.slice(0, 2)
      //  主页百科
      const { data: res1 } = await this.$http.post('encyclopedias/')
      // console.log(res1)
      if (res1.status !== 0) return this.$message.error('获取失败')
      for (let j = 0, len = res1.results.length; j < len; j++) {
        res1.results[j].issue_time = res1.results[j].issue_time.split('T')[0]
      }
      this.baikeall = res1.results
      // 移动百科
      this.mobbaikeall = this.baikeall.slice(0, 2)
    },
    // 新闻点击事件
    shijianadjios(val) {
      this.$router.push({
        name: 'todaydet',
        params: { todaydet: `${val}.html` }
      })
    },
    // 百科点击事件
    baikeshi(val) {
      this.$router.push({
        name: 'articledet',
        params: { articledet: `${val}.html` }
      })
    },
    // 首页搜索功能 点击搜索
    chaxung() {
      // console.log('1111')
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 1000)
      // 判断输入框是否为空 空就中止
      if (this.input === '' || this.input === '公司' || this.input === '有限公司') {
        return this.$message({
          type: 'warning',
          center: true,
          message: '搜索范围过大或内容不能为空',
          duration: 1000
        })
      }
      this.$router.push({
        name: 'clasearc',
        params: { search1: `${this.input}.html` }
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
        this.$router.push({
          path: '/people'
        })
      }
    },
    show() {
      // 点击的时候显示模态框
      this.showBox = true
      // console.log('111')
    },
    // // 点击的时候隐藏y模态框
    showfase() {
      this.showBox = false
    },
    handere() {
      this.$router.push({
        path: '/user_register'
      })
    },
    // 去找回密码页面
    quforgrt() {
      this.$router.push({
        path: '/user_forgetmi'
      })
    },
    // 用户名获得焦点时隐提示符
    huode() {
      this.tishi = false
    },
    shiqumi() {
      if (this.password.length < 6) {
        this.tishimima = true
      }
    },
    huodemi() {
      this.tishimima = false
    },
    // 点击登陆发送请求
    // async qudengludao() {
    //   // 验证用户名调用
    //   let myreg = /^1[3-9][0-9]{9}$/
    //   if (!myreg.test(this.input1)) {
    //     this.tishiinput = true
    //     return
    //   } else {
    //     this.tishiinput = false
    //   }
    //   // 验证滑块是否滑倒右侧
    //   if (!this.status1) return this.$message.error('请将滑块滑到最右边')
    //   //  验证 验证码是否正确
    //   let reinputmi = /^[0-9]{6}$/
    //   if (!reinputmi.test(this.code)) {
    //     return this.$message.error('验证码错误')
    //   }
    //   const { data: res } = await this.$http.post('user/login/mobile/', { mobile: this.input1, code: this.code })
    //   // console.log(res)
    //   //   1.2 token 只应在当前网站打开期间生效，所以将 token 保存在 sessionStorage 中
    //   window.sessionStorage.setItem('token', res.token)
    //   window.localStorage.setItem('username', res.user.username)
    //   window.localStorage.setItem('userimg', res.user.avatar)
    //   // 用来保存手机号的
    //   window.localStorage.setItem('userphone', res.results.mobile)
    //   // pk值保存
    //   window.localStorage.setItem('pk', res.results.pk)
    //   // 刷新页面
    //   this.$router.go(0)
    // },

    // 短信验证码的倒计时的功能
    // getCode() {
    //   let myreg = /^1[3-9][0-9]{9}$/
    //   if (!myreg.test(this.input1)) {
    //     this.tishiinput = true
    //     return
    //   } else {
    //     this.tishiinput = false
    //   }
    //   if (!this.status1) return this.$message.error('请将滑块滑到最右边')
    //   // 发起手机号验证请求
    //   this.shoujiyan()
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
    // },
    // 点击获取激活码时候发起验证手机号是否合法
    async shoujiyan() {
      const { data: res } = await this.$http.post('user/mobile/', { mobile: this.input1 })
      // console.log(res)
      // console.log(res.status)
      if (res.status !== 2) {
        if (res.status === 0) {
          return this.$message.error('该用户未注册')
        } else {
          return this.$message.error('手机号不合法')
        }
      }
      // 起发送短信接口
      this.jihuoma()
    },
    // 点击获取激活码时候发起发送短信接口
    // jihuoma() {
    //   this.$http.post('user/sms/', { mobile: this.input1 })
    //   // console.log(res)
    //   // console.log(res.status)
    // },
    huoquinput1() {
      this.tishiinput = false
    },
    // 切换table事件
    qiehuanahijian(val) {
      this.cur = val
      this.input1 = ''
      this.input2 = ''
      this.user1 = ''
      this.password = ''
      this.tishi = false
      this.tishimima = false
      this.tishiinput = false
    },
    // 点击立即登录先判断滑块是否为ture,然后是否发起请求
    async denglucheng() {
      // console.log('pamdj')
      // 判断账户密码
      let myreg = /^1[3-9][0-9]{9}$/
      if (!myreg.test(this.user1) || this.password.length < 6) return this.$message.error('用户名或密码错误')
      // 判断滑块
      console.log(this.$refs.Verify.isPassing)
      if (!this.$refs.Verify.isPassing) return this.$message.error('请将滑块滑到最右边')
      console.log(this.$refs.Verify.isPassing)
      const { data: res } = await this.$http.post('user/login/', {
        username: this.user1,
        password: this.password
      })
      console.log(res)
      if (res.status !== 0) return this.$message.error(res.msg)
      console.log(res.results)
      window.localStorage.setItem('token', res.results.token)
      window.localStorage.setItem('username', res.results.username)
      window.localStorage.setItem('userimg', res.results.avatar)
      // 用来保存手机号的
      window.localStorage.setItem('userphone', res.results.mobile)
      // pk值保存
      window.localStorage.setItem('pk', res.results.pk)
      this.$router.go(0)
    },
    // 验证token值是否过期接口
    async yantoken() {
      this.oldtoken = window.localStorage.getItem('token')
      const { data: res } = await this.$http.post('user/verify/token/', { token: this.oldtoken })
      // console.log(res)
      if (res.token !== this.oldtoken) {
        // 不显示头像 显示登录按钮
        this.shifoushow = true
      } else {
        // 显示头像
        this.shifoushow = false
        // 获取用户信息进行渲染
        this.userinfo.username = window.localStorage.getItem('username')
        this.userinfo.avatar = window.localStorage.getItem('userimg')
      }
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
// pc端
.mainzong {
  .homezhu {
    width: 100%;
    .el-header {
      width: 100%;
      padding: 0 0;
      height: 950px !important;
      .sjjhdjh {
        padding: 0 0;
        width: 100%;
        height: 60px;
        background-color: #008bfe;
        .shangheader {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 70%;
          margin: 0 auto;
          height: 60px;
          .leftheader {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 300px;
            height: 40px;
            .leftheaderfirst {
              width: 50%;
              height: 60px;
              text-align: center;
              cursor: pointer;
              img {
                width: 100%;
                height: 100%;
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
            height: 60px;
            .rightheaderfirst {
              width: 80%;
              height: 100%;
              display: flex;
              justify-content: center;
              align-items: center;
              .commst {
                margin-left: 5px;
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
                  cursor: pointer;
                }
                span:hover,
                a:hover {
                  color: #ffa500;
                }
              }
              .el-popover__reference {
                color: #fff;
              }
              .el-popover__reference:hover {
                color: #ffa500;
                cursor: pointer;
                // /deep/.teshuqiangkuang:hover {
                // }
              }
              // .commst-other {
              //   width: 78px;
              //   // 鼠标滑过出现下拉框
              //   /deep/.zhanshiyu {
              //     width: 400px;
              //     height: 300px;
              //     background-color: #fff;
              //     border-radius: 10px;
              //     .common-use {
              //       width: 100%;
              //       i {
              //         color: #008bfe;
              //       }
              //       ul {
              //         padding: 0;
              //         margin: 0;
              //         width: 100%;
              //         display: flex;
              //         justify-content: flex-start;
              //         flex-wrap: wrap;
              //         li {
              //           cursor: pointer;
              //           padding: 0;
              //           width: 33.33%;
              //           margin-bottom: 15px;
              //           display: flex;
              //           flex-direction: column;
              //           align-items: center;
              //           justify-content: space-around;
              //           p {
              //             margin: 5px 0;
              //             padding: 0;
              //             font-size: 13px;
              //             i {
              //               font-size: 30px;
              //             }
              //           }
              //         }
              //         li:hover {
              //           color: #008bfe;
              //         }
              //       }
              //     }
              //   }
              // }
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
              .el-dropdown-link {
                display: flex;
                justify-content: flex-start;
                cursor: pointer;
                color: #409eff;
              }
              .el-icon-arrow-down {
                font-size: 12px;
              }
            }
          }
        }
      }

      .xiaheader {
        width: 100%;
        height: 950px;
        background: url('../assets/image/timg2.png') no-repeat center;
        position: relative;
        h1 {
          margin-top: 150px;
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          font-size: 40px;
          font-weight: 400;
          color: #fff;
        }
        .xaiobiao {
          top: 250px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          color: orange;
          font-size: 30px;
        }
        .xaioshuru {
          display: flex;
          justify-content: center;
          align-items: center;
          top: 380px;
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          .el-input {
            width: 700px;
            border-radius: 0 !important;
          }
          .el-button {
            border-radius: 0;
          }
        }
        .reidian {
          margin-top: 130px;
          width: 800px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 320px;
          left: 50%;
          transform: translateX(-50%);
          .reileft {
            flex: 5%;
            color: #fff;
            font-size: 16px;
          }
          .reiright {
            flex: 90%;
            font-size: 15px;
            a {
              margin: 0 5px;
              color: #409eff;
            }
            a:hover {
              text-decoration: none;
              color: #ffa500;
            }
          }
        }
      }
    }
    .el-main {
      width: 100%;
      padding: 0 0;
      .block {
        margin: 0 auto;
        width: 70%;
        // background-color: pink;
        .el-carousel {
          width: 100%;
          img {
            width: 100%;
          }
        }
      }
      // <!-- 热门栏目 -->
      .hotquyu {
        margin: 0 auto;
        margin-top: 100px;
        width: 70%;
        .hotquyutou {
          width: 100%;
          display: flex;
          // justify-content: space-between;
          span {
            font-weight: 900;
            font-size: 25px;
          }
          span:first-child {
            margin-right: 580px;
          }
        }
        .hotquyucard {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          .nwesleft {
            width: 50%;
            .el-card {
              width: 99%;
              .neibuxueqiu {
                border-bottom: 0px;
                width: 100%;
                padding: 0px;
                display: flex;
                .box-cardtu {
                  width: 40%;
                  height: 150px;
                  flex: 1;
                  overflow: hidden;
                  img {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    transition: all 0.4s;
                  }
                  img:hover {
                    transform: scale(1.2);
                  }
                }
                ul {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 0px;
                  margin-left: 20px;
                  height: 118px;
                  flex: 2;
                  li:first-child {
                    color: #000;
                    font-weight: 600;
                    font-size: 18px;
                    cursor: pointer;
                  }
                  li:first-child:hover {
                    color: #128bed;
                  }
                  li:last-child {
                    color: #999;
                    font-size: 13px;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
            }
          }
          .baikesright {
            width: 50%;
            .el-card {
              width: 99%;
              .neibuxueqiu {
                border-bottom: 0px;
                width: 100%;
                padding: 0px;
                display: flex;
                .box-cardtu {
                  width: 40%;
                  height: 150px;
                  flex: 1;
                  overflow: hidden;
                  img {
                    cursor: pointer;
                    width: 100%;
                    height: 100%;
                    transition: all 0.4s;
                  }
                  img:hover {
                    transform: scale(1.2);
                  }
                }
                ul {
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                  padding: 0px;
                  margin-left: 20px;
                  height: 118px;
                  flex: 2;
                  li:first-child {
                    color: #000;
                    font-weight: 600;
                    font-size: 18px;
                    cursor: pointer;
                  }
                  li:first-child:hover {
                    color: #128bed;
                  }
                  li:last-child {
                    font-size: 13px;
                    color: #999;
                    display: flex;
                    justify-content: space-between;
                  }
                }
              }
            }
          }
        }
        // <!-- 更多内容 -->
        .morenei {
          margin: 0 auto;
          width: 100%;
          display: flex;
          justify-content: space-between;
          p {
            text-align: center;
            width: 49%;
            height: 40px;
            border-bottom: 1px solid #dddddd;
            color: #999;
            cursor: pointer;
            a {
              color: #000;
            }
            a:hover {
              color: #128bed;
            }
          }
        }
      }
      //  <!-- 企业查询 -->
      .qiyecha {
        margin: 100px auto;
        width: 70%;
        .el-tabs {
          width: 100%;
          .el-tab-pane {
            width: 100%;
            .shuhangye {
              width: 100%;
              ul {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                padding: 0;
                li {
                  width: 25%;
                  margin-bottom: 20px;
                  a {
                    font-size: 15px;
                    display: block;
                    width: 100%;
                    color: #666666;
                  }
                  a:hover {
                    color: #128bed;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  // 模态框区域
  .motaikuang {
    z-index: 1000;
    position: fixed;
    top: 0;
    left: 0;
    // transform: translateX(-50%);
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    // background-color: pink;
    .show-parent {
      position: fixed;
      top: 200px;
      left: 50%;
      transform: translateX(-50%);
      width: 40%;
      height: 450px;
      border-radius: 10px;
      background-color: #fff;
      .shard {
        position: absolute;
        top: 5px;
        right: 5px;
        color: #005fc1;
        font-size: 25px;
        font-weight: 900;
      }
      .guanggao {
        position: absolute;
        transform: translateY(-50%);
        top: 50%;
        left: 10px;
        width: 40%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        // background-color: red;
      }
      .dengluquyu {
        position: absolute;
        transform: translateY(-53%);
        top: 50%;
        right: 30px;
        width: 50%;
        height: 90%;
        // background-color: PINK;
        .tab-tit {
          padding: 0;
          display: flex;
          justify-content: space-around;
          // align-items: center;
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
          // margin-top: 30px;
          width: 100%;
          .hdjshjd {
            width: 100%;
            height: 100%;
            .hdjshjd-one {
              width: 100%;
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
            // .duanxin {
            //   margin-top: 20px;
            // }
            .drag_verify {
              margin-top: 18px !important;
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
}
// 移动端
.mobmain {
  width: 100%;
  .mobhome {
    width: 100%;
    height: 200px;
    background-color: #1354e2;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .mobtitle {
      width: 100%;
      margin: 0 auto;
      color: #fff;
      text-align: center;
      // padding-top: 10px;
    }
    // .mobxaiobiao {
    //   margin: 10px auto;
    //   color: #ffa500;
    // }
    .mobxaioshuru {
      width: 90%;
      display: flex;
      justify-content: center;
      align-items: center;
      input {
        display: inline-block;
        width: 70%;
        font-size: 14px;
        color: #333;
        border: none;
        outline: none;
        height: 36px;
        line-height: 20px;
        border-radius: 4px;
        padding-left: 10px;
      }
    }
  }
  .mobnewslist {
    width: 100%;
    .mobnew {
      width: 90%;
      margin: 0 auto;
      margin-bottom: 15px;
      display: flex;
      justify-content: space-between;
      border-bottom: 1px solid #e5e5e5;
      align-items: center;
      font-size: 15px;
    }
    .mobul {
      width: 90%;
      padding: 0;
      margin: 0 auto;
      li {
        width: 100%;
        height: 80px;
        margin-bottom: 20px;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .mobeltal {
          height: 20px !important;
          line-height: 20px;
        }
        .mabimg {
          width: 128px;
          height: 80px;
          // background-color: green;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .mabtext {
          width: 62%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-left: 10px;
          font-size: 13px;
          color: #333;
          p {
            width: 100%;
            height: 60px;
            margin: 0;
            white-space: normal;
            word-break: break-all;
            word-wrap: break-word;
          }
        }
      }
    }
  }
}
</style>
