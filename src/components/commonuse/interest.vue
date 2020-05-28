<template>
  <div>
    <el-container>
      <el-header style="none">
        <!-- 顶部组件 -->
        <headerl></headerl>
      </el-header>
      <el-main>
        <div class="el-main-inter">
          <el-card class="box-card">
            <div class="box-tu">
              <p class="pfist">
                <img src="../../assets/image/logotou.png" alt />
              </p>
              <p>
                <span style="font-size:20px;color:#999;">
                  <i class="el-icon-s-home"></i>
                  <router-link style="font-size:10px;color:#128BED" to="/">首页</router-link>
                  <i class="el-icon-right" style="font-size:10px;"></i>
                  <span style="font-size:10px;">{{showvalzhi}}</span>
                </span>
              </p>
            </div>
            <div class="box-inter">
              <!-- 贷款项 -->
              <div class="butdaikuan">
                <!--table选项栏 -->
                <ul>
                  <li>个人贷款计算器</li>
                </ul>
                <!-- 表格 -->
                <div class="foritem">
                  <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
                    <el-form-item label="贷款金额:">
                      <el-input v-model="sizeForm.sum" type="number">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="开始日期:">
                      <el-date-picker
                        v-model="value1"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="结束日期:">
                      <el-date-picker
                        v-model="value2"
                        type="date"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                        style="width: 100%;"
                      ></el-date-picker>
                    </el-form-item>
                    <el-form-item label="利率方式:">
                      <el-select
                        v-model="sizeForm.region"
                        placeholder="请选择利率方式"
                        style="width:100%;"
                      >
                        <el-option label="年利率" value="1"></el-option>
                        <el-option label="月利率" value="2"></el-option>
                        <el-option label="日利率" value="3"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="自定义利率:">
                      <el-input v-model="sizeForm.mysetqian" type="number">
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="年利率:">
                      <el-input v-model="sizeForm.yearqian" disabled>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="月利率:">
                      <el-input v-model="sizeForm.monthqian" disabled>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="日利率:">
                      <el-input v-model="sizeForm.dayqian" disabled>
                        <template slot="append">%</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item size="mini" style="display:flex;justify-content:space-between;">
                      <el-button type="primary" @click="onSubmit" :disabled="isDisable">计算</el-button>
                      <el-button type="primary" style="margin-left:80px;" @click="onreset">重置</el-button>
                    </el-form-item>
                  </el-form>
                  <el-form ref="form" :model="sizetab" label-width="120px" size="mini">
                    <p>等额本息还贷法</p>
                    <el-form-item label="累计支付利息:">
                      <el-input v-model="sizetab.itema" disabled>
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="累计还款总额:">
                      <el-input v-model="sizetab.itemb" disabled>
                        <template slot="append">
                          元
                          <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            title="个人贷款计算器计算结果"
                            :disabled="aredisabled"
                          >
                            <!-- 还款计划表 -->
                            <div class="kuanways">
                              <ul
                                style="display:flex;justify-content:space-between;margin:0;padding:0;"
                              >
                                <li class="dnkshdk">还款方式</li>
                                <li class="dnkshdk othershu">等额本息还贷</li>
                                <li class="dnkshdk">还款总额</li>
                                <li class="dnkshdk othershu">{{sizetab.itemb}}</li>
                                <li class="dnkshdk">利息总额</li>
                                <li
                                  class="dnkshdk othershu"
                                  style="border-right:1px solid #ccc"
                                >{{sizetab.itema}}</li>
                              </ul>
                              <el-table :data="tablelist" style="width: 100%" height="400">
                                <el-table-column prop="0" label="期数"></el-table-column>
                                <el-table-column prop="1" label="月供"></el-table-column>
                                <el-table-column prop="2" label="月供本金"></el-table-column>
                                <el-table-column prop="3" label="月供利息"></el-table-column>
                              </el-table>
                            </div>
                            <i
                              style="color:#409EFF;cursor: pointer;font-style:normal"
                              slot="reference"
                            >还款计划表</i>
                          </el-popover>
                        </template>
                      </el-input>
                    </el-form-item>
                    <p>等额本金还贷法</p>
                    <el-form-item label="累计支付利息:">
                      <el-input v-model="sizetab.itemc" disabled>
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="累计还款总额:">
                      <el-input v-model="sizetab.itemd" disabled>
                        <template slot="append">
                          元
                          <el-popover
                            placement="right"
                            width="600"
                            trigger="click"
                            title="个人贷款计算器计算结果"
                            :disabled="aredisabled"
                          >
                            <!-- 还款计划表 -->
                            <div class="kuanways">
                              <ul
                                style="display:flex;justify-content:space-between;margin:0;padding:0;"
                              >
                                <li class="dnkshdk">还款方式</li>
                                <li class="dnkshdk othershu">等额本金还贷</li>
                                <li class="dnkshdk">还款总额</li>
                                <li class="dnkshdk othershu">{{sizetab.itemd}}</li>
                                <li class="dnkshdk">利息总额</li>
                                <li
                                  class="dnkshdk othershu"
                                  style="border-right:1px solid #ccc"
                                >{{sizetab.itemc}}</li>
                              </ul>
                              <el-table :data="tablelistx" style="width: 100%" height="400">
                                <el-table-column prop="0" label="期数"></el-table-column>
                                <el-table-column prop="1" label="月供"></el-table-column>
                                <el-table-column prop="2" label="月供本金"></el-table-column>
                                <el-table-column prop="3" label="月供利息"></el-table-column>
                              </el-table>
                            </div>
                            <i
                              style="color:#409EFF;cursor: pointer;font-style:normal"
                              slot="reference"
                            >还款计划表</i>
                          </el-popover>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <p class="wenp">温馨提示：本个人贷款计算器测算数据仅供参考，具体以办理业务或交易实际结果为准。</p>
              </div>
            </div>
          </el-card>
        </div>
        <over class="ovway" @func="getFormSon">
          <div class="clearfix">
            <p>相关资讯</p>
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
import over from '@/components/common/overwa.vue'
export default {
  metaInfo: {
    title: '贷款计算器',
    meta: [
      {
        name: 'keywords',
        content: '贷款计算器'
      },
      {
        name: 'description',
        content: '个人贷款计算器'
      }
    ]
  },
  props: {},
  data() {
    return {
      // 存放获取的文章
      toolarticleall: [],
      // 存储consulting_id:咨询id
      consu_id: '',
      iecahuncan: '',
      msgFormSon: [],
      showvalzhi: '',
      value1: '',
      value2: '',
      aredisabled: true,
      isDisable: false,
      sizetab: {
        itema: '',
        itemb: '',
        itemc: '',
        itemd: ''
      },
      sizeForm: {
        sum: '',
        region: '1',
        delivery: false,
        type: [],
        resource: '',
        desc: '',
        yearqian: '',
        monthqian: '',
        dayqian: '',
        mysetqian: ''
      },
      tablelist: [],
      tablelistx: []
    }
  },
  computed: {},
  created() {
    // 页面接受传递过来的参数
    this.jiecahuncan = this.$route.path
    // 截取里面的id数字
    this.consu_id = this.jiecahuncan
      .split('.')[0]
      .split('/')[1]
      .replace(/[^0-9]/gi, '')
  },
  mounted() {
    // 获取相应的功能文章
    this.gettoolarticle()
  },
  watch: {},
  methods: {
    // 点击查看更多去列表页面
    gomoretoolist() {
      this.$router.push({
        name: 'toolslist',
        params: { valtolid: `${this.consu_id}.html` }
      })
    },
    // 携带对应的文章id 去详情页面
    goaboutintepage(intevalue) {
      this.$router.push({
        name: 'toolbook',
        params: { aboutdkid: `${intevalue}.html` }
      })
    },
    // 接受子组件传递过来的值
    getFormSon(data) {
      this.msgFormSon = data
      this.getnamevalzhi()
    },
    getnamevalzhi() {
      let jieca = this.jiecahuncan
        .split('.')[0]
        .split('/')[1]
        .replace(/[0-9]/gi, '')
      let allchan = this.msgFormSon[0].newname
      let numzhi = allchan.indexOf(jieca)
      for (let i = 0; i < this.msgFormSon.length; i++) {
        if (i === numzhi) {
          this.showvalzhi = this.msgFormSon[i].tools_name
        }
      }
    },
    // 判断标题的长短
    getTitle(data) {
      if (data.length > 10) return data.substring(0, 10)
      return data
    },
    // 获取对应功能的文章列表
    async gettoolarticle() {
      const { data: res } = await this.$http.post('souqi/admin/tool/consulting/', { tools_name_id: this.consu_id })
      console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].issue_time = res.results[i].issue_time.split('T')[0]
      }
      this.toolarticleall = res.results.slice(0, 5)
    },
    // 点击计算按钮发起请求
    async onSubmit() {
      // console.log(this.value1)
      // console.log(this.value2)
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 3000)
      let amtreg = /^\d+(\.\d{1,2})?$/
      if (!amtreg.test(this.sizeForm.sum.trim(''))) return this.$message.warning('请输入正确贷款金额')
      if (this.value1 === '') return this.$message.warning('请输入正确贷款期限')
      if (this.sizeForm.mysetqian === '0') return this.$message.warning('请输入正确利率')
      // this.sizeForm.moneymoore = this.sizeForm.region.trim('0')
      // 起始时间和结束时间
      let beginyear = this.value1.split('-')[0]
      let beginmother = this.value1.split('-')[1]
      let finshyear = this.value2.split('-')[0]
      let finshmother = this.value2.split('-')[1]
      console.log(beginyear, beginmother, finshyear, finshmother)
      // 每次请求前清空之前的数据
      this.tablelist = []
      this.tablelistx = []
      const res = await this.$http.post('souqi_tool/loan/calculator/', {
        loans_money: this.sizeForm.sum,
        interest_rate_pk: this.sizeForm.region,
        interest_rate: this.sizeForm.mysetqian,
        start_year: beginyear,
        start_month: beginmother,
        end_year: finshyear,
        end_month: finshmother
      })
      // console.log(res.data.results)
      // console.log(res.data)
      if (res.data.status !== 0) return this.$message.error(res.data.msg)
      this.sizetab.itema = res.data.results.de_b_j_data[1][2]
      this.sizetab.itemb = res.data.results.de_b_j_data[1][1]
      this.sizetab.itemc = res.data.results.de_b_x_data[1][2]
      this.sizetab.itemd = res.data.results.de_b_x_data[1][1]
      let score1 = res.data.results.de_b_j_data[0][0].split('')
      let score2 = res.data.results.de_b_j_data[0][1].split('')
      let score3 = res.data.results.de_b_j_data[0][2].split('')
      score1.pop()
      score2.pop()
      score3.pop()
      this.sizeForm.yearqian = score1.join('')
      this.sizeForm.monthqian = score2.join('')
      this.sizeForm.dayqian = score3.join('')
      // console.log(this.sizeForm.yearqian)
      // 将数组处理成对象
      let bjlist = res.data.results.de_b_j_data
      let bxlist = res.data.results.de_b_x_data
      bjlist.splice(0, 2)
      bxlist.splice(0, 2)
      for (let i = 0; i < bjlist.length; i++) {
        this.tablelist.push({ ...bjlist[i] })
      }
      this.tablelist.push({ ...['总计', this.sizetab.itemb, this.sizeForm.sum, this.sizetab.itema] })
      for (let i = 0; i < bxlist.length; i++) {
        this.tablelistx.push({ ...bxlist[i] })
      }
      this.tablelistx.push({ ...['总计', this.sizetab.itemd, this.sizeForm.sum, this.sizetab.itemc] })
      this.pandanplay()
    },
    // 点击重置按钮
    onreset() {
      this.sizeForm.region = '1'
      this.aredisabled = true
      this.value2 = this.sizeForm.mysetqian = this.sizetab.itema = this.sizetab.itemb = this.sizetab.itemc = this.sizetab.itemd = this.sizeForm.sum = this.value1 = this.sizeForm.yearqian = this.sizeForm.monthqian = this.sizeForm.dayqian =
        ''
    },
    // 判断还款计划表是否有效
    pandanplay() {
      if (!(this.sizetab.itemb === '')) return (this.aredisabled = false)
    }
  },
  components: {
    headerl,
    foTer,
    over
  }
}
</script>

<style lang="less" scoped>
/deep/.dnkshdk {
  width: 100px;
  height: 25px;
  line-height: 25px;
  text-align: center;
  background-color: #dbdbdb;
  border: 1px solid #ccc;
  border-right: none;
  font-size: 10px;
}
/deep/.othershu {
  background-color: #fff;
}
/deep/.el-input-group__append {
  padding: 0 9px;
}
/deep/.el-input.is-disabled .el-input__inner {
  color: #333;
  background-color: #ebebe4 !important;
}
/deep/.el-input__suffix-inner {
  height: 28px !important;
  line-height: 28px !important;
}
.el-main {
  width: 100%;
  padding: 0 0;
  background-color: #e7e7e7;
  display: flex;
  justify-content: center;
  .el-main-inter {
    margin: 50px 0;
    margin-bottom: 100px;
    width: 50%;
    .box-card {
      height: 100%;
      .box-tu {
        padding: 0;
        margin-left: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 95% !important;
        p {
          padding: 0;
          margin: 0;
          width: 150px;
          height: 30px;
          text-align: center;
          line-height: 30px;
        }
        .pfist {
          border-radius: 10px;
          background-color: #008bfe;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .box-inter {
        width: 95% !important;
        height: 1000px;
        margin: 20px auto;
        border-radius: 20px 20px 0 0;
        border: 2px solid #ccc;
        background-color: #f7f7f7;
        .butdaikuan {
          width: 90%;
          margin: 30px auto;
          ul {
            padding: 0;
            margin: 0;
            display: flex;
            justify-content: flex-start;
            li {
              padding: 0;
              margin: 0;
              width: 150px;
              height: 50px;
              line-height: 50px;
              text-align: center;
              color: #fff;
              font-size: 14px;
              font-weight: bold;
              background-color: #128bed;
            }
          }
          .foritem {
            margin: 50px auto;
            padding: 0;
            width: 50%;
            .el-form {
              width: 100%;
              p {
                padding-right: 40px !important;
                font-size: 14px;
                font-weight: bold;
              }
              .el-form-item {
                margin-bottom: 24px;
              }
            }
          }
          .wenp {
            font-size: 5px;
            width: 100%;
            text-align: center;
            color: #333;
          }
        }
      }
    }
  }
  .ovway {
    width: 20%;
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
</style>
