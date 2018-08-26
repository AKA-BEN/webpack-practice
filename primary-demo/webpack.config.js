const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const path = require('path')

module.exports = {
  entry: {
    main: './src/script/main.js',
    a: './src/script/a.js',
    b: './src/script/b.js'
  },
  output: {
    path: __dirname + '/dist',
    filename: 'js/[name]-[chunkhash].js',
    publicPath: './'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'a.html',
      template: 'index.html',
      inject: false,
      title: 'this is a.html',
      minify: {
        removeComments: false
      },
      chunks: ['main', 'a']
    }),
    new HtmlWebpackPlugin({
      filename: 'b.html',
      template: 'index.html',
      inject: false,
      title: 'this is b.html',
      minify: {
        removeComments: false
      },
      excludeChunks: ['a']
    }),
    new CleanWebpackPlugin(['dist/*'])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: path.resolve(__dirname, 'src'),
        exclude: path.resolve(__dirname, 'node_modules')
      },
      {
        test: /\.html$/,
        include: path.resolve(__dirname, 'src/tpl'),
        use: [ {
          loader: 'html-loader',
          options: {
            minimize: false
          }
        }]
      },
      {
        test: /\.ejs$/,
        include: path.resolve(__dirname, 'src/tpl'),
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
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          { loader: 'postcss-loader', options: {
            ident: 'postcss',
            plugins: (loader) => [
              require('autoprefixer')()
            ]
          } }
        ]
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