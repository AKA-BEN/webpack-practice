const path = require('path')
const merge = require('webpack-merge')
const webpack = require('webpack')
const base = require('./webpack.base.js')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const prodConfig = merge(base, {
  // 文件出口
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'js/[name]-[chunkhash].js',
    publicPath: './'
  },
  plugins: [
    // 在打包前清除之前的文件
    new CleanWebpackPlugin(['dist/*'])
  ]
})

module.exports = prodConfig