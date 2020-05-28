
const webpack = require('webpack')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
// const path = require('path')
module.exports = {
  assetsDir: 'assets',
  indexPath: 'index.html',
  // 基本路径
  publicPath: '/',
  productionSourceMap: false,
  // 输出文件目录
  outputDir: 'dist',
  // assetsDir: 'static',
  // css: {
  //   extract: true
  // },
  chainWebpack: config => {
    config.plugin('provide').use(webpack.ProvidePlugin, [{
      'window.Quill': 'quill'
    }])
    config
      .plugin('webpack-bundle-analyzer')
      .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
    // 发布模式
    config.when(process.env.NODE_ENV === 'production', config => {
      config.entry('app').clear().add('./src/main-prod.js')
      config.set('externals', {
        vue: 'Vue',
        'vue-router': 'VueRouter',
        axios: 'axios',
        // lodash: '_',
        nprogress: 'NProgress',
        echarts: 'echarts',
        'element-ui': 'ELEMENT'
      })
      config.plugin('html').tap(args => {
        args[0].isProd = true
        return args
      })
    })
    // 生产模式
    config.when(process.env.NODE_ENV === 'development', config => {
      config.entry('app').clear().add('./src/main-dev.js')
      config.plugin('html').tap(args => {
        args[0].isProd = false
        return args
      })
    })
  }
  // configureWebpack: () => {
  //   if (process.env.NODE_ENV !== 'production') return
  //   return {
  //     plugins: [
  //       new PrerenderSPAPlugin({
  //         // 生成文件的路径，也可以与webpakc打包的一致。
  //         // 下面这句话非常重要！！！
  //         // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
  //         staticDir: path.join(__dirname, 'dist'),
  //         // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
  //         routes: ['/', '/user_register', '/todaytitle', '/articlewe'],
  //         // html文件压缩
  //         minify: {
  //           minifyCSS: true, // css压缩
  //           removeComments: true // 移除注释
  //         },
  //         // 这个很重要，如果没有配置这段，也不会进行预编译
  //         renderer: new Renderer({
  //           renderAfterTime: 5000,
  //           inject: {
  //             foo: 'bar'
  //           },
  //           headless: false,
  //           // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
  //           renderAfterDocumentEvent: 'render-event'
  //         })
  //       })
  //     ]
  //   }
  // }
}
