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
                <span style="font-size:10px;">百科知识</span>
              </span>
            </p>
            <!--内容 -->
            <div class="detailsjreioh">
              <!-- 标题 -->
              <div class="titlefa">
                <h1>{{getarticdetall.title}}</h1>
                <p>
                  <span>来源:{{getarticdetall.encyclopedias_source}}</span>
                  <span class="shuxian">|</span>
                  <span>浏览:{{getarticdetall.reading_num}}</span>
                  <span class="shuxian">|</span>
                  <span>{{getarticdetall.issue_time}}</span>
                </p>
              </div>
              <div
                class="zhengwenyao"
                v-html="getarticdetall.encyclopedias_content"
              >{{getarticdetall.encyclopedias_content}}</div>
            </div>
            <p
              class="banquanshuo"
            >本文百科来源{{getarticdetall.encyclopedias_source}}，版权归原作者所有，内容仅代表作者本人观点，不代表搜企的立场。</p>
          </div>
          <div class="todayright">
            <!-- 广告码 -->
            <div class="guangma">
              <img src="../../assets/image/biao.png" alt />
            </div>
            <!-- 热门新闻 -->
            <div class="hotwenszh">
              <!-- 顶部标注 -->
              <div class="biaoheader">
                <p>热门新闻</p>
                <p @click="gotodaye">更多>></p>
              </div>
              <!-- 列表 -->
              <ul
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <li v-for="(item, index) in toplistall" :key="index">
                  <div class="shuzikuang">{{index+1}}</div>
                  <div class="biaotizi" @click="dainijiquxiang(item.id)">{{item.title}}</div>
                </li>
              </ul>
            </div>
            <!-- 企业百科 -->
            <div class="hotwenszh">
              <!-- 顶部标注 -->
              <div class="biaoheader">
                <p>百科知识</p>
                <p @click="goarticye">更多>></p>
              </div>
              <!-- 列表 -->
              <ul
                v-loading="loading"
                element-loading-text="拼命加载中"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(255,255,255,0.5)"
              >
                <li v-for="(item, index) in articlelistall" :key="index">
                  <div class="shuzikuang">{{index+1}}</div>
                  <div class="biaotizi" @click="daibaike(item.id)">{{item.title}}</div>
                </li>
              </ul>
            </div>
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
    <!-- 移动端代码-->
    <div v-if="!showxiang" class="mobcontent">
      <div class="mobdetailsjreioh">
        <!-- 标题 -->
        <div class="mobtitlefa">
          <h2>{{mobmainlistall.title}}</h2>
          <p>
            <span>来源: {{mobmainlistall.encyclopedias_source}}</span>
            <span class="shuxian">|</span>
            <span>浏览: {{mobmainlistall.reading_num}}</span>
            <span class="shuxian">|</span>
            <span>{{mobmainlistall.issue_time}}</span>
          </p>
        </div>
        <div
          class="mobzhengwenyao"
          v-html="mobmainlistall.encyclopedias_content"
        >{{mobmainlistall.encyclopedias_content}}</div>
        <p
          class="mobbanquanshuo"
        >本文新闻来源{{mobmainlistall.encyclopedias_source}}，版权归原作者所有，内容仅代表作者本人观点，不代表搜企的立场。</p>
      </div>
    </div>
  </div>
</template>
<script>
import headerl from '@/components/common/headerlan.vue'
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      mobmainlistall: {},
      // 控制pc端还是移动端----------------------------------------------------
      showxiang: true,
      timer: null,
      btnFlag: false,
      // 参数
      id: '',
      // 数据
      getarticdetall: {},
      // 新闻列表
      toplistall: [],
      // 百科列表
      articlelistall: [],
      loading: false
    }
  },
  computed: {},
  created() {
    // 接受传过来的参数id
    this.id = this.$route.params.articledet.split('.')[0]
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    this.getarticdetail()
    // 页面加载请求列表数据
    this.getnewlist()
    // 文章获取列表
    this.getarticlist()
    // this.backTop()
    // 可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w < 1025) {
      this.showxiang = false
    }
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
    // 点击百科列表去百科详情页面
    daibaike(val) {
      this.id = val
      // 替换当前的url地址的参数
      let newQuery = JSON.parse(JSON.stringify(this.$route.params))
      newQuery.articledet = `${val}.html`
      let routeParam = {
        params: newQuery
      }
      this.$router.push(routeParam)
      // 根据id 发请求
      this.getarticdetail()
      // 返回顶部
      this.backTop()
    },
    // 点击热门新闻列表去详情页面
    dainijiquxiang(value) {
      this.$router.push({
        name: 'todaydet',
        params: { todaydet: `${value}.html` }
      })
    },
    // 点击更多去新闻列表页面
    gotodaye() {
      this.$router.push({
        path: '/todaytitle'
      })
    },
    // 点击更多去百科列表页面
    goarticye() {
      this.$router.push({
        path: '/articlewe'
      })
    },
    // 文章获取列表
    async getarticlist() {
      this.openloding()
      const { data: res } = await this.$http.post('encyclopedias/encyclopedias_list/')
      // console.log(res)
      if (res.status !== 0) return this.$message.error('获取失败')
      this.loading = false
      this.articlelistall = res.results.slice(0, 10)
    },
    // 新闻列表请求
    async getnewlist() {
      this.openloding()
      const { data: res } = await this.$http.post('news/news_list/')
      if (res.status !== 0) return this.$message.error('获取失败')
      this.loading = false
      this.toplistall = res.results.slice(0, 10)
    },
    // 根据id进行发送请求详情信息
    async getarticdetail() {
      this.openloding()
      const { data: res } = await this.$http.post(`encyclopedias/detailed/${this.id}`)
      if (res.status !== 0) return this.$message.error('获取失败')
      console.log(res)
      this.loading = false
      res.results.issue_time = res.results.issue_time.split('T')[0]
      let w = document.documentElement.offsetWidth || document.body.offsetWidth
      if (w < 1025) {
        this.showxiang = false
        // 移动端数据格式图片固定
        this.mobmainlistall = res.results
        let mobstr = this.mobmainlistall.encyclopedias_content.split('img ')
        for (let i = 1; i <= mobstr.length - 1; i++) {
          mobstr[i] = `style="height:450px;width:310px" ${mobstr[i]}`
        }
        this.mobmainlistall.encyclopedias_content = mobstr.join('img ')
      } else {
        this.getarticdetall = res.results
      }
    }
  },
  components: {
    foTer,
    headerl
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
      // background-color: pink;
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      .guangma {
        width: 90%;
        height: 300px;
        margin-top: 50px;
        margin-bottom: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .hotwenszh {
        width: 90%;
        .biaoheader {
          margin-top: 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 25px;
          line-height: 25px;
          font-size: 18px;
          font-weight: 900;
          border-left: 5px solid #008bfe;
          p:first-child {
            margin-left: 10px;
          }
          p:last-child {
            margin-right: 2px;
            font-weight: 100;
            color: #ccc;
            cursor: pointer;
            font-size: 14px;
          }
        }
        ul {
          padding: 0;
          margin: 0;
          margin-top: 20px;
          // background-color: yellow;
          width: 100%;
          // height: 700px;
          li {
            display: flex;
            widows: 100%;
            height: 30px;
            margin-bottom: 10px;
            align-items: center;
            // background-color: red;
            .shuzikuang {
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              background-color: #008bfe;
              color: #fff;
              font-size: 10px;
            }
            .biaotizi {
              width: 98%;
              margin-left: 10px;
              font-size: 15px;
              cursor: pointer;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              color: #666666;
            }
            .biaotizi:hover {
              color: #008bfe;
            }
          }
        }
      }
    }
  }
}
// 移动端
.mobcontent {
  width: 100%;
  // padding: 0 20px;
  .mobdetailsjreioh {
    box-sizing: border-box;
    width: 95%;
    margin: 0 auto;
    .mobtitlefa {
      width: 100%;
      border-bottom: 1px solid #ccc;
      h2 {
        font-size: 18px;
      }
      p {
        font-size: 13px;
        color: #999;
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        span {
          padding-right: 10px;
        }
      }
    }
    .mobzhengwenyao {
      width: 100%;
      font-size: 14px;
    }
    .mobbanquanshuo {
      width: 100%;
      font-size: 10px;
      color: #999;
      border-top: 1px solid #ccc;
      line-height: 20px;
      height: 20px;
      padding-top: 10px;
    }
  }
}
</style>
