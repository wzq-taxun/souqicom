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
              <!-- ---------------------------------------------------------------------- -->
              <div class="calculator">
                <div class="results">
                  <input class="input" v-model="current" />
                </div>
                <div class="toggle-button">
                  <el-radio v-model="radio" label="1" @change="changeModeEvent">普通</el-radio>
                  <el-radio v-model="radio" label="2" @change="changeModeEvent">高级</el-radio>
                </div>
                <div class="mode" v-if="changeMode">
                  <button class="button btn-30" @click="press">7</button>
                  <button class="button btn-30" @click="press">8</button>
                  <button class="button btn-30" @click="press">9</button>
                  <button class="button btn-70" @click="press">*</button>
                  <button class="button btn" @click="press">&lt;=</button>
                  <button class="button btn" @click="press">C</button>
                  <button class="button btn-30" @click="press">4</button>
                  <button class="button btn-30" @click="press($event)">5</button>
                  <button class="button btn-30" @click="press">6</button>
                  <button class="button btn-70" @click="press">/</button>
                  <button class="button btn-70" @click="press">(</button>
                  <button class="button btn-70" @click="press">)</button>
                  <button class="button btn-30" @click="press">1</button>
                  <button class="button btn-30" @click="press">2</button>
                  <button class="button btn-30" @click="press">3</button>
                  <button class="button btn-70" @click="press">-</button>
                  <button class="button btn-70" @click="press">x 2</button>
                  <button class="button btn-70" @click="press">±</button>
                  <button class="button btn-30" @click="press">0</button>
                  <button class="button btn-30" @click="press">.</button>
                  <button class="button btn-70" @click="press">%</button>
                  <button class="button btn-70" @click="press">+</button>
                  <button class="button equal-sign" @click="press">=</button>
                </div>
                <div class="mode" v-else>
                  <button class="button btn-70" @click="press">sin</button>
                  <button class="button btn-70" @click="press">cos</button>
                  <button class="button btn-70" @click="press">tan</button>
                  <button class="button btn-70" @click="press">x^</button>
                  <button class="button btn" @click="press">&lt;=</button>
                  <button class="button btn" @click="press">C</button>
                  <button class="button btn-70" @click="press">log</button>
                  <button class="button btn-70" @click="press">ln</button>
                  <button class="button btn-70" @click="press">e</button>
                  <button class="button btn-70" @click="press">°</button>
                  <button class="button btn-70" @click="press">rad</button>
                  <button class="button btn-70" @click="press">√</button>
                  <button class="button btn-30" @click="press">7</button>
                  <button class="button btn-30" @click="press">8</button>
                  <button class="button btn-30" @click="press">9</button>
                  <button class="button btn-70" @click="press">/</button>
                  <button class="button btn-70" @click="press">x 2</button>
                  <button class="button btn-70" @click="press">x !</button>
                  <button class="button btn-30" @click="press">4</button>
                  <button class="button btn-30" @click="press">5</button>
                  <button class="button btn-30" @click="press">6</button>
                  <button class="button btn-70" @click="press">*</button>
                  <button class="button btn-70" @click="press">(</button>
                  <button class="button btn-70" @click="press">)</button>
                  <button class="button btn-30" @click="press">1</button>
                  <button class="button btn-30" @click="press">2</button>
                  <button class="button btn-30" @click="press">3</button>
                  <button class="button btn-70" @click="press">-</button>
                  <button class="button btn-70" @click="press">%</button>
                  <button class="button btn-70" @click="press">±</button>
                  <button class="button btn-30" @click="press">0</button>
                  <button class="button btn-30" @click="press">.</button>
                  <button class="button btn-30" @click="press">π</button>
                  <button class="button btn-70" @click="press">+</button>
                  <button class="button equal-sign" @click="press">=</button>
                </div>
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
    title: '常规计算器',
    meta: [
      {
        name: 'keywords',
        content: '计算器'
      },
      {
        name: 'description',
        content: '普通计算器'
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
      radio: '1',
      current: '',
      changeMode: true,
      // ------
      iecahuncan: '',
      msgFormSon: [],
      showvalzhi: ''
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
    // ---------------------------------
    press: function(event) {
      let me = this
      let key = event.target.textContent

      if (
        key !== '=' &&
        key !== 'C' &&
        key !== '*' &&
        key !== '/' &&
        key !== '√' &&
        key !== 'x 2' &&
        key !== '%' &&
        key !== '<=' &&
        key !== '±' &&
        key !== 'sin' &&
        key !== 'cos' &&
        key !== 'tan' &&
        key !== 'log' &&
        key !== 'ln' &&
        key !== 'x^' &&
        key !== 'x !' &&
        key !== 'π' &&
        key !== 'e' &&
        key !== 'rad' &&
        key !== '°'
      ) {
        me.current += key
      } else if (key === '=') {
        if (me.current.indexOf('^') > -1) {
          let base = me.current.slice(0, me.current.indexOf('^'))
          let exponent = me.current.slice(me.current.indexOf('^') + 1)
          // eslint-disable-next-line no-eval
          me.current = eval('Math.pow(' + base + ',' + exponent + ')')
        } else {
          // eslint-disable-next-line no-eval
          me.current = eval(me.current)
        }
      } else if (key === 'C') {
        me.current = ''
      } else if (key === '*') {
        me.current += '*'
      } else if (key === '/') {
        me.current += '/'
      } else if (key === '+') {
        me.current += '+'
      } else if (key === '-') {
        me.current += '-'
      } else if (key === '±') {
        if (me.current.charAt(0) === '-') {
          me.current = me.current.slice(1)
        } else {
          me.current = '-' + me.current
        }
      } else if (key === '<=') {
        me.current = me.current.substring(0, me.current.length - 1)
      } else if (key === '%') {
        me.current = me.current / 100
      } else if (key === 'π') {
        me.current = me.current * Math.PI
      } else if (key === 'x 2') {
        // eslint-disable-next-line no-eval
        me.current = eval(me.current * me.current)
      } else if (key === '√') {
        me.current = Math.sqrt(me.current)
      } else if (key === 'sin') {
        me.current = Math.sin(me.current)
      } else if (key === 'cos') {
        me.current = Math.cos(me.current)
      } else if (key === 'tan') {
        me.current = Math.tan(me.current)
      } else if (key === 'log') {
        me.current = Math.log10(me.current)
      } else if (key === 'ln') {
        me.current = Math.log(me.current)
      } else if (key === 'x^') {
        me.current += '^'
      } else if (key === 'x !') {
        // eslint-disable-next-line no-unused-vars
        let number = 1
        if (me.current === 0) {
          me.current = '1'
        } else if (me.current < 0) {
          me.current = NaN
        } else {
          let number = 1
          for (let i = me.current; i > 0; i--) {
            number *= i
          }
          me.current = number
        }
      } else if (key === 'e') {
        me.current = Math.exp(me.current)
      } else if (key === 'rad') {
        me.current = me.current * (Math.PI / 180)
      } else if (key === '°') {
        me.current = me.current * (180 / Math.PI)
      }
    },
    changeModeEvent: function(e) {
      // console.log(e)
      let me = this
      me.changeMode = !me.changeMode
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
        margin: 10px auto;
        border-radius: 20px 20px 0 0;
        border: 2px solid #ccc;
        background-color: #f7f7f7;
        // ------------------------------------------------------------------content: '\e824';
        .calculator {
          width: 440px;
          padding: 10px;
          // padding-top: 0;
          border-radius: 5px;
          margin: 150px auto;
          font-size: 16px;
          background-color: #696f7a;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          p {
            margin-top: 0;
          }
          .results {
            margin-bottom: 15px;
            .input {
              width: 420px;
              height: 60px;
              border-radius: 6px;
              outline: none;
              background-color: #fff;
              color: #000;
              font-size: 30px;
            }
          }
          .toggle-button {
            padding: 15px 0;
            /deep/.el-radio {
              color: #fff;
            }
          }
          .mode {
            padding: 0px;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-around;
            .button {
              margin: 5px;
              width: 60px;
              height: 60px;
              border: 1px solid #696f7a;
              border-radius: 2px;
              -webkit-border-radius: 2px;
              color: #d9d9d9;
              cursor: pointer;
              font-size: 20px;
              font-weight: 700;
              font-family: Verdana, Geneva, sans-serif;
            }
            .btn-30 {
              background-image: linear-gradient(#3a76c4, #294c84);
            }
            .btn-70 {
              background-image: linear-gradient(#875c42, #553828);
            }
            .btn {
              color: #ff5050;
              background: linear-gradient(#4f5967, #313947);
            }
            .equal-sign {
              color: #ff5050;
              background: linear-gradient(#4f5967, #313947);
              width: 133px;
            }
            .btn-30:active {
              background-image: linear-gradient(#294c84, #3a76c4);
            }
            .btn-70:active {
              background-image: linear-gradient(#553828, #875c42);
            }
            .btn:active,
            .equal-sign:active {
              background: linear-gradient(#313947, #4f5967);
            }
            button:focus {
              outline: none;
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
