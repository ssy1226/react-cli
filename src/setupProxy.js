const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/api', {
      // 代理服务器地址
      target: 'http://47.92.156.201:3000',
      secure: false,
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/api'
      }
    })
  )
}
