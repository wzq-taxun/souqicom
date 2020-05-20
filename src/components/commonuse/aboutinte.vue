<template>
  <div>
    <el-container v-if="showxiang">
      <el-header style="none">
        <!-- 顶部组件 -->
        <headerl></headerl>
      </el-header>
      <el-main>
        <div class="mianto">
          <div
            class="todayleft"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255,255,255,0.5)"
          >
            <!-- 角标提示 -->
            <p style="margin:0">
              <span style="font-size:20px;color:#999;">
                <i class="el-icon-s-home"></i>
                <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                <i class="el-icon-right" style="font-size:10px;"></i>
                <span style="font-size:10px;">文章正文</span>
              </span>
            </p>
            <!--内容 -->
            <div class="detailsjreioh">
              <!-- 标题 -->
              <div class="titlefa">
                <h1>{{mainlistall.title}}</h1>
                <p>
                  <span>
                    <i class="el-icon-discover"></i>
                    {{mainlistall.consulting_source}}
                  </span>
                  <span class="shuxian">|</span>
                  <span>
                    <i class="el-icon-view"></i>
                    {{mainlistall.reading_num}}
                  </span>
                  <span class="shuxian">|</span>
                  <span>
                    <i class="el-icon-date"></i>
                    {{mainlistall.issue_time}}
                  </span>
                </p>
              </div>
              <div
                class="zhengwenyao"
                v-html="mainlistall.consulting_content"
              >{{mainlistall.consulting_content}}</div>
            </div>
            <!--版权说明 -->
            <p
              class="banquanshuo"
            >本文来源{{mainlistall.consulting_source}}，版权归原作者所有，内容仅代表作者本人观点，不代表搜企的立场。</p>
          </div>
          <div class="todayright">
            <over class="ovway">
              <div class="clearfix">
                <!-- <span>热门资讯</span> -->
                <p>热门资讯</p>
                <p class="moreinte" @click="gomoretoolist()">查看更多</p>
              </div>
              <div class="ovsodiv" v-for="(item, index) in toolarticleall" :key="index">
                <div
                  class="mabimg"
                  v-show="item.consulting_picture !== null"
                  @click="goaboutintepage(item.id)"
                >
                  <img :src="`http://47.240.250.145:8000/${item.consulting_picture}`" alt />
                </div>
                <div class="mabtext">
                  <p class="tititoll" @click="goaboutintepage(item.id)">{{ getTitle(item.title)}}</p>
                  <p style="height:20px;color:#999999;">{{ item.issue_time}}</p>
                </div>
              </div>
            </over>
          </div>
        </div>
      </el-main>
      <el-footer style="padding:0">
        <!-- 底部组件 -->
        <foTer></foTer>
      </el-footer>
    </el-container>
    <i
      v-show="showxiang"
      v-if="btnFlag"
      @click="backTop"
      class="el-icon-caret-top"
      style="position:fixed;bottom:15%;right:2%;color:#008BFE;"
    >顶部</i>
  </div>
</template>

<script>
import headerl from '@/components/common/headerlan.vue'
import foTer from '@/components/common/FoTer.vue'
import over from '@/components/common/overwa.vue'
export default {
  props: {},
  data() {
    return {
      showxiang: true,
      timer: null,
      btnFlag: false,
      // 存放获取的文章
      toolarticleall: [],
      // tools_name_id：工具id
      tools_id: '',
      // id值
      id: '',
      // 保存页面详情页
      mainlistall: {},
      loading: false
    }
  },
  computed: {},
  created() {
    // 接受功能相关文章传递过来的id参数
    this.id = this.$route.params.aboutdkid.split('.')[0]
    // console.log(this.id)
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    // 发请求
    this.gettodaydetail()
  },
  watch: {},
  methods: {
    // 点击查看更多去列表页面
    gomoretoolist() {
      this.$router.push({
        name: 'toolslist',
        params: { valtolid: `${this.tools_id}.html` }
      })
    },
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
    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      that.scrollTop = scrollTop
      if (that.scrollTop > 200) {
        that.btnFlag = true
      } else {
        that.btnFlag = false
      }
    },
    // 开启加载的函数(+++++)
    openloding() {
      // 控制lodaing的真假(+++++++)
      this.loading = true
      // 5秒后不关闭加载（+++++）
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    // 携带对应的文章id 去详情页面
    goaboutintepage(intevalue) {
      this.$router.push({
        name: 'toolbook',
        params: { aboutdkid: `${intevalue}.html` }
      })
      // 将id进行更改
      this.id = intevalue
      // 发送请求详情信息
      this.gettodaydetail()
    },
    // 根据id进行发送请求详情信息
    async gettodaydetail() {
      this.openloding()
      const { data: res } = await this.$http.post(`souqi/admin/consulting/detailed/`, { consulting_id: this.id })
      console.log(res)
      if (res.status !== 1) return this.$message.error(res.msg)
      this.loading = false
      res.results.issue_time = res.results.issue_time.split('T')[0]
      let w = document.documentElement.offsetWidth || document.body.offsetWidth
      if (w < 1025) {
        this.showxiang = false
        // 移动端数据格式图片固定
        this.mobmainlistall = res.results
        let mobstr = this.mobmainlistall.news_content.split('img ')
        for (let i = 1; i <= mobstr.length - 1; i++) {
          mobstr[i] = `style="height:450px;width:310px" ${mobstr[i]}`
        }
        this.mobmainlistall.news_content = mobstr.join('img ')
      } else {
        this.mainlistall = res.results
        // 该篇文章所对应的工具id
        this.tools_id = res.results.associated_tools
      }
      // 调用获取对应功能的文章列表
      this.gettoolarticle()
    },
    // 判断标题的长短
    getTitle(data) {
      if (data.length > 10) return data.substring(0, 10)
      return data
    },
    // 获取对应功能的文章列表
    async gettoolarticle() {
      const { data: res } = await this.$http.post('souqi/admin/tool/consulting/', { tools_name_id: this.tools_id })
      console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].issue_time = res.results[i].issue_time.split('T')[0]
      }
      this.toolarticleall = res.results.slice(0, 5)
    }
  },
  components: {
    foTer,
    headerl,
    over
  },
  beforeDestroy() {
    window.clearInterval(this.timer)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="less" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
}
.el-main {
  width: 100%;
  padding: 0 0;
  .mianto {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    .todayleft {
      width: 70%;
      height: 100%;
      .detailsjreioh {
        width: 100%;
        .titlefa {
          width: 100%;
          height: 120px;
          border-bottom: 1px solid #ccc;
          margin-top: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          h1 {
            padding-left: 20px;
            width: 100%;
          }
          p {
            color: #999;
            font-size: 13px;
            padding-left: 20px;
            .shuxian {
              margin: 0 20px;
            }
          }
        }
        .zhengwenyao {
          width: 100%;
          box-sizing: border-box;
          padding: 0 20px !important;
          word-wrap: break-word;
          word-break: break-all;
          margin: 40px 0;
          color: #333333;
          .xaingpicmg {
            width: 100%;
            margin: 20px 0;
            img {
              display: block;
              margin: 0 auto;
            }
          }
        }
      }
      .banquanshuo {
        height: 40px;
        width: 100%;
        line-height: 40px;
        font-size: 13px;
        color: #9999a5;
        border-top: 1px solid #ccc;
      }
    }
    .todayright {
      width: 30%;
      height: 1500px;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .ovway {
        width: 100%;
        .clearfix {
          margin-top: 80px;
          display: flex;
          justify-content: space-between;
          padding-right: 20px;
          padding-bottom: 15px;
          .moreinte {
            color: #ccc;
            cursor: pointer;
          }
          .moreinte:hover {
            color: #008bfe;
          }
        }
        .ovsodiv {
          width: 100%;
          padding-left: 20px;
          height: 70px;
          display: flex;
          margin-top: 20px;
          justify-content: flex-start;
          .mabimg {
            width: 20%;
            height: 64px;
            overflow: hidden;
            img {
              width: 100%;
              height: 100%;
              transition: all 0.8s;
            }
            img:hover {
              transform: scale(1.2);
            }
          }
          .mabtext {
            width: 60%;
            height: 64px;
            margin-left: 10px;
            font-size: 13px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-top: 5px;
            p {
              color: #6f6f6f;
              width: 100%;
              // margin-top: 15px;
              white-space: normal;
              word-break: break-all;
              word-wrap: break-word;
            }
            .tititoll {
              font-size: 14px;
              font-weight: 700px;
              color: #111111;
              margin-top: 0px;
            }
            .tititoll:hover {
              color: #008bfe;
              cursor: pointer;
            }
          }
          .mabimg:hover {
            cursor: pointer;
          }
        }
      }
    }
  }
}
</style>
