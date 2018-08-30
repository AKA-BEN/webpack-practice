const devConfig = require('./build/webpack.dev')
const prodConfig = require('./build/webpack.prod')

module.exports = (env, argv) => {
  if (argv.mode === 'development') {
    return devConfig
  }
  if (argv.mode === 'production') {
    return prodConfig
  }
}