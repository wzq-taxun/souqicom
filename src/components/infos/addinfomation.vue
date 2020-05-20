<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>工具管理</el-breadcrumb-item>
      <el-breadcrumb-item>{{!(msg!==undefined) ? msglist[0] : msglist[1]}}</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div class="wenzhangscrit">
        <span>资讯标题:</span>
        <el-input v-model="inputtitle" placeholder="请输入标题"></el-input>
      </div>
      <div class="wenzhangscrit">
        <span>资讯来源:</span>
        <el-input v-model="inputfrom" placeholder="请输入来源"></el-input>
      </div>
      <div class="wenzhangscrit">
        <span>关联工具:</span>
        <el-select v-model="value1" placeholder="请选择工具名称" style="width:100%">
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.tools_name"
            :value="item.id"
          ></el-option>
        </el-select>
      </div>
      <div class="wenzhangfuw">
        <span>资讯内容:</span>
        <div style="width: 100%;" class="editor">
          <quill-editor
            v-model="content"
            ref="rishTextEditor"
            :options="editorOption"
            @blur="onEditorBlur($event)"
            @focus="onEditorFocus($event)"
            @change="onChange($event)"
          >
            <div id="toolbar" slot="toolbar">
              <!-- Add subscript and superscript buttons -->
              <span class="ql-formats" title="加粗">
                <button type="button" class="ql-bold"></button>
              </span>
              <span class="ql-formats" title="斜体">
                <button type="button" class="ql-italic"></button>
              </span>
              <!-- 上传图片图标 -->
              <span class="ql-formats">
                <button type="button" @click="imgClick" style="outline:none" title="图片上传">
                  <svg viewBox="0 0 18 18">
                    <rect class="ql-stroke" height="10" width="12" x="3" y="4" />
                    <circle class="ql-fill" cx="6" cy="7" r="1" />
                    <polyline
                      class="ql-even ql-fill"
                      points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                    />
                  </svg>
                </button>
              </span>
            </div>
          </quill-editor>
        </div>
      </div>
      <!-- 按钮 -->
      <el-row>
        <el-button type="primary" @click="updatedite" v-if="msg!==undefined">更新修改</el-button>
        <el-button type="primary" @click="pushartcile" v-if="!(msg!==undefined)">上传发布</el-button>
        <el-button type="warning" @click="deletall" v-if="!(msg!==undefined)">清空重置</el-button>
        <el-button type="warning" v-if="msg!==undefined" @click="goshang">返回列表</el-button>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      options: [],
      value1: '',
      // id值
      msglist: ['添加资讯', '修改资讯'],
      msg: '',
      name: 'editor',
      value: '',
      // /*上传图片的地址*/
      uploadUrl: 'souqi/admin/add_img/',
      // /*上传图片的file控件name*/
      fileName: 'imgFile',
      maxUploadSize: 1024 * 1024 * 500,
      inputtitle: '',
      inputfrom: '',
      // 保存图片的根路径
      // 本地路径
      // imgpicpeo: 'http://192.168.0.106:8000',
      // 线上路径
      imgpicpeo: 'http://47.240.250.145:8000',
      // 文章显示最后一张图片
      imagelast: '',
      content: '', // 富文本内容
      editorOption: {
        // 符文本编辑器的配置
        placeholder: '',
        theme: 'snow',
        modules: {
          toolbar: '#toolbar',
          imageResize: {
            displayStyles: {
              backgroundColor: 'black',
              border: 'none',
              color: 'white'
            },
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        }
      }
    }
  },
  computed: {
    editor() {
      return this.$refs.rishTextEditor.quill
    }
  },
  created() {
    // 接受传递过来的id
    this.msg = this.$route.query.idzhival
    // console.log(this.msg)
  },
  mounted() {
    this.content = this.value
    // 发送修改当前条资讯接口请求
    this.getdeitartic()
    // 页面加载请求工具名称
    this.getoollist()
  },
  watch: {
    value(newVal, oldVal) {
      if (this.editor) {
        if (newVal !== this.content) {
          this.content = newVal
        }
      }
    }
  },
  methods: {
    // 页面加载请求工具名称
    async getoollist() {
      const { data: res } = await this.$http.get('souqi/admin/tools/add/')
      if (res.status !== 0) return this.$message.warning(res.msg)
      this.options = res.results
    },
    goshang() {
      this.$router.go(-1)
    },
    // 更新修改之上传按钮接口
    async updatedite() {
      if (this.inputtitle.trim() === '' || this.inputfrom.trim() === '' || this.content === '' || this.value1 === '') {
        return this.$message.warning('资讯有空项')
      } else {
        // 获取当前用户的pk值
        let updatepk = window.sessionStorage.getItem('pk1')
        const { data: res } = await this.$http.post('souqi/admin/consulting/update/', {
          admin_pk: updatepk,
          consulting_pk: this.msg.toString(),
          title: this.inputtitle,
          Consulting_source: this.inputfrom,
          associated_tools_id: this.value1.toString(),
          Consulting_content: this.content,
          Consulting_picture: this.imagelast
        })
        console.log(res)
        if (res.status !== 1) return this.$message.error(res.msg)
        // this.$router.go(-1)
        this.$router.push({ path: '/information' })
      }
    },
    // 修改资讯接口-----获取当前条
    async getdeitartic() {
      // console.log(this.msg)
      if (this.msg === undefined) return
      const { data: res } = await this.$http.post(`/souqi/admin/consulting/detailed/`, { consulting_id: this.msg })
      console.log(res)
      if (res.status !== 1) return
      // 进行赋值渲染到页面
      this.content = res.results.consulting_content
      this.inputtitle = res.results.title
      this.inputfrom = res.results.consulting_source
      this.value1 = res.results.associated_tools
    },
    // 点击清除重置按钮触发事件
    deletall() {
      console.log(this.value1)
      // 先判断文章内容是否全部为空 如果是就不出现弹框提示
      if (this.inputtitle.trim() === '' && this.inputfrom.trim() === '' && this.content === '' && this.value1 === '') return this.$message.success('内容为空继续编辑')
      // 弹框提示
      this.$confirm('此操作将清空所有内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空所有内容
          this.value1 = ''
          this.inputtitle = ''
          this.inputfrom = ''
          this.content = ''
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 点击提交按钮触发事件 判断提交内容是否为空
    async pushartcile() {
      // console.log(this.value1.toString())
      let pkk = window.sessionStorage.getItem('pk1')
      console.log(pkk)

      if (this.inputtitle.trim() === '' || this.inputfrom.trim() === '' || this.content === '' || this.value1 === '') {
        return this.$message.warning('资讯不能有空项')
      } else {
        // 获取当前用户的pk值id
        let pkk = window.sessionStorage.getItem('pk1')
        console.log(pkk)
        const { data: res } = await this.$http.post('souqi/admin/consulting/add/', {
          admin_pk: pkk,
          title: this.inputtitle,
          Consulting_source: this.inputfrom,
          associated_tools_id: this.value1.toString(),
          Consulting_content: this.content,
          Consulting_picture: this.imagelast
        })
        console.log(res)
        if (res.status !== 1) return this.$message.error(res.msg)
        // this.$router.go(-1)
        this.$router.push({ path: '/information' })
      }
    },
    // 准备富文本编辑器
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器内容发生改变的时候
    onChange() {
      this.$emit('input', this.content)
    },
    async onFileChange(e) {
      var fileInput = e.target
      if (fileInput.files.length === 0) {
        return
      }
      // /*确定图片要插入的位置*/
      this.editor.focus()
      if (fileInput.files[0].size > this.maxUploadSize) {
        this.$alert('图片不能大于500KB', '图片尺寸过大', {
          confirmButtonText: '确定',
          type: 'warning'
        })
      }
      var formdata = new FormData()
      formdata.append(this.fileName, fileInput.files[0])
      let config = {
        headers: { 'Content-Type': 'multipart/form-data' }
      }
      // /*请求接口*/
      const { data: res } = await this.$http.post(this.uploadUrl, formdata, config)
      // console.log(res)
      if (res.status !== 1) return this.$message.error('上传失败')
      // 赋值给imagelast 只要名字
      let arrlaster = res.results.img_obj.split('/')
      this.imagelast = arrlaster[arrlaster.length - 2] + '/' + arrlaster[arrlaster.length - 1]
      // console.log(this.imagelast)
      // /*使用insertEmbed获取到图片url显示在富文本框内，支持图片和视频类型*/
      this.editor.insertEmbed(this.editor.getSelection().index, 'image', this.imgpicpeo + res.results.img_obj)
    },
    // /*点击上传图片按钮*/
    imgClick() {
      if (!this.uploadUrl) {
        // console.log('no editor uploadUrl')
        return
      }
      // /*内存创建input file 选择文件*/
      var input = document.createElement('input')
      input.type = 'file'
      input.name = this.fileName
      input.accept = 'image/jpeg,image/png,image/jpg,image/gif'
      input.onchange = this.onFileChange
      input.click()
    }
  },
  components: {}
}
</script>

<style lang="less" scoped>
.wenzhangscrit {
  align-items: center;
}
.wenzhangscrit,
.wenzhangfuw {
  display: flex;
  justify-content: flex-start;
  margin: 50px 0;
  span {
    width: 80px;
  }
}
.el-row {
  text-align: end;
  padding-bottom: 20px;
}
</style>
