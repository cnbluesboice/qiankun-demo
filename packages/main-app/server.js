const Koa = require('koa');
const proxy = require('koa-proxies');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());

app.use(
  proxy('/sub-next', () => {
    console.log(1112233);
    return {
      target: 'http://localhost:3000',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/sub-next/, '/'),
    };
  })
);

app.use(
  proxy('/_next', () => {
    console.log(5555555);
    return {
      target: 'http://localhost:4001/',
      changeOrigin: true,
      // rewrite: path => path.replace(/^\/_next/, '/.next'),
    };
  })
);

// 其他路由和中间件配置s

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
