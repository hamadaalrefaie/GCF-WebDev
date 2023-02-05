const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/v1/projects',
    createProxyMiddleware({
      target: 'https://api.gcfund.org',
      changeOrigin: true,
    })
  );
};