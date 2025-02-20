const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://trika.vtexcommercestable.com.br',
      changeOrigin: true,
      secure: false,
      pathRewrite: {
        '^/api': '', 
      },
    })
  );
};
