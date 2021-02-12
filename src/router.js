import Vue from "vue";
import VueRouter from "vue-router";
import Foo from "./components/Foo.vue";
import Bar from "./components/Bar.vue";

Vue.use(VueRouter);

// 每个人访问服务器都需要产生一个路由系统

export default () => {
  let router = new VueRouter({
    mode: "history",
    routes: [
      { path: "/", component: Foo },
      { path: "/bar", component: Bar },
    ],
  });
  return router;
};
