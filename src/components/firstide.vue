<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="headerleftou">
        <div>
          <img src="../assets/image/souhou.png" alt />
        </div>
        <span>搜企后台管理系统</span>
      </div>
      <div class="yonghunamety">
        <i class="el-icon-s-custom"></i>您好,
        <span>{{usname}}</span>
        <span style="margin:0 10px;">{{usertpte}}</span>
        <el-button type="info" @click="logout">退出</el-button>
      </div>
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse">|||</div>
        <!-- 侧边栏菜单区域 -->
        <el-menu
          background-color="#333744"
          text-color="#fff"
          active-text-color="#409EFF"
          unique-opened
          :collapse="isCollapse"
          :collapse-transition="false"
          router
          :default-active="activePath"
        >
          <!-- 一级菜单 -->
          <el-submenu index="1">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-user"></i>
              <!-- 文本 -->
              <span>用户管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/usepeo" @click="saveNavState('/usepeo')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>内部用户</span>
            </el-menu-item>
            <el-menu-item
              index="/waritpeo"
              @click="saveNavState('/waritpeo')"
              v-if="usertpte ==='管理员'"
            >
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>常规用户</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-danju"></i>
              <!-- 文本 -->
              <span>信息管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/newlist" @click="saveNavState('/newlist')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>新闻列表</span>
            </el-menu-item>
            <el-menu-item index="/baike" @click="saveNavState('/baike')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>百科列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-danju"></i>
              <!-- 文本 -->
              <span>工具管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/toolist" @click="saveNavState('/toolist')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>工具列表</span>
            </el-menu-item>
            <el-menu-item index="/information" @click="saveNavState('/information')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>资讯列表</span>
            </el-menu-item>
          </el-submenu>
           <el-submenu index="4">
            <!-- 一级菜单的模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i class="iconfont icon-danju"></i>
              <!-- 文本 -->
              <span>友链管理</span>
            </template>

            <!-- 二级菜单 -->
            <el-menu-item index="/strands" @click="saveNavState('/strands')">
              <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <!-- 文本 -->
              <span>友链列表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧内容主体 -->
      <el-main>
        <!-- 路由占位符 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 被激活的链接地址
      activePath: '',
      // 用户名
      usname: '',
      // 用户类型
      usertpte: ''
    }
  },
  created() {
    // 页面初始化提出用户名及用户类型
    this.usname = window.sessionStorage.getItem('username1')
    this.usertpte = window.sessionStorage.getItem('user_type1')
    // this.getMenuList()
    this.activePath = window.sessionStorage.getItem('activePath')
    // 页面初始化前判断用户类型是否显示 常规用户栏
  },
  methods: {
    // 判断用户类型是否显示 常规用户栏
    // isnomal() {},
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/souqiadmin')
    },
    // 点击按钮，切换菜单的折叠与展开
    toggleCollapse() {
      this.isCollapse = !this.isCollapse
    },
    // 保存链接的激活状态
    saveNavState(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  }
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .headerleftou {
    display: flex;
    align-items: center;
    div {
      width: 56px;
      height: 56px;
      // margin-left: 5px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    span {
      margin-left: 15px;
    }
  }
}

.el-aside {
  background-color: #333744;
  .el-menu {
    border-right: none;
  }
}

.el-main {
  background-color: #eaedf1;
}

.iconfont {
  margin-right: 10px;
}

.toggle-button {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  letter-spacing: 0.2em;
  cursor: pointer;
}
.yonghunamety {
  font-size: 16px;
  i {
    color: #409eff;
    font-size: 19px;
    margin-right: 5px;
  }
}
</style>
