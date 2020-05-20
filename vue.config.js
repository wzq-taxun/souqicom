
// const path = require('path')
const webpack = require('webpack')
// const PrerenderSPAPlugin = require('prerender-spa-plugin')
// const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
  assetsDir: 'assets',
  indexPath: 'index.html',
  // 基本路径
  publicPath: '/',
  productionSourceMap: false,
  // 输出文件目录
  outputDir: 'dist',
  // assetsDir: 'static',
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
        lodash: '_',
        nprogress: 'NProgress',
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
  },
  configureWebpack: {
    performance: {
      hints: 'warning',
      // 入口起点的最大体积 整数类型（以字节为单位）
      maxEntrypointSize: 50000000,
      // 生成文件的最大体积 整数类型（以字节为单位 300k）
      maxAssetSize: 30000000,
      // 只给出 js 文件的性能提示
      assetFilter: function (assetFilename) {
        return assetFilename.endsWith('.js')
      }
    }
    // plugins: [
    //   new PrerenderSPAPlugin({
    //     // 指定构建好的文件目录
    //     staticDir: path.join(__dirname, 'dist'),
    //     // 指定需要预渲染的的页面的路由
    //     routes: ['/', '/user_register', '/user_userden', '/user_forgetmi', '/people', '/articlewe', '/todaytitle'],
    //     // 这个很重要，如果没有配置这段，也不会进行预编译
    //     renderer: new Renderer({
    //       inject: {
    //         foo: 'bar'
    //       },
    //       headless: false
    //       // renderAfterDocumentEvent: 'render-event', 。
    //       // args: ['--no-sandbox', '--disable-setuid-sandbox']
    //     }),
    //     // html文件压缩
    //     minify: {
    //       minifyCSS: true, // css压缩
    //       removeComments: true // 移除注释
    //     }
    //   })
    // ],
    // resolve: {
    //   alias: {
    //     'vue$': 'vue/dist/vue.esm.js'
    //   }
    // }
  }
}
