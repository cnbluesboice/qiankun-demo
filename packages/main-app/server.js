const Koa = require('koa');
const proxy = require('koa-proxies');
const cors = require('@koa/cors');

const app = new Koa();

app.use(cors());

app.use(
  proxy('/api', () => {
    return {
      target: 'http://103.177.28.191:32200',
      changeOrigin: true,
      rewrite: path => path.replace(/^\/api/, '/'),
    };
  })
);

app.listen(5001, () => {
  console.log('Server is running on http://localhost:5001');
});
