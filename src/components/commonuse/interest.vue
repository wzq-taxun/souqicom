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
                  <span style="font-size:10px;">理财计算器</span>
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
                      <el-input v-model="sizeForm.sum">
                        <template slot="append">元</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="贷款期限:">
                      <el-select
                        v-model="sizeForm.region"
                        placeholder="请选择贷款年限"
                        style="width:100%;"
                      >
                        <el-option label="一年以内(含一年)" value="4.350"></el-option>
                        <el-option label="一年至五年(含五年)" value="4.750"></el-option>
                        <el-option label="五年以上" value="4.900"></el-option>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="基准年利率:">
                      <el-input v-model="sizeForm.region" disabled>
                        <!-- <template slot="suffix">%</template> -->
                        <template slot="append">
                          %
                          <el-popover placement="right" width="300" trigger="hover">
                            <div class="content-lvli">
                              <p style="font-weight: bold;text-align: center">人民币贷款央行基准利率表</p>
                              <el-table :data="tableData" style="width: 100%">
                                <el-table-column prop="date" label="时长"></el-table-column>
                                <el-table-column prop="name" label="年利率%"></el-table-column>
                              </el-table>
                              <p
                                style="text-align: center; font-size:9px; color:#333;"
                              >注:以上资料仅做参考，如遇调整或变更，请按当地银行公布内容为准。</p>
                            </div>
                            <i
                              style="color:#409EFF;cursor: pointer;font-style:normal"
                              slot="reference"
                            >贷款利率表</i>
                          </el-popover>
                        </template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="贷款利率:">
                      <el-input v-model="sizeForm.moneymoore" disabled>
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
                        <!-- <template slot="suffix">元</template> -->
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
      </el-main>
      <el-footer style="padding:0">
        <!-- 底部组件 -->
        <foTer></foTer>
      </el-footer>
    </el-container>
    <!-- <iframe ref="iframe" src="https://www.baidu.com/"></iframe> -->
  </div>
</template>

<script>
import headerl from '@/components/common/headerlan.vue'
import foTer from '@/components/common/FoTer.vue'
export default {
  props: {},
  data() {
    return {
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
        moneymoore: '',
        region: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      tableData: [
        {
          date: '一年以内（含一年）',
          name: '4.350'
        },
        {
          date: '一至五年（含五年）',
          name: '4.750'
        },
        {
          date: '五年以上',
          name: '4.900'
        }
      ],
      tablelist: [],
      tablelistx: []
    }
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {
    // 点击计算按钮发起请求
    async onSubmit() {
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 3000)
      let amtreg = /^\d+(\.\d{1,2})?$/
      if (!amtreg.test(this.sizeForm.sum.trim(''))) return this.$message.warning('请输入正确贷款金额')
      if (this.sizeForm.region === '') return this.$message.warning('请输入正确贷款年限')
      // 每次请求前清空之前的数据
      this.tablelist = []
      this.tablelistx = []
      this.sizeForm.moneymoore = this.sizeForm.region.trim('0')
      let agem = '1'
      if (this.sizeForm.region === '4.750') {
        agem = '2'
      } else if (this.sizeForm.region === '4.900') {
        agem = '3'
      }
      // console.log(agem)
      // console.log(this.sizeForm.sum)
      const { data: res } = await this.$http.post('souqi_tool/loan/calculator/', { loans_money: this.sizeForm.sum, loans_time: agem })
      // console.log(res.results.de_b_j_data.shift())
      if (res.status !== 0) return this.$message.error(res.msg)
      this.sizetab.itema = res.results.de_b_j_data[0][2]
      this.sizetab.itemb = res.results.de_b_j_data[0][1]
      this.sizetab.itemc = res.results.de_b_x_data[0][2]
      this.sizetab.itemd = res.results.de_b_x_data[0][1]
      // 将数组处理成对象
      let bjlist = res.results.de_b_j_data
      let bxlist = res.results.de_b_x_data
      bjlist.shift()
      bxlist.shift()
      // console.log(bjlist)
      // console.log(bjlist.length)
      for (let i = 0; i < bjlist.length; i++) {
        this.tablelist.push({ ...bjlist[i] })
      }
      this.tablelist.push({ ...['总计', this.sizetab.itemb, this.sizeForm.sum, this.sizetab.itema] })
      for (let i = 0; i < bxlist.length; i++) {
        this.tablelistx.push({ ...bxlist[i] })
      }
      this.tablelistx.push({ ...['总计', this.sizetab.itemd, this.sizeForm.sum, this.sizetab.itemc] })
      // console.log(this.tablelist)
      this.pandanplay()
    },
    // 点击重置按钮
    onreset() {
      this.aredisabled = true
      this.sizetab.itema = this.sizetab.itemb = this.sizetab.itemc = this.sizetab.itemd = this.sizeForm.sum = this.sizeForm.moneymoore = ''
    },
    // 判断还款计划表是否有效
    pandanplay() {
      if (!(this.sizetab.itemb === '')) return (this.aredisabled = false)
    }
  },
  components: {
    headerl,
    foTer
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
.el-header {
  // border-bottom: 1px solid #ccc;
  width: 100%;
  padding: 0 0;
}
.el-main {
  width: 100%;
  padding: 0 0;
  background-color: #e7e7e7;
  .el-main-inter {
    margin: 50px auto;
    width: 55%;
    height: 1100px;
    // background-color: pink;
    .box-card {
      height: 100%;
      .box-tu {
        padding: 0;
        margin-left: 30px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // margin: 10 auto !important;
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
                margin-bottom: 40px;
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
}
</style>
