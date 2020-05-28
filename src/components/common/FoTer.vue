<template>
  <div class="elftr">
    <!-- 底部 -->
    <div class="footer-hear"></div>
    <div class="footer-di">
      <div class="footer-dinei">
        <div class="zhuadghuadg">
          <p>
            数据来源:
            全国企业信用信息公示系统中国裁判文书网中国执行信息公开网国家知识产权局商标局版权局
          </p>
          <p>本系统供网友查询公司信息等，请以工商局数据为准，勿用作他途，如涉及侵权，请联系删除。</p>
          <p>
            友情链接:
            <span v-for="(item) in frenidslist" :key="item.id" style="margin: 0 20px;">
              <a :href="item.links_address" style="color:#7281AD">{{item.links_name}}</a>
            </span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      // 有脸数据
      frenidslist: []
    }
  },
  computed: {},
  created() {},
  mounted() {
    // 获取友情链接
    this.getfrideurls()
  },
  watch: {},
  methods: {
    async getfrideurls() {
      const { data: res } = await this.$http.get('souqi/admin/friend_links/check/')
      console.log(res)
      if (res.status !== 1) return this.$message.warning(res.msg)
      this.frenidslist = res.results
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
// 底部
.elftr {
  width: 100%;
  padding: 0;
  .footer-di {
    height: 100px;
    width: 100%;
    background-color: #202427;
    .footer-dinei {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 70%;
      margin: 0 auto;
      .zhuadghuadg {
        font-size: 13px;
        color: #7281ad;
      }
      .fjidufid {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        div {
          margin-left: 3px;
        }
      }
    }
  }
}
</style>
