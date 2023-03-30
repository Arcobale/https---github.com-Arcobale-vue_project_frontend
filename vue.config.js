const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  //关闭项目打包时产生map
  productionSourceMap: false,
  transpileDependencies: true,
  //关闭eslint
  lintOnSave: false,
  //代理跨域
  devServer: {
    proxy: {
      '/api': {
        target: 'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
