import Vue from 'vue'
import App from './App.vue'
import MetaInfo from 'vue-meta-info'
// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// // 导入字体图标
import './assets/icon/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
// 引入axios
import axios from 'axios'
// // 导入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
// require styles 导入富文本编辑器对应的样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
import router from './router'
// // 引入编辑器
import * as Quill from 'quill'
import imageResize from 'quill-image-resize-module'
Quill.register('modules/imageResize', imageResize)
// 配置请求的跟路径
axios.defaults.baseURL = 'http://47.240.250.145:8000/'
// 挂在到Vue原型对象上 可以通过this._proto_ == this.形式访问
Vue.prototype.$http = axios
Vue.use(MetaInfo)
Vue.config.productionTip = false
Vue.use(VueQuillEditor)
new Vue({
  router,
  // 添加mounted，不然不会执行预编译
  // mounted() {
  //   document.dispatchEvent(new Event('render-event'))
  // },
  render: h => h(App)
}).$mount('#app')
