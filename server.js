const Koa = require("koa");
const Router = require("koa-router");
const static = require("koa-static");
const app = new Koa();
const router = new Router();

const Vue = require("vue");
const VueServerRenderer = require("vue-server-renderer");
const fs = require("fs");
const path = require("path");

const serverBundle = fs.readFileSync(
  path.resolve(__dirname, "dist/server.bundle.js"),
  "utf-8"
);
const template = fs.readFileSync(
  path.resolve(__dirname, "dist/server.html"),
  "utf-8"
);
const render = VueServerRenderer.createBundleRenderer(serverBundle, {
  template,
});

router.get("/", async (ctx) => {
  ctx.body = await new Promise((resolve, reject) => {
    render.renderToString((err, html) => {
      // 必须写成回调函数的方式否则样式不生效
      resolve(html);
    });
  });
});

// 将路由注册到应用上
app.use(router.routes());
app.use(static(path.resolve(__dirname, "dist")));
app.listen(3000, function () {
  console.log("server start port 3000");
});
