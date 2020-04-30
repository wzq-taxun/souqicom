<template>
  <div id="app">
    <!-- 路由占位符 -->
    <!-- <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />-->
    <router-view />
  </div>
</template>
<script>
export default {
  metaInfo: {
    meta: [
      {
        name: 'keywords',
        content: '搜企'
      },
      {
        name: 'description',
        content: '搜企业-上搜企'
      }
    ]
  },
  name: 'app',
  // 使用watch 监听$router的变化,
  watch: {
    $route: function(to, from) {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0
    }
  }
}
</script>

<style lang="less">
#nprogress .bar {
  background: #fff !important;
}
</style>
