# Webpack Primary Demo

## 目录

* ### [npm script](#npm-scripe)
* ### [配置文件](#configuration-file)


<h2 id="npm-scripe">npm script</h2>

* ##### 开发环境： `npm run dev`
* ##### 生产环境： `npm run build`

<h2 id="configuration-file">配置文件</h2>

* ##### 基础配置： `build/webpack.base.js`
* ##### 开发环境配置： `build/webpack.dev.js` +  基础配置 to Merge
* ##### 生产环境配置： `build/webpack.prod.js` +  基础配置 to Merge
* ##### 构建默认配置： `webpack.config.js`
  ```javascript
    // 根据 mode 环境变量提供不同的配置
    module.exports = (env, argv) => {
      if (argv.mode === 'development') {
        return devConfig
      }
      if (argv.mode === 'production') {
        return prodConfig
      }
    }
  ```