import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

// 服务端中使用vuex，将数据保存到全局变量window，浏览器用服务端渲染好的数据，进行替换
export default () => {
  let store = new Vuex.Store({
    state: {
      name: "Vue SSR",
    },
    mutations: {
      changeName(state, payload) {
        state.name = payload;
      },
    },
    actions: {
      changeName({ commit }) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            commit("changeName", "Vue SSR Demo");
            resolve()
          }, 1000);
        });
      },
    },
  });

  // window.__INITIAL_STATE__ 是服务端渲染后的state数据
  if (typeof window != 'undefined' && window.__INITIAL_STATE__) {
    // 浏览器开始渲染
    store.replaceState(window.__INITIAL_STATE__) // 用服务端渲染好的数据替换掉
  }

  return store;
};
