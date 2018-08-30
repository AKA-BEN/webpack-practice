const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')

const devConfig = merge(base, {
  // 开发服务配置
  devServer: {
    // 配置 服务器文件根目录 (用于访问本地文件)
    // contentBase: path.join(__dirname, 'public'),
    // 服务监听的地址
    host: '127.1.1.1',
    // 监听端口
    port: 8080,
    // 模块热更新
    hot: true,
    // URL路由重定向
    historyApiFallback: {
      rewrites: [
        { from: /^\/demo1/, to: '/demo1.html' },
        { from: /^\/demo2/, to: '/demo2.html' }
      ]
    },
    // 配置是否启用 gzip 压缩
    compress: true,
    // 自动打开默认浏览器
    open: true
  },
  // 生成源代码调试文件
  devtool: 'source-map',
  // 文件出口
  output: {
    filename: 'js/[name]-[hash].js',
    publicPath: '/'
  },
  plugins: [
    // 用于启动 HMR 时可以显示模块的相对路径
    new webpack.NamedModulesPlugin(),
    // Hot Module Replacement 的插件
    new webpack.HotModuleReplacementPlugin(),
  ]
})

module.exports = devConfig