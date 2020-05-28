<template>
  <div class="mainerror">
    <div class="imgc404">
      <img src="../assets/image/tig404.jpg" alt />
    </div>
    <div class="text404">
      <h1>404</h1>
      <p>请检查您输入的网址是否正确，或者点击链接继续浏览</p>
      <a href="http://www.souqi.com">网站首页</a>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {}
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
}
</script>

<style lang="less" scoped>
.mainerror {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .imgc404 {
    width: 421px;
    height: 321px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .text404 {
    margin-left: 30px;
    width: 400px;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    h1 {
      font-size: 70px;
      margin: 0;
    }
    a {
      display: block;
      width: 100px;
      height: 40px;
      line-height: 40px;
      border-radius: 3px;
      text-align: center;
      background-color: #128BED;
      color: #ffffff;
      font-size: 15px;
    }
  }
}
</style>
