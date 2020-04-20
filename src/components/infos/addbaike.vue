<template>
  <div>
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/firstde' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>信息管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加百科</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片区域 -->
    <el-card class="box-card">
      <div class="wenzhangscrit">
        <span>标题:</span>
        <el-input v-model="inputtitle" placeholder="请输入标题"></el-input>
      </div>
      <div class="wenzhangscrit">
        <span>来源:</span>
        <el-input v-model="inputfrom" placeholder="请输入来源"></el-input>
      </div>
      <div class="wenzhangfuw">
        <span>内容:</span>
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
              <!--颜色、字体大小等 下拉框要自己补充option value -->
              <!-- <select class="ql-align" title="对齐">
                <option selected></option>
                <option value="center"></option>
                <option value="right"></option>
                <option value="justify"></option>
              </select>-->
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
      // id值
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
    this.msg = this.$route.query.code
  },
  mounted() {
    this.content = this.value
    // 发送修改文章接口请求
    this.getdeitartic()
  },
  watch: {},
  methods: {
    goshang() {
      this.$router.go(-1)
    },
    // 更新修改之上传按钮接口
    async updatedite() {
      if (this.inputtitle.trim() === '' || this.inputfrom.trim() === '' || this.content === '') {
        return this.$message.warning('文章不能为空')
      } else {
        // 获取当前用户的pk值
        let updatepk = window.sessionStorage.getItem('pk1')
        const { data: res } = await this.$http.post('souqi/admin/encyclopedias_manage/change/', {
          admin_pk: updatepk,
          pk: this.msg,
          title: this.inputtitle,
          encyclopedias_source: this.inputfrom,
          encyclopedias_content: this.content,
          encyclopedias_picture: this.imagelast
        })
        // console.log(res)
        if (res.status !== 1) return this.$message.error(res.msg)
        this.$router.go(-1)
      }
    },
    // 修改文章接口-----获取当前条
    async getdeitartic() {
      // console.log(this.msg)
      const { data: res } = await this.$http.post('souqi/admin/encyclopedias_manage/edit/', { pk: this.msg })
      console.log(res.results)
      if (res.status !== 1) return
      // 进行赋值渲染到页面
      this.content = res.results.encyclopedias_content
      this.inputtitle = res.results.title
      this.inputfrom = res.results.encyclopedias_source
    },
    // 点击清除重置按钮触发事件
    deletall() {
      // 先判断文章内容是否全部为空 如果是就不出现弹框提示
      if (this.inputtitle.trim() === '' && this.inputfrom.trim() === '' && this.content === '') return this.$message.success('内容为空继续编辑')
      // 弹框提示
      this.$confirm('此操作将清空所有内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          // 清空所有内容
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
      if (this.inputtitle.trim() === '' || this.inputfrom.trim() === '' || this.content === '') {
        return this.$message.warning('文章不能为空')
      } else {
        // 获取当前用户的pk值
        let pkk = window.sessionStorage.getItem('pk1')
        // console.log(this.content)
        const { data: res } = await this.$http.post('souqi/admin/encyclopedias_manage/add/', {
          pk: pkk,
          title: this.inputtitle,
          encyclopedias_source: this.inputfrom,
          encyclopedias_content: this.content,
          encyclopedias_picture: this.imagelast
        })
        // console.log(res)
        if (res.status !== 1) return this.$message.error('添加失败')
        this.$router.go(-1)
      }
    },
    // 准备富文本编辑器
    onEditorReady(editor) {},
    // 富文本编辑器 失去焦点事件
    onEditorBlur(editor) {},
    // 富文本编辑器 获得焦点事件
    onEditorFocus(editor) {},
    // 富文本编辑器 内容改变事件
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
      // console.log(res.results.img_obj.split('/'))
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
  components: {},
  beforeDestroy() {
    // this.editor = null
    // delete this.editor
  }
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
