const Koa = require("koa");
const Router = require("koa-router");
const app = new Koa();
const router = new Router();

const Vue = require("vue");
const VueServerRenderer = require("vue-server-renderer");
const fs = require('fs')
const path = require('path')

const vm = new Vue({
  data: {
    message: 'hello world'
  },
  template: '<div>{{message}}</div>'
})

// 获取模板
const template = fs.readFileSync(path.resolve(__dirname, './src/index.template.html'), 'utf-8')

router.get("/", async (ctx) => {
  // ctx.body = "<div>hello world!</div>";
  ctx.body = await VueServerRenderer.createRenderer({
    template
  }).renderToString(vm);
});

// 将路由注册到应用上
app.use(router.routes());

app.listen(3000, function () {
  console.log("server start port 3000");
});
