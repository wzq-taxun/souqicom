<template>
  <div class="login_container">
    <div class="login_box">
      <!-- 头像区域 -->
      <div class="avatar_box">
        <img src="../assets/image/biao.png" alt />
      </div>
      <!-- 登录表单区域 -->
      <el-form
        ref="loginFormRef"
        :model="loginForm"
        :rules="loginFormRules"
        class="login_form"
        hide-required-asterisk
      >
        <!-- 用户名 -->
        <el-form-item prop="username">
          <el-input v-model="loginForm.username" prefix-icon="el-icon-user" placeholder="请输入您的用户名"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            prefix-icon="el-icon-lock"
            type="password"
            placeholder="请输入您的密码"
          ></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item class="querencode">
          <input v-model="loginForm.code" id="code" placeholder="请输入您的验证码" />
          <span @click="changeCodeImg()">
            <img :src="codeImg" alt="图片加载失败" />
          </span>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item class="btns">
          <el-button type="primary" class="prianniu" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      codeImg: '',
      // 这是登录表单的数据绑定对象
      loginForm: {
        username: '',
        password: '',
        code: ''
      },
      // 这是表单的验证规则对象
      loginFormRules: {
        // 验证用户名是否合法
        username: [{ required: true, message: '请输入登录名称', trigger: 'blur' }, { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }],
        // 验证密码是否合法
        password: [{ required: true, message: '请输入登录密码', trigger: 'blur' }, { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      }
    }
  },
  computed: {},
  created() {
    // // 页面创建前的赋值 线上版本
    this.codeImg = 'http://47.240.250.145:8000/souqi/admin/get_code/'
    // 线下版本
    // this.codeImg = 'http://192.168.0.106:8000/souqi/admin/get_code/'
  },
  mounted() {},
  watch: {},
  methods: {
    // 点击图片 防止缓存
    changeCodeImg() {
      let num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      // // 线上版本
      this.codeImg = `http://47.240.250.145:8000/souqi/admin/get_code/?${num}`
      // 线下版本
      // this.codeImg = `http://192.168.0.106:8000/souqi/admin/get_code/?${num}`
    },
    // 登录
    login() {
      this.$refs.loginFormRef.validate(async valid => {
        if (!valid) return false
        const { data: res } = await this.$http.post('souqi/admin/login/', { username: this.loginForm.username, password: this.loginForm.password, code: this.loginForm.code })
        console.log(res)
        if (res.status !== 0) return this.$message.error(res.msg)
        this.$message.success('登录成功')
        // 发请求返回后台管理系统token1值临时存储
        window.sessionStorage.setItem('token1', res.token)
        window.sessionStorage.setItem('username1', res.results.username)
        window.sessionStorage.setItem('user_type1', res.results.user_type)
        window.sessionStorage.setItem('pk1', res.results.pk)
        this.$router.push('/firstde')
      })
    },
    // 重置
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields()
      this.loginForm.code = ''
    }
  },
  components: {}
}
</script>
<style lang="less" scoped>
.prianniu {
  height: 40px !important;
}
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 350px;
  background-color: #fff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: 1px solid #eee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eee;
    }
  }
}

.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
  margin-top: 20px;
}
.querencode {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  #code {
    height: 35px;
    width: 250px;
    box-sizing: border-box;
    padding-left: 8px;
    border: 0.5px solid #dcdfe6;
  }
  span {
    display: inline-block;
    position: absolute;
    top: 50%;
    margin-left: 10px;
    transform: translateY(-49%);
    width: 150px;
    height: 35px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.btns {
  display: flex;
  justify-content: flex-end;
}
</style>
