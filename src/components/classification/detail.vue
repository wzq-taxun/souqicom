<template>
  <div>
    <!-- pc端代码 -->
    <el-container v-if="showxiang">
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
                <a
                  style="font-size:10px;color:#128BED"
                  @click="huiquahdui"
                  href="javascript:;"
                >分类|搜索页</a>
                <i class="el-icon-right" style="font-size:10px;"></i>
                <span style="font-size:10px;">详情页</span>
              </span>
            </p>
            <!-- 公司具体页面 -->
            <div class="jianjiewai">
              <div class="jianjie">
                <div class="neibu">
                  <div class="neibuleft">
                    <p class="nameg">
                      <a href="javascript:;">{{objresults.enterprise_name}}</a>
                    </p>
                    <p class="doup">
                      <span style="margin-right:30px;">
                        法定代表人：
                        <a href="javascript:;">{{objresults.legal_representative}}</a>
                      </span>
                      <span style="margin-right:30px;">注册资本： {{objresults.register_fund}}</span>
                      <span>成立日期： {{objresults.establish_date}}</span>
                    </p>
                    <p class="doup">
                      <span style="margin-right:30px;">邮箱：{{objresults.email}}</span>
                      <span>电话：{{objresults.phone_num}}</span>
                    </p>
                    <p class="doup">地址：{{objresults.enterprise_address}}</p>
                  </div>
                  <div class="neiburight">
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
                      class="pinjun"
                      v-if="objresults.manage_state === '存续' || objresults.manage_state === '在业' || objresults.manage_state === '正常' || objresults.manage_state === '仍注册'|| objresults.manage_state === '核准设立'"
                    >
                      <div style="color:#999;font-size:15px;">状态</div>
                      <div style="color:#67C23A;margin:10px 0;">
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
                  </div>
                </div>
              </div>
            </div>
            <!-- 公司信息列表 -->
            <div class="infobiao">
              <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
                <el-tab-pane label="基本信息" name="first">
                  <el-collapse v-model="activeNas" @change="handleCh">
                    <el-collapse-item title="工商信息" name="1">
                      <ul class="xiangqiang">
                        <li>公司名称</li>
                        <li>{{objresults.enterprise_name}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属地区</li>
                        <li>{{objresults.province}}{{objresults.city}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>所属行业</li>
                        <li>{{objresults.industry_involved}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>成立日期</li>
                        <li>{{objresults.establish_date}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>注册资本</li>
                        <li>{{objresults.register_fund}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>法定代表人</li>
                        <li>{{objresults.legal_representative}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>公司登记状态</li>
                        <li>{{objresults.manage_state}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>注册号</li>
                        <li>{{objresults.register_id}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>统一社会信用代码</li>
                        <li>{{objresults.unified_credit_code}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>组织机构代码</li>
                        <li>{{objresults.organizing_organization_code}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>参保人员</li>
                        <li>{{objresults.insured_number}} 人</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>公司类型</li>
                        <li>{{objresults.enterprise_type}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>企业地址</li>
                        <li>{{objresults.enterprise_address}}</li>
                      </ul>
                      <ul class="xiangqiang">
                        <li>公司官网</li>
                        <li>{{objresults.URL}}</li>
                      </ul>
                      <ul class="fanweijing">
                        <li>经营范围</li>
                        <li>{{objresults.business_scope}}</li>
                      </ul>
                      <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
                    </el-collapse-item>
                    <el-collapse-item title="税务登记信息" name="2">
                      <ul class="xiangqiang">
                        <li>纳税人识别号</li>
                        <li>
                          <a href="javascript:;">{{objresults.taxpayer_discern_id}}</a>
                        </li>
                      </ul>
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
    <!-- 移动端代码 -->
    <div v-if="!showxiang" class="mobdetaile">
      <!-- 头部 -->
      <div class="mobher">
        <h1>{{objresults.enterprise_name}}</h1>
        <p>
          <el-tag class="mobeltal">{{objresults.manage_state}}</el-tag>
          <span style="color:#999">
            邮箱:
            {{objresults.email}}
          </span>
        </p>
      </div>
      <div class="mobinfobiao">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="基本信息" name="first">
            <el-collapse v-model="activeNas" @change="handleCh">
              <el-collapse-item title="工商信息" name="1">
                <ul class="xiangqiang">
                  <li>公司名称</li>
                  <li>{{objresults.enterprise_name}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>所属地区</li>
                  <li>{{objresults.province}}{{objresults.city}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>所属行业</li>
                  <li>{{objresults.industry_involved}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>成立日期</li>
                  <li>{{objresults.establish_date}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>注册资本</li>
                  <li>{{objresults.register_fund}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>法定代表人</li>
                  <li>{{objresults.legal_representative}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>公司登记状态</li>
                  <li>{{objresults.manage_state}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>注册号</li>
                  <li>{{objresults.register_id}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>统一社会信用代码</li>
                  <li>{{objresults.unified_credit_code}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>组织机构代码</li>
                  <li>{{objresults.organizing_organization_code}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>参保人员</li>
                  <li>{{objresults.insured_number}} 人</li>
                </ul>
                <ul class="xiangqiang">
                  <li>公司类型</li>
                  <li>{{objresults.enterprise_type}}</li>
                </ul>
                <ul class="fanweijing">
                  <li>企业地址</li>
                  <li>{{objresults.enterprise_address}}</li>
                </ul>
                <ul class="xiangqiang">
                  <li>公司官网</li>
                  <li>{{objresults.URL}}</li>
                </ul>
                <ul class="fanweijing">
                  <li>经营范围</li>
                  <li>{{objresults.business_scope}}</li>
                </ul>
                <!-- <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div> -->
              </el-collapse-item>
              <el-collapse-item title="税务登记信息" name="2">
                <ul class="xiangqiang">
                  <li>纳税人识别号</li>
                  <li>
                    <a href="javascript:;">{{objresults.taxpayer_discern_id}}</a>
                  </li>
                </ul>
              </el-collapse-item>
            </el-collapse>
          </el-tab-pane>
        </el-tabs>
        <!-- 底标 -->
        <div style="color:#999999;font-size:10px; margin:20px 0">
          数据来源:
          <span>{{objresults.enterprise_name}}</span>
        </div>
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
      // 控制pc端还是移动端----------------------------------------------------
      showxiang: true,
      // 默认第一个
      activeName: 'first',
      activeNas: ['1'],
      // 接受传过来的参数
      id: '',
      // 保存公司详情信息
      objresults: {},
      loading: false
    }
  },
  computed: {},
  created() {
    this.id = parseInt(this.$route.params.detail.split('.')[0]) // 获取上个页面传递的id,在下面获取数据的时候先提交id
  },
  mounted() {
    // this.yantoken1()
    // 页面加载既请求
    this.company()
    // 可用于设置自适应屏幕，根据获得的可视宽度（兼容性）判断是否显示
    let w = document.documentElement.offsetWidth || document.body.offsetWidth
    if (w < 1025) {
      this.showxiang = false
    }
  },
  watch: {},
  methods: {
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
      //  拼接路径 模板字符串
      let urljin = `enterprise/detailed/${this.id}`
      // 开始加载效果
      this.openloding()
      const { data: res } = await this.$http.get(urljin)
      // console.log(res)
      if (res.status !== 0) {
        return this.$message({
          type: 'error',
          message: '获取数据失败',
          duration: 1000
        })
      }
      this.loading = false
      // 把数据赋值给空对象保存
      this.objresults = res.results
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
              .pinjun {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
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
// 移动端代码
.mobdetaile {
  width: 100%;
  .mobher {
    width: 95%;
    display: flex;
    margin: 0 auto;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    h1 {
      font-size: 20px;
    }
    p {
      margin-top: 0px;
      font-size: 14px;
      .mobeltal {
        height: 20px !important;
        line-height: 20px;
      }
    }
  }
  .mobinfobiao {
    width: 95%;
    margin: 0 auto;
    .xiangqiang {
      padding-left: 0px;
      li:first-child {
        color: #999;
      }
    }
    .fanweijing {
      padding-left: 0px;
      li:first-child {
        color: #999;
      }
    }
  }
}
</style>
