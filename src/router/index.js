import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Home from '../components/home.vue'
import Register from '../components/login/register.vue'
// const Home = () => import(/* webpackChunkName: "group-foo" */ '@/components/home')
// 后台管理系统路由
const Login = () => import(/* webpackChunkName: "group-foo" */ '@/components/souqilogin')
const Firstde = () => import(/* webpackChunkName: "group-foo" */ '@/components/firstide')
const Welcome = () => import(/* webpackChunkName: "group-foo" */ '@/components/welcome')
const Usepeo = () => import(/* webpackChunkName: "group-foo" */ '@/components/users/usepeo')
const Waritpeo = () => import(/* webpackChunkName: "group-nav" */ '@/components/users/waritpeo')
const Baike = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/baike')
const Newlist = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/newlist')
const Addnew = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/addnew')
const Addbaike = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/addbaike')
const Toolist = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/toolist')
const Information = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/information')
const Subordinate = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/subordinate')
const Addinfomation = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/addinfomation')
const Strands = () => import(/* webpackChunkName: "group-nav" */ '@/components/infos/strands')
// 前台

// const Register = () => import(/* webpackChunkName: "group-head" */ '@/components/login/register')
const Userden = () => import(/* webpackChunkName: "group-head" */ '@/components/login/userden')
const Forgetmi = () => import(/* webpackChunkName: "group-head" */ '@/components/login/forgetmi')
const Classify = () => import(/* webpackChunkName: "group-head" */ '@/components/classification/search')
const Clasearc = () => import(/* webpackChunkName: "group-head" */ '@/components/classification/clasearc')
const Detail = () => import(/* webpackChunkName: "group-art" */ '@/components/classification/detail')
const Search2 = () => import(/* webpackChunkName: "group-art" */ '@/components/classification/search2')
const People = () => import(/* webpackChunkName: "group-art" */ '@/components/classification/people')
const Articlewe = () => import(/* webpackChunkName: "group-art" */ '@/components/hotnews/articlewe')
const Todaytitle = () => import(/* webpackChunkName: "group-art" */ '@/components/hotnews/todaytitle')
const Articledet = () => import(/* webpackChunkName: "group-der" */ '@/components/hotnews/articledet')
const Todaydet = () => import(/* webpackChunkName: "group-der" */ '@/components/hotnews/todaydet')
const Ciseasonshi = () => import(/* webpackChunkName: "group-der" */ '@/components/ciseason/ciseasonshi')
const Seadetail = () => import(/* webpackChunkName: "group-der" */ '@/components/ciseason/seadetail')
const Interest = () => import(/* webpackChunkName: "group-inter" */'@/components/commonuse/interest')
const DIffway = () => import(/* webpackChunkName: "group-inter" */'@/components/commonuse/diffway')
const Hbjsq = () => import(/* webpackChunkName: "group-inter" */'@/components/commonuse/huobi')
const Aboutinte = () => import(/* webpackChunkName: "group-inter" */ '@/components/commonuse/aboutinte')
const Toolslistbook = () => import(/* webpackChunkName: "group-inter" */ '@/components/commonuse/toolslistbook')
const Errorinfo = () => import(/* webpackChunkName: "group-inter" */ '@/components/errorinfo')
const Housemony = () => import(/* webpackChunkName: "group-inter" */ '@/components/commonuse/housemony')
Vue.use(VueRouter)
// 简单配置
NProgress.inc(0.2)
NProgress.configure({
  easing: 'ease',
  speed: 300,
  showSpinner: false,
  trickle: false
})
const routes = [
  {
    path: '/',
    // redirect: '/home',
    component: Home
  },
  {
    path: '/user_register',
    name: 'register',
    component: Register
  },
  {
    path: '/user_userden',
    name: 'userden',
    component: Userden
  },
  {
    path: '/user_forgetmi',
    name: 'forgetmi',
    component: Forgetmi
  },
  {
    path: '/search/:searchid',
    name: 'classify',
    component: Classify
  },
  {
    path: '/search1/:search1',
    name: 'clasearc',
    component: Clasearc
  },
  {
    path: '/detail/:detail',
    name: 'detail',
    component: Detail
  },
  {
    path: '/search2/:search2',
    name: 'search2',
    component: Search2
  },
  {
    path: '/people',
    name: 'people',
    component: People
  },
  {
    path: '/articlewe',
    name: 'articlewe',
    component: Articlewe
  },
  {
    path: '/todaytitle',
    name: 'todaytitle',
    component: Todaytitle
  },
  {
    path: '/articledet/:articledet',
    name: 'articledet',
    component: Articledet
  },
  {
    path: '/todaydet/:todaydet',
    name: 'todaydet',
    component: Todaydet
  },
  {
    path: '/ciseasonshi/:ciseasonid',
    name: 'ciseasonshi',
    // meta: { keepAlive: true },
    component: Ciseasonshi
  },
  {
    path: '/seadetail/:seadetail',
    name: 'seadetail',
    component: Seadetail
  },
  {
    path: '/dkjsq:commonpathid',
    name: 'dkjsq',
    component: Interest,
    meta: {
      title: ''
    }
  },
  {
    path: '/jsq:commonpathid',
    name: 'jsq',
    component: DIffway
  },
  {
    path: '/huilv:commonpathid',
    name: 'huilv',
    component: Hbjsq
  },
  {
    path: '/toolbook:aboutdkid',
    name: 'toolbook',
    component: Aboutinte
  },
  {
    path: '/toolslist:valtolid',
    name: 'toolslist',
    component: Toolslistbook
  },
  {
    path: '/fangdai:commonpathid',
    name: 'fangdai',
    component: Housemony
  },
  // 404page
  {
    path: '/errorinfo',
    name: 'Errorinfo',
    component: Errorinfo
  },
  { path: '/souqiadmin', name: 'sqlogadmin', component: Login },
  {
    path: '/firstde', name: 'firstde', component: Firstde, redirect: '/welcome', children: [{ path: '/welcome', component: Welcome }, { path: '/usepeo', component: Usepeo }, { path: '/waritpeo', component: Waritpeo }, { path: '/baike', component: Baike }, { path: '/newlist', component: Newlist }, { path: '/toolist', component: Toolist }, { path: '/information', component: Information }, { path: '/strands', component: Strands }, { path: '/toolist/subordinate', component: Subordinate }, { path: '/information/addinfomation', component: Addinfomation }, { path: '/newlist/addnew', component: Addnew }, { path: '/baike/addbaike', component: Addbaike }]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
// router.onError((error) => {
//   const pattern = /Loading chunk (\d)+ failed/g
//   const isChunkLoadFailed = error.message.match(pattern)
//   const targetPath = router.history.pending.fullPath
//   if (isChunkLoadFailed) {
//     router.replace(targetPath)
//   }
// })
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  if (to.meta.title) {
    /* 路由发生变化修改页面title */
    document.title = to.meta.title
  }
  if (to.path === '/souqiadmin') {
    return next()
  }
  if (to.matched.length === 0) {
    from.name ? next({
      name: from.name
    }) : next('/errorinfo')
  } else {
    next() // 如果匹配到正确跳转
  }
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token1')
  if (!tokenStr) {
    if (to.path !== '/firstde' && to.path !== '/welcome' && to.path !== '/usepeo' && to.path !== '/waritpeo' && to.path !== '/baike' && to.path !== '/newlist' && to.path !== '/newlist/addnew' && to.path !== '/baike/addbaike' && to.path !== '/toolist' && to.path !== '/information' && to.path !== '/information/addinfomation' && to.path !== '/toolist/subordinate') return next()
    return next('/souqiadmin')
  }
  next()
})
router.afterEach(route => {
  NProgress.done()
})

export default router
