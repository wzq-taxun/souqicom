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
                <!-- <ul>
                  <li>个人贷款计算器</li>
                </ul>-->
                <el-tabs type="card" @tab-click="tableshijian" v-model="valzhi">
                  <el-tab-pane label="商业贷款" name="1">
                    <!-- 商业贷款 -->
                    <!-- 表格 -->
                    <div class="foritem">
                      <el-form ref="form" :model="sizeForm" label-width="150px" size="mini">
                        <el-form-item label="商业贷款:">
                          <el-input v-model="sizeForm.fangnum1" type="number" maxlength="10">
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="贷款期限:">
                          <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                            <el-option
                              v-for="item in group.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="购房性质:">
                          <el-radio v-model="radio" label="1">一套房</el-radio>
                          <el-radio v-model="radio" label="2">二套房</el-radio>
                        </el-form-item>
                        <el-form-item label="商业贷款年利率:">
                          <el-input v-model="sizeForm.fangnum2" type="number">
                            <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="还款方式:">
                          <el-radio v-model="giv" label="1">等额本息</el-radio>
                          <el-radio v-model="giv" label="2">等额本金</el-radio>
                        </el-form-item>
                        <el-form-item
                          size="mini"
                          style="display:flex;justify-content:center;"
                        >
                          <el-button type="primary" @click="onSubmit" :disabled="isDisable">计算</el-button>
                          <el-button type="primary" @click="onreset" style="margin-left:20px;">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="公积金贷款" name="2">
                    <!-- 表格 -->
                    <div class="foritem">
                      <el-form ref="form" :model="sizeForm" label-width="150px" size="mini">
                        <el-form-item label="公积金贷款:">
                          <el-input v-model="sizeForm.fangnum1" type="number">
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="贷款期限:">
                          <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                            <el-option
                              v-for="item in group.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="购房性质:">
                          <el-radio v-model="radio" label="1">一套房</el-radio>
                          <el-radio v-model="radio" label="2">二套房</el-radio>
                        </el-form-item>
                        <el-form-item label="公积金贷款年利率:">
                          <el-input v-model="sizeForm.fangnum2" type="number">
                            <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="还款方式:">
                          <el-radio v-model="giv" label="1">等额本息</el-radio>
                          <el-radio v-model="giv" label="2">等额本金</el-radio>
                        </el-form-item>
                        <el-form-item
                          size="mini"
                          style="display:flex;justify-content:space-between;"
                        >
                          <el-button type="primary" @click="onSubmit" :disabled="isDisable">计算</el-button>
                          <el-button type="primary" @click="onreset" style="margin-left:20px;">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="组合贷款" name="3">
                    <!-- 表格 -->
                    <div class="foritem">
                      <el-form ref="form" :model="sizeForm" label-width="150px" size="mini">
                        <el-form-item label="商业贷款:">
                          <el-input v-model="sizeForm.fangnum1" type="number">
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="公积金贷款:">
                          <el-input v-model="gongjin.fanumber1" type="number">
                            <template slot="append">万元</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="贷款期限:">
                          <el-select v-model="form.region" placeholder="请选择" style="width:100%;">
                            <el-option
                              v-for="item in group.options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value"
                            ></el-option>
                          </el-select>
                        </el-form-item>
                        <el-form-item label="购房性质:">
                          <el-radio v-model="radio" label="1">一套房</el-radio>
                          <el-radio v-model="radio" label="2">二套房</el-radio>
                        </el-form-item>
                        <el-form-item label="商业贷款年利率:">
                          <el-input v-model="sizeForm.fangnum2" type="number">
                            <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="公积金贷款年利率:">
                          <el-input v-model="gongjin.fanumber2" type="number">
                            <template slot="append">%</template>
                          </el-input>
                        </el-form-item>
                        <el-form-item label="还款方式:">
                          <el-radio v-model="giv" label="1">等额本息</el-radio>
                          <el-radio v-model="giv" label="2">等额本金</el-radio>
                        </el-form-item>
                        <el-form-item
                          size="mini"
                          style="display:flex;justify-content:space-between;"
                        >
                          <el-button type="primary" @click="onSubmitzuhe" :disabled="isDisable">计算</el-button>
                          <el-button type="primary" @click="onreset" style="margin-left:20px;">重置</el-button>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-tab-pane>
                </el-tabs>
                <!-- 还款计划表 -->
                <div class="kuanways" v-if="sishowchu">
                  <!-- 商业带款和公积金贷款单独显示 -->
                  <ul v-show="!(valzhi==='3')">
                    <li class="dnkshdk">还款期数</li>
                    <li class="dnkshdk othershu">{{zongqishu}}</li>
                    <li class="dnkshdk">累计还款总额(元)</li>
                    <li class="dnkshdk othershu">{{zongmony}}</li>
                    <li class="dnkshdk">累计支付利息(元)</li>
                    <li class="dnkshdk othershu" style="border-right:1px solid #ccc">{{liximony}}</li>
                  </ul>
                  <!-- 组合贷款显示 -->
                  <ul v-show="valzhi==='3'">
                    <!-- <li class="dnkshdk">还款期数</li>
                    <li class="dnkshdk othershu">{{zongqishu}}</li>-->
                    <li class="dnkshdk" style="width:25%;">商贷支付利息(元)</li>
                    <li class="dnkshdk othershu" style="width:25%;">{{shangdaihe}}</li>
                    <li class="dnkshdk" style="width:25%;">公积金支付利息(元)</li>
                    <li
                      class="dnkshdk othershu"
                      style="border-right:1px solid #ccc;width:25%;"
                    >{{gongjindaihe}}</li>
                  </ul>
                  <ul v-show="valzhi==='3'">
                    <li class="dnkshdk" style="width:25%; border-top:none">累计支付利息(元)</li>
                    <li class="dnkshdk othershu" style="width:25%; border-top:none">{{zonglixihe}}</li>
                    <li class="dnkshdk" style="width:25%; border-top:none">累计还款总额(元)</li>
                    <li
                      class="dnkshdk othershu"
                      style="border-right:1px solid #ccc;width:25%; border-top:none"
                    >{{zongbenjinhe}}</li>
                  </ul>
                  <el-table :data="fangdailist" style="width: 100%" height="400">
                    <el-table-column prop="0" label="期次"></el-table-column>
                    <el-table-column prop="1" label="偿还本息(元)"></el-table-column>
                    <el-table-column prop="2" label="偿还利息(元)"></el-table-column>
                    <el-table-column prop="3" label="偿还本金(元)"></el-table-column>
                    <el-table-column prop="4" label="剩余本金(元)"></el-table-column>
                  </el-table>
                </div>
                <p class="wenp">温馨提示：本{{showvalzhi}}测算数据仅供参考，具体以办理业务或交易实际结果为准。</p>
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
              <!-- 线下测试 -->
              <!-- <img :src="`http://192.168.0.108:8000/${item.consulting_picture}`" alt /> -->
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
    title: '房贷计算',
    meta: [
      {
        name: 'keywords',
        content: '房贷计算器'
      },
      {
        name: 'description',
        content: '房贷计算器'
      }
    ]
  },
  props: {},
  data() {
    return {
      // 组合数据
      shangdaihe: '',
      gongjindaihe: '',
      zonglixihe: '',
      zongbenjinhe: '',
      // 控制是否显示计算结果
      sishowchu: false,
      // 存放计算结果的
      fangdailist: [],
      // 存放获取的文章
      toolarticleall: [],
      // 存储consulting_id:咨询id
      consu_id: '',
      iecahuncan: '',
      msgFormSon: [],
      showvalzhi: '',
      // value1: '',
      // value2: '',
      aredisabled: true,
      isDisable: false,
      sizeForm: {
        fangnum1: '',
        fangnum2: 0
      },
      gongjin: {
        fanumber2: '',
        fanumber1: ''
      },
      form: {
        region: '1'
      },
      radio: '1',
      giv: '1',
      valzhi: '1',
      tablelistx: [],
      typena: '',
      // 累计还款总额
      zongmony: '',
      // 累计还款利息
      liximony: '',
      // 总期数
      zongqishu: null,
      group: {
        options: [
          {
            value: '1',
            label: '1年'
          },
          {
            value: '2',
            label: '2年'
          },
          {
            value: '3',
            label: '3年'
          },
          {
            value: '4',
            label: '4年'
          },
          {
            value: '5',
            label: '5年'
          },
          {
            value: '6',
            label: '6年'
          },
          {
            value: '7',
            label: '7年'
          },
          {
            value: '8',
            label: '8年'
          },
          {
            value: '9',
            label: '9年'
          },
          {
            value: '10',
            label: '10年'
          },
          {
            value: '11',
            label: '11年'
          },
          {
            value: '12',
            label: '12年'
          },
          {
            value: '13',
            label: '13年'
          },
          {
            value: '14',
            label: '14年'
          },
          {
            value: '15',
            label: '15年'
          },
          {
            value: '16',
            label: '16年'
          },
          {
            value: '17',
            label: '17年'
          },
          {
            value: '18',
            label: '18年'
          },
          {
            value: '19',
            label: '19年'
          },
          {
            value: '20',
            label: '20年'
          },
          {
            value: '21',
            label: '21年'
          },
          {
            value: '22',
            label: '22年'
          },
          {
            value: '23',
            label: '23年'
          },
          {
            value: '24',
            label: '24年'
          },
          {
            value: '25',
            label: '25年'
          },
          {
            value: '26',
            label: '26年'
          },
          {
            value: '27',
            label: '27年'
          },
          {
            value: '28',
            label: '28年'
          },
          {
            value: '29',
            label: '29年'
          },
          {
            value: '30',
            label: '30年'
          }
        ]
      }
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
    // 点击table切换事件
    tableshijian() {
      // console.log(this.valzhi)
      // 将表格中数据都清空
      this.sizeForm.fangnum2 = this.sizeForm.fangnum1 = this.gongjin.fanumber2 = this.gongjin.fanumber1 = ''
      this.form.region = this.radio = '1'
      this.giv = '1'
      // 隐藏上次计算结果的模块
      this.sishowchu = false
    },
    // 点击计算(商业 和 公积金)
    async onSubmit() {
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 3000)
      // 每次请求前清空之前的数据
      this.fangdailist = []
      let amtreg = /^\d+(\.\d{1,2})?$/
      if (!amtreg.test(this.sizeForm.fangnum1.trim(''))) return this.$message.warning('请输入正确贷款金额')
      if (this.sizeForm.fangnum2 === '0') return this.$message.warning('请输入正确利率')
      const { data: res } = await this.$http.post('souqi_tool/house_loan/calculator/', {
        loans_type: this.valzhi,
        loans_money: this.sizeForm.fangnum1,
        length_of_maturity: this.form.region,
        buying_property_pk: this.radio,
        annual_interest_rate: this.sizeForm.fangnum2,
        repayment_type: this.giv
      })
      // console.log(res, '111111')
      if (res.status !== 1) return this.$message.error(res.msg)
      if (this.giv === '1') {
        this.zongmony = res.results.de_b_x_data[1]
        this.liximony = res.results.de_b_x_data[0]
        // 删除数组的前两项 arr.splice(0,2) 会改变原数组的
        res.results.de_b_x_data.splice(0, 2)
        let setresultall = res.results.de_b_x_data
        for (let i = 0; i < setresultall.length; i++) {
          this.fangdailist.push({ ...setresultall[i] })
        }
      } else if (this.giv === '2') {
        this.zongmony = res.results.de_b_j_data[1]
        this.liximony = res.results.de_b_j_data[0]
        // 删除数组的前两项 arr.splice(0,2) 会改变原数组的
        res.results.de_b_j_data.splice(0, 2)
        let setresultall = res.results.de_b_j_data
        for (let i = 0; i < setresultall.length; i++) {
          this.fangdailist.push({ ...setresultall[i] })
        }
      }
      // 计算共多少期
      this.zongqishu = parseInt(this.form.region) * 12
      // 显示计算结果
      this.sishowchu = true
    },
    // 点击计算(组合贷款)
    async onSubmitzuhe() {
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 3000)
      // 每次请求前清空之前的数据
      this.fangdailist = []
      let amtreg = /^\d+(\.\d{1,2})?$/
      if (!amtreg.test(this.sizeForm.fangnum1.trim('')) || !amtreg.test(this.gongjin.fanumber1.trim(''))) return this.$message.warning('请输入正确贷款金额')
      if (this.gongjin.fanumber === '0' || this.gongjin.fanumber1 === '0') return this.$message.warning('请输入正确利率')
      const { data: res } = await this.$http.post('souqi_tool/house_loan/calculator/', {
        loans_type: this.valzhi,
        commercial_loan_money: this.sizeForm.fangnum1,
        accumulation_fund_money: this.gongjin.fanumber1,
        length_of_maturity: this.form.region,
        buying_property_pk: this.radio,
        commercial_annual_interest_rate: this.sizeForm.fangnum2,
        accumulation_fund_annual_interest_rate: this.gongjin.fanumber2,
        repayment_type: this.giv
      })
      // console.log(res, '111111')
      if (res.status !== 1) return this.$message.error(res.msg)
      if (this.giv === '1') {
        this.shangdaihe = res.results.de_b_x_data[0]
        this.gongjindaihe = res.results.de_b_x_data[1]
        this.zonglixihe = res.results.de_b_x_data[2]
        this.zongbenjinhe = res.results.de_b_x_data[3]
        // 删除数组的前两项 arr.splice(0,4) 会改变原数组的
        res.results.de_b_x_data.splice(0, 4)
        let setresultall = res.results.de_b_x_data
        for (let i = 0; i < setresultall.length; i++) {
          this.fangdailist.push({ ...setresultall[i] })
        }
      } else if (this.giv === '2') {
        this.shangdaihe = res.results.de_b_j_data[0]
        this.gongjindaihe = res.results.de_b_j_data[1]
        this.zonglixihe = res.results.de_b_j_data[2]
        this.zongbenjinhe = res.results.de_b_j_data[3]
        // 删除数组的前两项 arr.splice(0,2) 会改变原数组的
        res.results.de_b_j_data.splice(0, 4)
        let setresultall = res.results.de_b_j_data
        for (let i = 0; i < setresultall.length; i++) {
          this.fangdailist.push({ ...setresultall[i] })
        }
      }
      // 计算共多少期
      this.zongqishu = parseInt(this.form.region) * 12
      // 显示计算结果
      this.sishowchu = true
    },
    // 点击重置
    onreset() {
      // 清空输入框
      this.tableshijian()
    },
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
      // console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      // 将返回数据数组中每项对象中的时间替换一下
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].issue_time = res.results[i].issue_time.split('T')[0]
      }
      this.toolarticleall = res.results.slice(0, 5)
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
        // height: 1000px;
        margin: 20px auto;
        border-radius: 20px 20px 0 0;
        border: 2px solid #ccc;
        background-color: #f7f7f7;
        .butdaikuan {
          width: 90%;
          margin: 30px auto;
          .kuanways {
            width: 100%;
            ul {
              width: 100%;
              padding: 0;
              margin: 0;
              display: flex;
              justify-content: center;
              li {
                padding: 0;
                margin: 0;
                width: 21.25%;
                height: 50px;
                line-height: 50px;
                text-align: center;
                font-size: 14px;
                font-weight: bold;
              }
              li:nth-child(1) {
                width: 10%;
              }
              li:nth-child(2) {
                width: 5%;
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
