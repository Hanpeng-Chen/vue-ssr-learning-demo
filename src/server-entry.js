// 服务端渲染入口

import createApp from "./app.js";

export default ({ url }) => {
  return new Promise((resolve, reject) => {
    let { app, router } = createApp();
    // 这里的app就是newVue，并没有被路由所管理，这里需要等到路由跳转完毕后，再返回服务端渲染
    router.push(url);

    // 路由是异步组件，所以需要等待路由加载完毕
    router.onReady(() => {
      const matchComponents = router.getMatchedComponents();
      if (matchComponents.length === 0) {
        // 没有匹配到前端路由
        return reject({ code: 404 });
      }
      resolve(app);
    }, reject);
  });
};
