// 服务端渲染入口

import createApp from "./app.js";

export default (context) => {
  const { url } = context; // 上下文
  return new Promise((resolve, reject) => {
    let { app, router, store } = createApp();
    // 这里的app就是newVue，并没有被路由所管理，这里需要等到路由跳转完毕后，再返回服务端渲染
    router.push(url);

    // 路由是异步组件，所以需要等待路由加载完毕
    router.onReady(() => {
      const matchComponents = router.getMatchedComponents();

      if (matchComponents.length === 0) {
        // 没有匹配到前端路由
        return reject({ code: 404 });
      } else {
        // matchComponents：路由匹配到的所有页面级别组件
        Promise.all(
          matchComponents.map((component) => {
            if (component.asyncData) {
              // 服务端在渲染的时候，默认会找到页面级组件中的asyncData，并且在服务端也会创建一个vuex，传递给asyncData
              return component.asyncData(store);
            }
          })
        ).then(() => {
          // 默认会在window下生成一个变量：window.__INITIAL_STATE__ = {name: "xxxx"}
          // 服务器执行完毕后，最新的状态保存在store
          context.state = store.state;
          resolve(app);
        });
      }
    }, reject);
  });
};
