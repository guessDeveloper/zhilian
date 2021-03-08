// vue.config.js
const path = require('path');
const CompressionWebpackPlugin = require("compression-webpack-plugin"); // 开启gzip压缩， 按需引用
const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i; // 开启gzip压缩， 按需写入
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin; // 打包分析
const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV);
const resolve = (dir) => path.join(__dirname, dir);
const autoprefixer = require('autoprefixer')
const cdn = {
  css: [],
  js: [
    'https://cdn.bootcss.com/vue/2.5.17/vue.runtime.min.js',
    'https://cdn.bootcss.com/vue-router/3.0.1/vue-router.min.js',
    'https://cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    'https://cdn.bootcss.com/axios/0.18.0/axios.min.js',
  ]
}
module.exports = {
  // 选项...
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/', // 公共路径
  indexPath: 'index.html', // 相对于打包路径index.html的路径
  outputDir: process.env.outputDir || 'dist', // 'dist', 生产环境构建文件的目录
  assetsDir: 'static', // 相对于outputDir的静态资源(js、css、img、fonts)目录
  lintOnSave: false, // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码
  runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
  productionSourceMap: !IS_PROD, // 生产环境的 source map
  chainWebpack: config => {
    // 生产环境配置
    if (IS_PROD) {
      // 生产环境注入cdn
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
    }
  },
  configureWebpack: config => {
    // 开启 gzip 压缩
    // 需要 npm i -D compression-webpack-plugin
    const plugins = [];
    // config.externals = {
    //   'vue': 'Vue',
    //   'vuex': 'Vuex',
    //   'vue-router': 'VueRouter',
    //   'axios': 'axios'
    // }
    if (IS_PROD) {

      plugins.push(
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      );
    }
    config.plugins = [...config.plugins, ...plugins];
  },
  css: {
    loaderOptions: {
      css: {},
      postcss: {
        plugins: [
          // autoprefixer({
          //   overrideBrowserslist: ['ie >= 8', 'Firefox >= 20', 'Safari >= 5', 'Android >= 4', 'Ios >= 6', 'last 4 version'],
          //   remove: true
          // }),
          require('postcss-px2rem')({
            remUnit: 37.5
          })
        ]
        // plugins: {
        //   'autoprefixer': {
        //     overrideBrowserslist: [
        //       "Android 4.1",
        //       "iOS 7.1",
        //       "Chrome > 31",
        //       "ff > 31",
        //       "ie >= 8"
        //     ]
        //   },
        //   'postcss-pxtorem': {
        //     rootValue: 37.5,
        //     propList: ['*']
        //   }
        // }
      },
      less: {
        // 若 less-loader 版本小于 6.0，请移除 lessOptions 这一级，直接配置选项。
        lessOptions: {
          modifyVars: {
            // 直接覆盖变量
            'text-color': '#333',
            'border-color': '#eee',
            // 或者可以通过 less 文件覆盖（文件路径为绝对路径）
            hack: `true; @import "/src/assets/less/theme.less";`,
          },
        },
      },
    }
  },
  devServer: {
    // overlay: { // 让浏览器 overlay 同时显示警告和错误
    //   warnings: true,
    //   errors: true
    // },
    // // host: "localhost",
    // port: 8080, // 端口号
    // https: false, // https:{type:Boolean}
    // open: false, //配置自动启动浏览器
    // hotOnly: true, // 热更新
    // proxy: 'http://localhost:8080'  // 配置跨域处理,只有一个代理
    proxy: { //配置多个跨域
      "/Sev": {
        target: 'http://mapcard.zhiding.com.cn/',
        // changeOrigin: true,
        // ws: true,//websocket支持
        // secure: false,
        pathRewrite: {
          "^/Sev": "/"
        }
      },
    }
  },
  pluginOptions: {
    "style-resources-loader": {
      preProcessor: "less",
      patterns: ["./src/assets/less/theme.less"] //引入全局less文件
    }
  },

}