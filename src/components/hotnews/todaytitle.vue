<template>
  <div>
    <!-- pc端代码 -->
    <el-container v-if="showxiang">
      <el-header style="none">
        <!-- 顶部组件 -->
        <headerl></headerl>
      </el-header>
      <el-main>
        <div class="mianto">
          <div class="todayleft">
            <!-- 角标提示 -->
            <p style="margin:0">
              <span style="font-size:20px;color:#999;">
                <i class="el-icon-s-home"></i>
                <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                <i class="el-icon-right" style="font-size:10px;"></i>
                <span style="font-size:10px;">热门新闻</span>
              </span>
            </p>
            <!-- 文字提示 -->
            <div class="zhitishi">
              <i class="el-icon-s-order"></i>
              <span>大家都在看</span>
            </div>
            <!--内容 -->
            <span
              class="fuspa"
              :style="{'height':(loading ? '800px':'')}"
              v-loading="loading"
              element-loading-text="拼命加载中"
              element-loading-spinner="el-icon-loading"
              element-loading-background="rgba(255,255,255,0.5)"
            >
              <div class="wenzhangnei" v-for="(item,index) in toplist" :key="index">
                <div class="beijingtu" v-show="item.news_picture !== null">
                  <router-link :to="{name:'todaydet',params:{todaydet:`${item.id}.html`}}">
                    <img :src="`http://47.240.250.145:8000/${item.news_picture}`" alt />
                  </router-link>
                </div>
                <div class="wenzilist">
                  <!-- 标题 -->
                  <p class="titlebiao">
                    <router-link
                      :to="{name:'todaydet',params:{todaydet:`${item.id}.html`}}"
                    >{{getnewss(item.title)}}</router-link>
                  </p>
                  <p class="wenzijiaobiao">
                    <span>来源 :{{item.news_source}}</span>
                    <span>浏览：{{item.reading_num}}</span>
                    <span>{{item.issue_time}}</span>
                  </p>
                </div>
              </div>
            </span>
            <!-- 分页区域 -->
            <el-pagination
              @current-change="rentChange"
              :current-page="queryInfo.pagenum"
              :page-size="queryInfo.pagesize"
              layout=" prev, pager, next, total"
              :total="total"
              background
            ></el-pagination>
          </div>
          <div class="todayright"></div>
        </div>
      </el-main>
      <el-footer style="padding:0">
        <!-- 底部组件 -->
        <foTer></foTer>
      </el-footer>
    </el-container>
    <!-- 移动端代码 -->
    <div v-if="!showxiang" class="mobtitle">
      <ul class="mobul">
        <li v-for="(item, index) in toplist" :key="index">
          <router-link :to="{name:'todaydet',params:{todaydet:`${item.id}.html`}}">
            <div class="mabimg" v-if="item.news_picture!==null">
              <img :src="`http://47.240.250.145:8000/${item.news_picture}`" alt />
            </div>
            <div class="mabtext">
              <p>{{getnewss(item.title)}}</p>
              <p style="height:20px;color:#999;">{{item.issue_time}} 来源 :{{item.news_source}}</p>
            </div>
          </router-link>
        </li>
      </ul>
      <!-- 分页区域 -->
      <el-pagination
        @current-change="rentChange"
        :current-page="queryInfo.pagenum"
        :page-size="queryInfo.pagesize"
        layout=" prev, pager, next, total"
        :total="total"
        background
        small
      ></el-pagination>
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
      // 控制pc端还是移动端----------------------------------------------------
      showxiang: true,
      timer: '',
      // 查询参数对象
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10
      },
      // 保存前十条数据
      toplist: [],
      // 保存列总数表数据
      toplistall: [],
      // +++
      loading: false,
      // 总数据条数
      total: 0
    }
  },
  computed: {},
  created() {
    this.getnewlist()
  },
  mounted() {
    window.addEventListener('scroll', this.scrollToTop)
    this.backTop()
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
    // 判断标题长度
    getnewss(data) {
      if (data.length > 30) return data.substring(0, 30)
      return data
    },
    // 新闻列表请求
    async getnewlist() {
      // (++++)
      this.openloding()
      const { data: res } = await this.$http.post('news/news_list/')
      if (res.status !== 0) return this.$message.error('获取失败')
      this.loading = false
      for (let j = 0, len = res.results.length; j < len; j++) {
        res.results[j].issue_time = res.results[j].issue_time.split('T')[0]
      }
      // 数据总条数
      this.total = parseInt(res.results.length)
      this.toplistall = res.results
      // console.log(this.toplistall)
      // 将页码赋值
      if (window.sessionStorage.getItem('newPa3')) {
        this.queryInfo.pagenum = parseInt(window.sessionStorage.getItem('newPa3'))
        this.rentChange(this.queryInfo.pagenum)
      } else {
        // 数据前十条
        this.toplist = res.results.slice(0, 10)
      }
    },
    rentChange(newPa) {
      // console.log(newPage)
      this.queryInfo.pagenum = newPa
      window.sessionStorage.setItem('newPa3', newPa)
      // 页码保存到sessionStorage中
      this.toplist = this.toplistall.slice(newPa * 10 - 10, newPa * 10)
      this.backTop()
    }
  },
  components: {
    foTer,
    headerl
  },
  beforeDestroy() {
    window.sessionStorage.removeItem('newPa3')
    window.clearInterval(this.timer)
  },
  destroyed() {
    window.removeEventListener('scroll', this.scrollToTop)
  }
}
</script>

<style lang="less" scoped>
// pc端
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
      .zhitishi {
        margin: 30px 0;
        margin-bottom: 10px;
        i {
          color: #48a2ff;
          font-weight: 900;
          font-size: 20px;
        }
        span {
          margin-left: 10px;
          color: #333333;
          font-weight: 700;
        }
      }
      .fuspa {
        width: 100%;
        display: block;
      }
      .wenzhangnei {
        display: flex;
        align-items: center;
        width: 100%;
        height: 150px;
        border-bottom: 1px solid #ccc;
        .beijingtu {
          width: 150px;
          height: 120px;
          overflow: hidden;
          // background-color: green;
          img {
            width: 100%;
            height: 100%;
            cursor: pointer;
            transition: all 0.6s;
          }
          img:hover {
            transform: scale(1.4);
          }
        }
        .wenzilist {
          height: 150px;
          margin-left: 20px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          .titlebiao {
            // margin-top: 40px;
            cursor: pointer;
            font-weight: 900;
            a {
              color: #333333;
            }
            a:hover {
              color: #128bed;
            }
          }
          .wenzijiaobiao {
            display: flex;
            justify-content: space-between;
            span {
              margin-right: 100px;
              font-size: 13px;
              color: #999999;
            }
          }
        }
      }
      .el-pagination {
        margin: 20px auto;
      }
    }
    .todayright {
      width: 30%;
      height: 1500px;
    }
  }
}
// 移动端
.mobtitle {
  width: 100%;
  .mobul {
    width: 93%;
    padding: 0;
    margin: 0 auto;
    li {
      width: 100%;
      height: 80px;
      margin-bottom: 20px;
      a {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        width: 100%;
        height: 100%;
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
    li:first-child {
      margin-top: 10px;
    }
    li:last-child {
      margin-bottom: 0px;
    }
  }
}
</style>
