module.exports = {
    runtimeCompiler: true,
    publicPath: '/', // 设置打包文件相对路径
    devServer: {
      // open: process.platform === 'darwin',
      // host: 'localhost',
      // post: 8007,
      // open: true, //配置自动启动浏览器
      proxy: {
        '/api': {
          target: ' https://www.easy-mock.com/mock/5dee0c9d9376f12d5adbd57e', //对应自己的接口
          changeOrigin: true,
          ws: true,
          pathRewrite: {
            '^/api': ''
          }
        }
      }
     },
  }