<template>
  <div id="app">
    <!-- 路由占位符 -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive" />
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive" />
  </div>
</template>
<script>
export default {
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
