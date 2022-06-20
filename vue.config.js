const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = {
  configureWebpack: {
    resolve: {
      extensions: ['js', 'vue', '.json'],
      alias: {
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('js')
      .include
      .add(resolve('packages'))
      .end()
      .use('babel')
      .loader('babel-loader')
      .tap(options => {
        return options
      })
  }
}
