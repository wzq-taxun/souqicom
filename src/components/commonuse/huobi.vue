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
                  <li>货币兑换计算器</li>
                </ul>
                <!-- 表格 -->
                <div class="foritem">
                  <el-form ref="form" :model="sizeForm" label-width="120px" size="mini">
                    <el-form-item label="持有金额:">
                      <el-input v-model="sizeForm.sum1" type="number">
                        <template slot="append">{{labvalMessage}}</template>
                      </el-input>
                    </el-form-item>
                    <el-form-item label="持有货币:">
                      <el-select
                        v-model="labval"
                        placeholder="请选择"
                        style="width:100%;"
                        @change="gaiobianshijian"
                      >
                        <el-option-group
                          v-for="group in options"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-option-group>
                      </el-select>
                    </el-form-item>
                    <el-form-item label="兑换货币:">
                      <el-select
                        v-model="labval2"
                        placeholder="请选择活动区域"
                        style="width:100%;"
                        @change="gaiobianshijian"
                      >
                        <el-option-group
                          v-for="group in options"
                          :key="group.label"
                          :label="group.label"
                        >
                          <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-option-group>
                      </el-select>
                    </el-form-item>
                    <el-form-item size="mini" style="display:flex;justify-content:space-between;">
                      <el-button type="primary" @click="onSubmit" :disabled="isDisable">计算</el-button>
                      <el-button type="primary" style="margin-left:20px;" @click="onreset">重置</el-button>
                    </el-form-item>
                    <el-form-item label="当前汇率:">
                      <el-input v-model="sizeForm.sum3" disabled></el-input>
                    </el-form-item>
                    <el-form-item v-show="isfouchuxian" class="elteshuqing">
                      <p>
                        {{baosum1val}}
                        <span class="corheise">{{labvalMessage}}</span>
                        <span style="color:#AAAAAA">&nbsp;=</span>
                        {{sizeForm.sum2}}
                        <span
                          class="corheise"
                        >{{labval2Message}}</span>
                      </p>
                    </el-form-item>
                    <el-form-item label="兑换金额:">
                      <el-input v-model="sizeForm.sum2" disabled>
                        <template slot="append">{{labval2Message}}</template>
                      </el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <!-- 可视化图表 -->
                <div id="myChart"></div>
                <p class="wenp">温馨提示：外汇兑换计算器的数据、计算结果仅供参考。具体以办理业务或交易实际结果为准，据此投资风险自负。</p>
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
              @click="goaboutintepage(item.id)"
              class="mabimg"
              v-show="item.consulting_picture !== null"
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
// 引入 ECharts 主模块
let echarts = require('echarts/lib/echarts')
// 引入折线图/柱状图等组件
require('echarts/lib/chart/line')
// 引入提示框和title组件，图例
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/legendScroll') // 图例滚动
export default {
  metaInfo: {
    title: '汇率换算',
    meta: [
      {
        name: 'keywords',
        content: '汇率换算'
      },
      {
        name: 'description',
        content: '汇率换算'
      }
    ]
  },
  props: {},
  data() {
    return {
      // 汇率最大小值
      huimi: '',
      huima: '',
      // 汇率数组
      huilvall: [],
      // 名称
      huiname: '',
      // 可视化图的数据 // 时间数组
      timemothall: [],
      // 存放获取的文章
      toolarticleall: [],
      // 存储consulting_id:咨询id
      consu_id: '',
      value: '',
      // 保存输入金额值
      baosum1val: '',
      sizeForm: {
        sum1: '',
        sum2: '',
        sum3: ''
      },
      options: [
        {
          label: '常用货币',
          options: [
            {
              value: '0-人民币',
              label: '人民币CNY'
            },
            {
              value: '41-离岸人民币',
              label: '离岸人民币CNH'
            },
            {
              value: '9-港元',
              label: '港元HKD'
            },
            {
              value: '1-澳门元',
              label: '澳门元MOP'
            },
            {
              value: '2-台币',
              label: '台币TWD'
            },
            {
              value: '3-欧元',
              label: '欧元EUR'
            },
            {
              value: '4-美元',
              label: '美元USD'
            },
            {
              value: '5-英镑',
              label: '英镑GBP'
            },
            {
              value: '6-澳元',
              label: '澳元AUD'
            },
            {
              value: '7-韩元',
              label: '韩元KRW'
            },
            {
              value: '8-日元',
              label: '日元JPY'
            }
          ]
        },
        {
          label: 'A',
          options: [
            {
              value: '14-阿尔巴尼亚列克',
              label: '阿尔巴尼亚列克(ALL)'
            },
            {
              value: '15-阿根廷比索',
              label: '阿根廷比索(ARS)'
            },
            {
              value: '16-阿鲁巴岛弗罗林',
              label: '阿鲁巴岛弗罗林(AWG)'
            },
            {
              value: '17-阿联酋迪拉姆',
              label: '阿联酋迪拉姆(AED)'
            },
            {
              value: '18-列斯荷兰盾',
              label: '列斯荷兰盾(ANG)'
            },
            {
              value: '19-阿塞拜疆新马纳特',
              label: '阿塞拜疆新马纳特(AZN)'
            },
            {
              value: '20-安哥拉宽扎',
              label: '安哥拉宽扎(AOA)'
            }
          ]
        },
        {
          label: 'B',
          options: [
            {
              value: '21-巴哈马元',
              label: '巴哈马元(BSD)'
            },
            {
              value: '22-巴林第纳尔',
              label: '巴林第纳尔(BHD)'
            },
            {
              value: '23-巴巴多斯元',
              label: '巴巴多斯元(BBD)'
            },
            {
              value: '24-白俄罗斯卢布',
              label: '白俄罗斯卢布(BYR)'
            },
            {
              value: '25-伯利兹元',
              label: '伯利兹元(BZD)'
            },
            {
              value: '26-百慕大元',
              label: '百慕大元(BMD)'
            },
            {
              value: '27-不丹卢比',
              label: '不丹卢比(BTN)'
            },
            {
              value: '28-玻利维亚诺',
              label: '玻利维亚诺(BOB)'
            },
            {
              value: '29-博茨瓦纳普拉',
              label: '博茨瓦纳普拉(BWP)'
            },
            {
              value: '30-巴西里亚伊',
              label: '巴西里亚伊(BRL)'
            },
            {
              value: '31-保加利亚列瓦',
              label: '保加利亚列瓦(BGN)'
            },
            {
              value: '32-布隆迪法郎',
              label: '布隆迪法郎(BIF)'
            },
            {
              value: '33-孟加拉塔卡',
              label: '孟加拉塔卡(BDT)'
            },
            {
              value: '34-文莱元',
              label: '文莱元(BND)'
            }
          ]
        },
        {
          label: 'C',
          options: [
            {
              value: '35-佛得角埃斯库多',
              label: '佛得角埃斯库多(CVE)'
            },
            {
              value: '36-哥伦比亚比索',
              label: '哥伦比亚比索(COP)'
            },
            {
              value: '37-哥斯达黎加科朗',
              label: '哥斯达黎加科朗(CRC)'
            },
            {
              value: '38-古巴比索',
              label: '古巴比索(CUP)'
            },
            {
              value: '10-加拿大元',
              label: '加拿大元(CAD)'
            },
            {
              value: '39-捷克克朗',
              label: '捷克克朗(CZK)'
            },
            {
              value: '40-瑞士法郎',
              label: '瑞士法郎(CHF)'
            },
            // {
            //   value: '42-塞浦路斯镑',
            //   label: '塞浦路斯镑(CYP)'
            // },
            {
              value: '42-智利比索',
              label: '智利比索(CLP)'
            }
          ]
        },
        {
          label: 'D',
          options: [
            {
              value: '43-阿尔及利亚第纳尔',
              label: '阿尔及利亚第纳尔(DZD)'
            },
            {
              value: '44-丹麦克朗',
              label: '丹麦克朗(DKK)'
            },
            {
              value: '45-多米尼加比索',
              label: '多米尼加比索(DOP)'
            },
            {
              value: '46-吉布提法郎',
              label: '吉布提法郎(DJF)'
            }
          ]
        },
        {
          label: 'E',
          options: [
            {
              value: '47-埃及镑',
              label: '埃及镑(EGP)'
            },
            // {
            //   value: '48-爱沙尼亚克伦尼',
            //   label: '爱沙尼亚克伦尼(EEK)'
            // },
            {
              value: '48-埃塞俄比亚比尔',
              label: '埃塞俄比亚比尔(ETB)'
            },
            {
              value: '49-厄瓜多尔苏克雷',
              label: '厄瓜多尔苏克雷(ECS)'
            },
            {
              value: '50-厄立特里亚',
              label: '厄立特里亚(ERN)'
            }
          ]
        },
        {
          label: 'F',
          options: [
            {
              value: '51-福克兰群岛镑',
              label: '福克兰群岛镑(FKP)'
            },
            {
              value: '52-斐济元',
              label: '斐济元(FJD)'
            }
          ]
        },
        {
          label: 'G',
          options: [
            {
              value: '53-冈比亚达拉西',
              label: '冈比亚达拉西(GMD)'
            },
            {
              value: '54-圭亚那元',
              label: '圭亚那元(GYD)'
            },
            {
              value: '55-加纳塞地',
              label: '加纳塞地(GHS)'
            },
            {
              value: '56-几内亚法郎',
              label: '几内亚法郎(GNF)'
            },
            {
              value: '57-危地马拉格查尔',
              label: '危地马拉格查尔(GTQ)'
            },
            {
              value: '58-直布罗陀镑',
              label: '直布罗陀镑(GIP)'
            }
          ]
        },
        {
          label: 'H',
          options: [
            {
              value: '59-海地古德',
              label: '海地古德(HTG)'
            },
            {
              value: '60-洪都拉斯伦皮拉',
              label: '洪都拉斯伦皮拉(HNL)'
            },
            {
              value: '61-克罗地亚库纳',
              label: '克罗地亚库纳(HRK)'
            },
            {
              value: '62-匈牙利福林',
              label: '匈牙利福林(HUF)'
            }
          ]
        },
        {
          label: 'I',
          options: [
            {
              value: '63-冰岛克朗',
              label: '冰岛克朗(ISK)'
            },
            {
              value: '64-印度卢比',
              label: '印度卢比(INR)'
            },
            {
              value: '65-印度尼西亚卢比(盾)',
              label: '印度尼西亚卢比(盾)(IDR)'
            },
            {
              value: '66-伊朗里亚尔',
              label: '伊朗里亚尔(IRR)'
            },
            {
              value: '67-伊拉克第纳尔',
              label: '伊拉克第纳尔(IQD)'
            },
            {
              value: '68-以色列镑',
              label: '以色列镑(ILS)'
            }
          ]
        },
        {
          label: 'J',
          options: [
            {
              value: '69-牙买加元',
              label: '牙买加元(JMD)'
            },
            {
              value: '70-约旦第纳尔',
              label: '约旦第纳尔(JOD)'
            }
          ]
        },
        {
          label: 'K',
          options: [
            {
              value: '71-朝鲜圆',
              label: '朝鲜圆(KPW)'
            },
            {
              value: '72-哈萨克斯坦腾格',
              label: '哈萨克斯坦腾格(KZT)'
            },
            {
              value: '73-柬埔寨利尔斯',
              label: '柬埔寨利尔斯(KHR)'
            },
            {
              value: '74-开曼岛元',
              label: '开曼岛元(KYD)'
            },
            {
              value: '75-科摩罗法郎',
              label: '科摩罗法郎(KMF)'
            },
            {
              value: '76-肯尼亚先令',
              label: '肯尼亚先令(KES)'
            },
            {
              value: '77-科威特第纳尔',
              label: '科威特第纳尔(KWD)'
            }
          ]
        },
        {
          label: 'L',
          options: [
            {
              value: '78-老挝基普',
              label: '老挝基普(LAK)'
            },
            {
              value: '79-拉脱维亚拉图',
              label: '拉脱维亚拉图(LVL)'
            },
            {
              value: '80-黎巴嫩镑',
              label: '黎巴嫩镑(LBP)'
            },
            {
              value: '81-莱索托洛提',
              label: '莱索托洛提(LSL)'
            },
            {
              value: '82-利比里亚元',
              label: '利比里亚元(LRD)'
            },
            {
              value: '83-利比亚第纳尔',
              label: '利比亚第纳尔(LYD)'
            },
            {
              value: '84-立陶宛里塔斯',
              label: '立陶宛里塔斯(LTL)'
            },
            {
              value: '85-斯里兰卡卢比',
              label: '斯里兰卡卢比(LKR)'
            }
          ]
        },
        {
          label: 'M',
          options: [
            {
              value: '86-马其顿第纳尔',
              label: '马其顿第纳尔(MKD)'
            },
            {
              value: '87-马拉维克瓦查',
              label: '马拉维克瓦查(MWK)'
            },
            {
              value: '88-马来西亚林吉特',
              label: '马来西亚林吉特(MYR)'
            },
            {
              value: '89-马尔代夫卢非亚',
              label: '马尔代夫卢非亚(MVR)'
            },
            // {
            //   value: '91-马尔他里拉',
            //   label: '马尔他里拉(MTL)'
            // },
            {
              value: '90-毛里塔尼亚乌吉亚',
              label: '毛里塔尼亚乌吉亚(MRO)'
            },
            {
              value: '91-毛里求斯卢比',
              label: '毛里求斯卢比(MUR)'
            },
            {
              value: '92-墨西哥比索',
              label: '墨西哥比索(MXN)'
            },
            {
              value: '93-摩尔多瓦列伊',
              label: '摩尔多瓦列伊(MDL)'
            },
            {
              value: '94-蒙古图格里克',
              label: '蒙古图格里克(MNT)'
            },
            {
              value: '95-摩洛哥道拉姆',
              label: '摩洛哥道拉姆(MAD)'
            },
            {
              value: '96-缅甸元',
              label: '缅甸元(MMK)'
            },
            {
              value: '97-马达加斯加阿里亚里',
              label: '马达加斯加阿里亚里(MGA)'
            }
          ]
        },
        {
          label: 'N',
          options: [
            {
              value: '98-纳米比亚元',
              label: '纳米比亚元(NAD)'
            },
            {
              value: '99-尼泊尔卢比',
              label: '尼泊尔卢比(NPR)'
            },
            {
              value: '100-尼加拉瓜科多巴',
              label: '尼加拉瓜科多巴(NIO)'
            },
            {
              value: '101-尼日利亚奈拉',
              label: '尼日利亚奈拉(NGN)'
            },
            {
              value: '102-挪威克朗',
              label: '挪威克朗(NOK)'
            },
            {
              value: '103-新西兰元',
              label: '新西兰元(NZD)'
            }
          ]
        },
        {
          label: 'O',
          options: [
            {
              value: '104-阿曼里亚尔',
              label: '阿曼里亚尔(OMR)'
            }
          ]
        },
        {
          label: 'P',
          options: [
            {
              value: '105-巴基斯坦卢比',
              label: '巴基斯坦卢比(PKR)'
            },
            {
              value: '106-巴拿马巴尔博亚',
              label: '巴拿马巴尔博亚(PAB)'
            },
            {
              value: '107-巴布亚新几内亚基那',
              label: '巴布亚新几内亚基那(PGK)'
            },
            {
              value: '108-巴拉圭瓜拉尼',
              label: '巴拉圭瓜拉尼(PYG)'
            },
            {
              value: '109-波兰兹罗提',
              label: '波兰兹罗提(PLN)'
            },
            {
              value: '13-菲律宾比索',
              label: '菲律宾比索(PHP)'
            },
            {
              value: '110-秘鲁索尔',
              label: '秘鲁索尔(PEN)'
            }
          ]
        },
        {
          label: 'Q',
          options: [
            {
              value: '111-卡塔尔利尔',
              label: '卡塔尔利尔(QAR)'
            }
          ]
        },
        {
          label: 'R',
          options: [
            {
              value: '11-俄罗斯卢布',
              label: '俄罗斯卢布(RUB)'
            },
            {
              value: '112-罗马尼亚新列伊',
              label: '罗马尼亚新列伊(RON)'
            },
            {
              value: '113-卢旺达法郎',
              label: '卢旺达法郎(RWF)'
            }
          ]
        },
        {
          label: 'S',
          options: [
            {
              value: '114-瑞典克朗',
              label: '瑞典克朗(SEK)'
            },
            {
              value: '115-萨尔瓦多科朗',
              label: '萨尔瓦多科朗(SVC)'
            },
            {
              value: '117-沙特阿拉伯里亚尔',
              label: '沙特阿拉伯里亚尔(SAR)'
            },
            {
              value: '116-圣多美多布拉',
              label: '圣多美多布拉(STD)'
            },
            {
              value: '118-塞舌尔法郎',
              label: '塞舌尔法郎(SCR)'
            },
            {
              value: '119-塞拉利昂利昂',
              label: '塞拉利昂利昂(SLL)'
            },
            // {
            //   value: '120-斯洛伐克克朗',
            //   label: '斯洛伐克克朗(SKK)'
            // },
            {
              value: '120-斯洛文尼亚托拉捷夫',
              label: '斯洛文尼亚托拉捷夫(SIT)'
            },
            {
              value: '121-所罗门群岛元',
              label: '所罗门群岛元(SBD)'
            },
            {
              value: '122-索马里先令',
              label: '索马里先令(SOS)'
            },
            {
              value: '123-圣赫勒拿群岛磅',
              label: '圣赫勒拿群岛磅(SHP)'
            },
            {
              value: '124-苏丹第纳尔',
              label: '苏丹第纳尔(SDG)'
            },
            {
              value: '125-斯威士兰里兰吉尼',
              label: '斯威士兰里兰吉尼(SZL)'
            },
            {
              value: '126-新加坡元',
              label: '新加坡元(SGD)'
            },
            {
              value: '127-叙利亚镑',
              label: '叙利亚镑(SYP)'
            }
          ]
        },
        {
          label: 'T',
          options: [
            {
              value: '128-土耳其新里拉',
              label: '土耳其新里拉(TRY)'
            },
            {
              value: '129-坦桑尼亚先令',
              label: '坦桑尼亚先令(TZS)'
            },
            {
              value: '12-泰国铢',
              label: '泰国铢(THB)'
            },
            {
              value: '130-汤加潘加',
              label: '汤加潘加(TOP)'
            },
            {
              value: '131-特立尼达和多巴哥元',
              label: '特立尼达和多巴哥元(TTD)'
            },
            {
              value: '132-突尼斯第纳尔',
              label: '突尼斯第纳尔(TND)'
            },
            {
              value: '133-塔吉克斯坦索莫尼',
              label: '塔吉克斯坦索莫尼(TJS)'
            }
          ]
        },
        {
          label: 'U',
          options: [
            {
              value: '134-乌克兰赫夫米',
              label: '乌克兰赫夫米(UAH)'
            },
            {
              value: '135-乌拉圭新比索',
              label: '乌拉圭新比索(UYU)'
            },
            {
              value: '136-乌干达先令',
              label: '乌干达先令(UGX)'
            }
          ]
        },
        {
          label: 'V',
          options: [
            {
              value: '137-瓦努阿图瓦图',
              label: '瓦努阿图瓦图(VUV)'
            },
            {
              value: '138-委内瑞拉博利瓦',
              label: '委内瑞拉博利瓦(VEF)'
            },
            {
              value: '139-越南盾',
              label: '越南盾(VND)'
            }
          ]
        },
        {
          label: 'W',
          options: [
            {
              value: '140-萨摩亚塔拉',
              label: '萨摩亚塔拉(WST)'
            }
          ]
        },
        {
          label: 'X',
          options: [
            {
              value: '141-多哥非洲共同体法郎',
              label: '多哥非洲共同体法郎(XOF)'
            },
            {
              value: '142-刚果中非共同体法郎',
              label: '刚果中非共同体法郎(XAF)'
            },
            {
              value: '143-格林纳达东加勒比元',
              label: '格林纳达东加勒比元(XCD)'
            },
            {
              value: '144-太平洋法郎',
              label: '太平洋法郎(XPF)'
            }
          ]
        },
        {
          label: 'Y',
          options: [
            {
              value: '145-也门里亚尔',
              label: '也门里亚尔(YER)'
            }
          ]
        },
        {
          label: 'Z',
          options: [
            {
              value: '146-津巴布韦元',
              label: '津巴布韦元(ZWD)'
            },
            {
              value: '147-南非兰特',
              label: '南非兰特(ZAR)'
            },
            {
              value: '148-赞比亚克瓦查',
              label: '赞比亚克瓦查(ZMW)'
            }
          ]
        }
      ],
      labval: '人民币CNY',
      labval2: '美元USD',
      isDisable: false,
      iecahuncan: '',
      msgFormSon: [],
      showvalzhi: '',
      // 控制 兑换的显示隐藏
      isfouchuxian: false
    }
  },
  computed: {
    labvalMessage: function() {
      // `this` 指向 vm 实例
      if (this.labval === '人民币CNY') return '人民币'
      return this.labval.split('-')[1]
    },
    labval2Message: function() {
      // `this` 指向 vm 实例
      if (this.labval2 === '美元USD') return '美元'
      return this.labval2.split('-')[1]
    }
  },
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
    // 折线图
    drawLine() {
      // 初始化echart对象
      let myChart = echarts.init(document.getElementById('myChart'))
      myChart.setOption({
        title: {
          // text: '汇率走势'
        },
        tooltip: {
          trigger: 'axis',
          show: false
        },
        legend: {
          orient: 'vertical',
          selectedMode: false,
          textStyle: {
            // 图例文字的样式
            color: '#008BFE',
            fontSize: 16
          }
        },
        grid: {
          show: true,
          left: '10',
          right: '40',
          bottom: '10',
          containLabel: true
        },
        toolbox: {},
        dataZoom: [],
        calculable: true,
        xAxis: {
          name: '时间',
          nameLocation: 'end',
          type: 'category',
          // splitNumber: 10,
          boundaryGap: false,
          axisTick: { show: false }, // 轴线上的点竖线不显示
          axisLine: { show: false }, // 轴线不显示
          data: this.timemothall,
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ccc'],
              width: 1,
              type: 'solid'
            }
          }
        },
        yAxis: {
          name: '汇率',
          type: 'value',
          splitNumber: 8,
          min: this.huimi,
          max: this.huima,
          axisTick: { show: false }, // 轴线上的点竖线不显示
          axisLine: { show: false }, // 轴线不显示
          axisLabel: {
            formatter: '{value}'
          },
          // 网格样式
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ccc'],
              width: 1,
              type: 'solid'
            }
          }
        },
        series: [
          {
            name: this.huiname,
            type: 'line',
            stack: '总量',
            symbol: 'none', // 取消折点圆圈
            clickable: false,
            itemStyle: {
              normal: {
                color: '#008BFE',
                lineStyle: {
                  // 系列级个性化折线样式
                  width: 2,
                  type: 'solid',
                  color: '#008BFE'
                }
              }
            },
            areaStyle: {
              normal: {
                color: '#CAE3F6'
              }
            },
            data: this.huilvall
          }
        ]
      })
    },
    // 下拉框值改变后事件触发
    gaiobianshijian() {
      // 关闭关系
      this.isfouchuxian = false
      this.sizeForm.sum3 = this.sizeForm.sum2 = ''
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
    // 获取对应功能的文章
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
      // 防止多次点击
      this.isDisable = true
      let timerr = setTimeout(() => {
        this.isDisable = false
        window.clearTimeout(timerr)
      }, 3000)
      // 判断是否输入金额
      if (this.sizeForm.sum1 === '') return this.$message.warning('持有金额不能为空')
      let val1 = ''
      let val2 = ''
      if (this.labval === '人民币CNY') {
        val1 = '0'
      } else {
        val1 = this.labval.split('-')[0]
      }
      if (this.labval2 === '美元USD') {
        val2 = '4'
      } else {
        val2 = this.labval2.split('-')[0]
      }
      const { data: res } = await this.$http.post('souqi_tool/currency/calculator/', { money: this.sizeForm.sum1, to_RMB_id: val1, RMB_to_id: val2 })
      if (res.status !== 0) return this.$message.warning(res.msg)
      // console.log(res)
      this.sizeForm.sum2 = res.results[1]
      this.sizeForm.sum3 = res.results[0]
      // 时间数组
      this.timemothall = res.results[2]
      // 汇率数组
      this.huilvall = res.results[3]
      // 汇率最大小值
      this.huimi = Math.min(...this.huilvall).toFixed(4)
      this.huima = Math.max(...this.huilvall).toFixed(4)
      // 将输入框的值赋值给保存值
      this.baosum1val = this.sizeForm.sum1
      // 显示出关系
      this.isfouchuxian = true
      // 名称
      this.huiname = `${this.labvalMessage}兑换${this.labval2Message}`
      // console.log(this.huiname)
      // 获取可视化数据
      this.drawLine()
    },
    // 点击重置按钮
    onreset() {
      this.sizeForm.sum2 = this.sizeForm.sum1 = this.sizeForm.sum3 = this.baosum1val = ''
      this.labval = '人民币CNY'
      this.labval2 = '美元USD'
      // 关闭关系
      this.isfouchuxian = false
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
    width: 50%;
    .box-card {
      // height: 100%;
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
            width: 80%;
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
          #myChart {
            margin: 50px auto;
            padding-left: 5%;
            width: 80%;
            height: 420px;
          }
          .wenp {
            font-size: 5px;
            width: 100%;
            text-align: center;
            color: #333;
          }
          .elteshuqing {
            color: #008bfe;
            width: 100%;
            p {
              width: 100%;
              padding-right: 0px !important;
              text-align: center;
              margin: 0;
              .corheise {
                color: #333333;
              }
            }
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
      // background-color: pink;
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
