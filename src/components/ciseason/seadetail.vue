<template>
  <div>
    <el-container>
      <el-header style="none">
        <!-- 顶部组件 -->
        <headerl></headerl>
      </el-header>
      <el-main>
        <div class="mainzhong">
          <div
            class="detaileft"
            v-loading="loading"
            element-loading-text="拼命加载中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255,255,255,0.5)"
          >
            <p style="margin:0">
              <span style="font-size:20px;color:#999;">
                <i class="el-icon-s-home"></i>
                <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                <i class="el-icon-right" style="font-size:10px;"></i>
                <a style="font-size:10px;color:#128BED" @click="huiquahdui" href="javascript:;">列表页</a>
                <i class="el-icon-right" style="font-size:10px;"></i>
                <span style="font-size:10px;">详情页</span>
              </span>
            </p>
            <!-- 公司具体页面 -->
            <div class="jianjiewai">
              <div class="jianjie">
                <div class="neibu">
                  <div class="neibuleft" v-if="this.national">
                    <p class="nameg">
                      <a href="javascript:;">{{objresults.enterprise_name}}</a>
                    </p>
                    <p class="doup">
                      <span style="margin-right:30px;">
                        股票代码：
                        <a href="javascript:;">{{objresults.stock_code}}</a>
                      </span>
                      <span style="margin-right:30px;">股票简称：{{objresults.stock_name}}</span>
                      <span>成立日期 :{{objresults.establish_date}}</span>
                    </p>
                    <p class="doup">
                      <span>上市日期：{{objresults.stock_date}}</span>
                    </p>
                    <p class="doup">地址：{{objresults.province}}{{objresults.area}}</p>
                  </div>
                  <div class="neibuleft" v-if="this.hong">
                    <p class="nameg">
                      <a href="javascript:;">{{objresults.enterprise_name}}</a>
                    </p>
                    <p class="doup">
                      <span style="margin-right:30px;">
                        股票代码：
                        <a href="javascript:;">{{objresults.stock_code}}</a>
                      </span>
                      <span style="margin-right:30px;">股票简称：{{objresults.stock_name}}</span>
                      <!-- <span>成立日期 :{{objresults.establish_date}}</span> -->
                    </p>
                    <p class="doup">
                      <span>上市日期：{{objresults.stock_date}}</span>
                    </p>
                    <p class="doup">地址：{{objresults.work_address}}</p>
                  </div>
                  <div class="neibuleft" v-if="this.appear">
                    <p class="nameg">
                      <a href="javascript:;">{{objresults.enterprise_name}}</a>
                    </p>
                    <p class="doup">
                      <span style="margin-right:30px;">
                        股票代码：
                        <a href="javascript:;">{{objresults.stock_code}}</a>
                      </span>
                      <span style="margin-right:30px;">股票简称：{{objresults.stock_name}}</span>
                      <!-- <span>成立日期 :{{objresults.establish_date}}</span> -->
                    </p>
                    <p class="doup">
                      <span>上市日期：{{objresults.stock_date}}</span>
                    </p>
                    <p class="doup">地址：{{objresults.province + objresults.area}}</p>
                  </div>
                  <!-- <div class="neiburight">
                    <div v-if="objresults.manage_state === '暂无'">
                      <div style="color:#999;font-size:15px;padding-left:8px;margin-bottom:10px;">状态</div>
                      <div style="color:#409EFF;padding-left:16px;margin-bottom:10px;">
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                      <div>
                        <el-tag size="medium">{{objresults.manage_state}}</el-tag>
                      </div>
                    </div>
                    <div
                      v-if="objresults.manage_state === '存续' || objresults.manage_state === '在业' || objresults.manage_state === '正常' || objresults.manage_state === '仍注册'|| objresults.manage_state === '核准设立'"
                    >
                      <div style="color:#999;font-size:15px;padding-left:8px;margin-bottom:10px;">状态</div>
                      <div style="color:#67C23A;padding-left:16px;margin-bottom:10px;">
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                      <el-tag type="success" size="medium">{{objresults.manage_state}}</el-tag>
                    </div>
                    <div
                      v-if="objresults.manage_state === '注销'|| objresults.manage_state === '吊销'|| objresults.manage_state === '废止' ||objresults.manage_state === '迁出'||objresults.manage_state === '解散'||objresults.manage_state === '撤销' ||objresults.manage_state === '解散清算完结'"
                    >
                      <div style="color:#999;font-size:15px;padding-left:8px;margin-bottom:10px;">状态</div>
                      <div style="color:#F56C6C;padding-left:16px;margin-bottom:10px;">
                        <i class="el-icon-caret-bottom"></i>
                      </div>
                      <el-tag type="danger" size="medium">{{objresults.manage_state}}</el-tag>
                    </div>
                  </div>-->
                </div>
              </div>
            </div>
            <!-- 公司信息列表 -->
            <div class="infobiao">
              <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                  <el-collapse v-model="activeNas" @change="handleCh">
                    <el-collapse-item title="工商信息" name="1" v-if="this.appear">
                      <ul class="xiangqiang">
                        <li>企业名称</li>
                        <li>{{objresults.enterprise_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属地区</li>
                        <li>{{objresults.province}}{{objresults.area}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属行业</li>
                        <li>{{objresults.industry_category}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票代码</li>
                        <li>{{objresults.stock_code}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票简称</li>
                        <li>{{objresults.stock_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>主营业务收入</li>
                        <li>{{objresults.main_business_income}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>净利润</li>
                        <li>{{objresults.retained_profits}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>员工人数</li>
                        <li>{{objresults.staff_num}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>上市日期</li>
                        <li>{{objresults.stock_date}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>产品类型</li>
                        <li>{{objresults.product_type}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>主营业务</li>
                        <li>{{objresults.main_business}}</li>
                      </ul>
                      <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                    </el-collapse-item>
                    <el-collapse-item title="工商信息" name="1" v-if="this.hong">
                      <ul class="xiangqiang">
                        <li>企业名称</li>
                        <li>{{objresults.enterprise_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属行业</li>
                        <li>{{objresults.industry_category}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票代码</li>
                        <li>{{objresults.stock_code}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票简称</li>
                        <li>{{objresults.stock_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>注册地址</li>
                        <li>{{objresults.work_address}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>主营业务收入</li>
                        <li>{{objresults.main_business_income}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>净利润</li>
                        <li>{{objresults.retained_profits}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>员工人数</li>
                        <li>{{objresults.staff_num}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>上市日期</li>
                        <li>{{objresults.stock_date}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>主营业务</li>
                        <li>{{objresults.main_business}}</li>
                      </ul>
                      <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                    </el-collapse-item>
                    <el-collapse-item title="工商信息" name="1" v-if="this.national">
                      <ul class="xiangqiang">
                        <li>企业名称</li>
                        <li>{{objresults.enterprise_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属地区</li>
                        <li>{{objresults.province}}{{objresults.area}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属行业</li>
                        <li>{{objresults.industry_category}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票代码</li>
                        <li>{{objresults.stock_code}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>股票简称</li>
                        <li>{{objresults.stock_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>成立日期</li>
                        <li>{{objresults.establish_date}}</li>
                      </ul>
                      <!-- <ul class="xiangqiang">
                        <li>注册地址</li>
                        <li>{{objresults.work_address}}</li>
                      </ul>-->
                      <ul class="xiangqiang">
                        <li>主营业务收入</li>
                        <li>{{objresults.main_business_income}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>净利润</li>
                        <li>{{objresults.retained_profits}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>员工人数</li>
                        <li>{{objresults.staff_num}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>上市日期</li>
                        <li>{{objresults.stock_date}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>产品类型</li>
                        <li>{{objresults.product_type}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>主营业务</li>
                        <li>{{objresults.main_business}}</li>
                      </ul>
                      <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                    </el-collapse-item>
                  </el-collapse>
                </el-tab-pane>
              </el-tabs>
            </div>
            <!-- 底标 -->
            <div style="color:#999999;font-size:15px; margin:20px 0">
              数据来源:
              <span>{{objresults.enterprise_name}}</span>
            </div>
          </div>
          <div class="detailright"></div>
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
import headerl from '@/components/common/headerlan.vue'
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
      appear: false,
      hong: false,
      national: false,
      // 默认第一个
      activeName: 'first',
      activeNas: ['1'],
      // 接受传过来的参数
      id: '',
      // 接受传过来的索引
      indexid: '',
      // 保存公司详情信息
      objresults: {},
      loading: false
    }
  },
  computed: {},
  created() {
    // 获取上个页面传递的id,在下面获取数据的时候先提交id
    this.id = parseInt((this.$route.params.seadetail || '').split('.')[0])
    // 接受传过来的索引
    this.indexid = parseInt(this.$route.params.biao)
    // console.log(this.indexid)
    // console.log(this.id)
  },
  mounted() {
    this.shifounan()
    // 页面加载既请求
    this.company()
  },
  watch: {},
  methods: {
    // 判断刷新页面时this.indexid是否为NaN 如果是就提取indeidva
    shifounan() {
      // console.log(this.indexid)
      // console.log(this.id)
      // console.log(this.indexid.toString() !== 'NaN')
      if (this.indexid.toString() !== 'NaN') return
      this.indexid = parseInt(window.sessionStorage.getItem('indexidva'))
      // console.log(this.indexid)
      // console.log(this.id)
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
    // 返回上一页分类页
    huiquahdui() {
      this.$router.go(-1)
    },
    // 企业详情接口api 调用：
    async company() {
      if (this.indexid === 0) {
        // 开始加载效果
        this.openloding()
        const { data: res } = await this.$http.get(`enterprise/A/detailed/${this.id}`)
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取数据失败')
        this.loading = false
        window.sessionStorage.setItem('indexidva', this.indexid)
        // 把数据赋值给空对象保存
        this.appear = true
        this.national = false
        this.hong = false
        res.results.stock_date = res.results.stock_date.split(' ')[0]
        // console.log(res.results)
        this.objresults = res.results
      } else if (this.indexid === 1) {
        // 开始加载效果
        this.openloding()
        const { data: res } = await this.$http.get(`enterprise/G/detailed/${this.id}`)
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取数据失败')
        this.loading = false
        window.sessionStorage.setItem('indexidva', this.indexid)
        this.appear = false
        this.national = false
        this.hong = true
        // 把数据赋值给空对象保存
        res.results.stock_date = res.results.stock_date.split(' ')[0]
        this.objresults = res.results
      } else {
        // 开始加载效果
        this.openloding()
        const { data: res } = await this.$http.get(`enterprise/XSB/detailed/${this.id}`)
        // console.log(res)
        if (res.status !== 0) return this.$message.error('获取数据失败')
        this.loading = false
        window.sessionStorage.setItem('indexidva', 2)
        this.appear = false
        this.national = true
        this.hong = false
        res.results.stock_date = res.results.stock_date.split(' ')[0]
        res.results.establish_date = res.results.establish_date.split(' ')[0]
        // 把数据赋值给空对象保存
        this.objresults = res.results
      }
    },
    // 切换每个table栏切换触发
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 折叠栏
    handleCh(val) {
      // console.log(val)
    }
  },
  components: {
    foTer,
    headerl
  }
  // beforeDestroy() {
  //   window.sessionStorage.removeItem('indexidva')
  // }
}
</script>
<style lang="less" scoped>
.el-header {
  border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
}
// 中部
.el-main {
  padding: 0;
  width: 100%;
  .mainzhong {
    width: 70%;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    // height: 1000px;
    .detaileft {
      width: 70%;
      height: 100%;
      .jianjiewai {
        padding: 0;
        margin-top: 20px;
        width: 100%;
        background-color: #e2ebf0;
        height: 140px;
        .jianjie {
          width: 100%;
          .neibu {
            padding-top: 8px;
            width: 100%;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .neibuleft {
              margin-left: 10px;
              .nameg {
                margin: 0;
                a {
                  color: #000;
                  font-weight: 900;
                  font-size: 20px;
                }
              }
              .doup {
                color: #999;
                font-size: 14px;
                a {
                  color: #000;
                }
              }
            }
            .neiburight {
              margin-right: 10px;
              .el-tag {
                width: 50px;
              }
            }
          }
        }
      }
      .infobiao {
        width: 100%;
        margin-top: 40px;
        .el-tabs {
          width: 100%;
          // height: 900px;
        }
        .el-collapse {
          width: 100%;
          padding: 0;
          .xiangqiang {
            border: 2px solid #e4f4fe;
            height: 40px;
            line-height: 40px;
            font-size: 15px;
            padding: 0;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            li:first-child {
              margin-right: 10px;
              width: 25%;
              border-right: 1px solid #e4f4fe;
              background-color: #e2ebf0;
            }
          }
          .fanweijing {
            border: 2px solid #e4f4fe;
            padding: 0;
            width: 100%;
            display: flex;
            justify-content: flex-start;
            li:first-child {
              width: 30%;
              border-right: 1px solid #e4f4fe;
              background-color: #e2ebf0;
            }
          }
        }
      }
    }
    .detailright {
      width: 30%;
      height: 1000px;
    }
  }
}
</style>
