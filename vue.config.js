const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap:false,
  lintOnSave: false,
  publicPath:'./',
  // 配置代理跨域
  devServer: {
    proxy: {
      "/api": {
        target:'http://gmall-h5-api.atguigu.cn'
      }
    }
  }
})
