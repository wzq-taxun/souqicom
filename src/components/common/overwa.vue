<template>
  <div>
    <div class="el-main-list">
      <el-card class="box-card">
        <div class="clearfix">
          <span>常用功能</span>
        </div>
        <ul>
          <li @click="gointerest(item, index)" v-for="(item, index) in signlist" :key="index">
            <p>
              <i class="iconfont" :class="item.tool_taxon"></i>
            </p>
            <p>{{item.tools_name}}</p>
          </li>
        </ul>
        <!-- 插槽 -->
        <slot></slot>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 接受功能数据
      signlist: [],
      newoathlist: ['dkjsq', 'jsq', 'huilv', 'fangdai']
    }
  },
  computed: {},
  created() {
    this.getuserway()
  },
  mounted() {},
  watch: {},
  methods: {
    sendsignlist() {
      // func: 是父组件指定的传数据绑定的函数，this.signlist:子组件给父组件传递的数据
      this.$emit('func', this.signlist)
    },
    // 调用 功能名称接口
    async getuserway() {
      const { data: res } = await this.$http.get('souqi/admin/tools/add/home/')
      if (res.status !== 0) return this.$message.warning(res.msg)
      for (let i = 0; i < res.results.length; i++) {
        res.results[i].newname = this.newoathlist
        // res.results[i].icon = this.iconlist
      }
      this.signlist = res.results
      // console.log(this.signlist)
      this.sendsignlist()
    },
    // 去各自的功能页面
    gointerest(val, index) {
      let compath = `${val.id}.html`
      const { href } = this.$router.resolve({
        name: val.newname[index],
        params: { commonpathid: compath }
      })
      window.open(href, '_blank')
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.el-main-list {
  width: 100%;
  height: 1200px;
  margin-top: 50px;
  margin-left: 5px;
  /deep/.el-card__body {
    padding: 0 !important;
    // height: 1100px!important;
    .clearfix {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      border-bottom: 1px solid #eeeeee;
    }
    i {
      color: #008bfe;
    }
    ul {
      padding: 20px 0;
      margin: 0;
      width: 100%;
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        width: 33.33%;
        margin-bottom: 15px;
        cursor: pointer;
        padding: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-around;
        p {
          margin: 5px 0;
          padding: 0;
          font-size: 13px;
          i {
            font-size: 30px;
          }
        }
      }
      li:hover {
        color: #008bfe;
      }
    }
  }
}
</style>
