import Vue from 'vue'
import VueRouter from 'vue-router'
// 导入 NProgress 包对应的JS和CSS
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
const Home = () => import(/* webpackChunkName: "group-foo" */ '@/components/home')
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
// 前台
const Register = () => import(/* webpackChunkName: "group-head" */ '@/components/login/register')
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
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
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
    meta: { keepAlive: true },
    component: Ciseasonshi
  },
  {
    path: '/seadetail/:seadetail',
    name: 'seadetail',
    component: Seadetail
  },
  { path: '/souqiadmin', name: 'sqlogadmin', component: Login },
  {
    path: '/firstde', name: 'firstde', component: Firstde, redirect: '/welcome', children: [{ path: '/welcome', component: Welcome }, { path: '/usepeo', component: Usepeo }, { path: '/waritpeo', component: Waritpeo }, { path: '/baike', component: Baike }, { path: '/newlist', component: Newlist }, { path: '/newlist/addnew', component: Addnew }, { path: '/baike/addbaike', component: Addbaike }]
  }
]
const router = new VueRouter({
  mode: 'history',
  base: '/',
  routes
})
/* 路由异常错误处理，尝试解析一个异步组件时发生错误，重新渲染目标页面 */
router.onError((error) => {
  const pattern = /Loading chunk (\d)+ failed/g
  const isChunkLoadFailed = error.message.match(pattern)
  const targetPath = router.history.pending.fullPath
  if (isChunkLoadFailed) {
    router.replace(targetPath)
  }
})
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  if (to.path === '/souqiadmin') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token1')
  if (!tokenStr) {
    if (to.path !== '/firstde' && to.path !== '/welcome' && to.path !== '/usepeo' && to.path !== '/waritpeo' && to.path !== '/baike' && to.path !== '/newlist' && to.path !== '/newlist/addnew' && to.path !== '/baike/addbaike') return next()
    return next('/souqiadmin')
  }
  next()
})
router.afterEach(route => {
  NProgress.done()
})

export default router
