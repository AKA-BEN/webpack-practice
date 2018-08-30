const path = require('path')
const webpack = require("webpack")
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  // 模块入口
  entry: {
    main: resolve('src/script/main.js'),
    demo1: resolve('src/script/demo1.js'),
    demo2: resolve('src/script/demo2.js')
  },
  // 文件出口
  output: {},
  resolve:{
    // 配置别名映射成一个新的导入路径
    alias:{
      css: resolve('src/style'),
      tpl: resolve('src/tpl')
    },
    // 导入文件无扩展名 自动匹配上扩展名
    extensions: ['.js', '.html', '.ejs'],
    // 依赖模块在指定目录下 优先查找
    modules: [
      resolve('node_modules'),
    ]
  },
  // 扩展插件
  plugins: [
    // html模板配置（每个实例生成一个文件）
    new HtmlWebpackPlugin({
      filename: 'demo1.html',
      template: resolve('src/index.html'),
      inject: false,
      title: 'this is demo1.html',
      // 文件压缩
      minify: {
        removeComments: false
      },
      // 插入模板的代码模块
      chunks: ['main', 'demo1']
    }),
    new HtmlWebpackPlugin({
      filename: 'demo2.html',
      template: resolve('src/index.html'),
      inject: false,
      title: 'this is demo2.html',
      minify: {
        removeComments: false
      },
      // 排除插入模板的代码模块
      excludeChunks: ['demo1']
    }),
    // 将引入的css生成单独的css文件
    new ExtractTextPlugin('css/common.css'),
  ],
  // 加载转换器
  module: {
    rules: [
      {
        // 匹配需要转换的文件名正则
        test: /\.js$/,
        // 使用loader转换文件内容
        use: 'babel-loader',
        // 指定转换src文件夹下的文件
        include: resolve('src'),
        // 排除转换node_modules文件夹下的文件
        exclude: resolve('node_modules')
      },
      {
        test: /\.html$/,
        include: resolve('src/tpl'),
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.ejs$/,
        include: resolve('src/tpl'),
        use: 'ejs-loader'
      },
      {
        test: /\.(png|jpg|gif)$/i,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 40000
          }
        },
        {
          loader: 'image-webpack-loader'
        }
      ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1 } },
            { loader: 'postcss-loader', options: {
              ident: 'postcss',
              plugins: (loader) => [
                require('autoprefixer')()
              ]
            } }
          ]
        })
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          { loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('autoprefixer')({browsers: ['last 2 versions']})
              ]
            }
          },
          {loader: "less-loader", options: {
            strictMath: true,
            noIeCompat: true
          }}
        ]
      }
    ]
  }
}