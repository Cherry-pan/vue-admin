const path = require("path");

module.exports = {
  // 基本路径
  publicPath: process.env.NODE_ENV === "production" ? "" : "./",
  // 输出文件目录
  outputDir: process.env.NODE_ENV === "production" ? "dist" : "devdist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: (config) => { //chain : [tʃeɪn] 
    /**
     * SVG文件的配置
     */
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
        include: ["./src/icons"]
      });


    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins.delete("prefetch").delete("preload");
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve.symlinks(true);
    return config;
  },
  configureWebpack: (config) => {
    config.resolve = { //配置解析别名
      extensions: ['.js', '.json', '.vue'], //自动添加文件名后缀
      alias: {
        "vue": "vue/dist/vue.js", //vue文件指向改变
        "@": path.resolve(__dirname, './src'),
        "public": path.resolve(__dirname, './public'),
        "@c": path.resolve(__dirname, './src/components'),
        "common": path.resolve(__dirname, './src/common'),
        "api": path.resolve(__dirname, './src/api'),
        "views": path.resolve(__dirname, './src/views')
      }
    }
  },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // 生产环境是否生成 sourceMap 文件
  productionSourceMap: true,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: false,
    // 开启 CSS source maps?
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      sass: {
        prependData: `@import '@/styles/main.scss';`
      }
    },
    // 启用 CSS modules for all css / pre-processor files.
    //modules: false
    requireModuleExtension: true
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require("os").cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === "darwin",
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: { // 设置代理
      '/web': {
        target: 'http://www.web-jshtml.cn/vue_admin_api/token', //设置你调用的接口域名和端口号 别忘了加http
        changeOrigin: true,
        pathRewrite: {
          '^/web': ''
          //这里理解成用‘/web'代替target里面的地址，后面组件中我们掉接口时直接用web代替 比如我要调用'http://www.web-jshtml.cn/productApi/user/add'，直接写‘/web/user/add'即可
        }
      }
    },
    before: app => {},
    open: true,
    hot: true
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
};