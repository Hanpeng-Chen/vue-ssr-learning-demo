// 服务端渲染入口

import createApp from "./app.js";

export default () => {
  let { app } = createApp();
  return app;
};
