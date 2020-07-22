import Vue from "vue"; //默认runtime模式编译，指向“vue/dist/vue.runtime.common.js”
import App from "./App.vue";
import router from "./router";
import store from "./store/index.js";

// 引用elementUI模块
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

// 引入Composition API模块
import VueCompositionApi from "@vue/composition-api";

// 自定义组件
import "@/icons/index.js";

// 自定义全局方法
import global from "@/utils/global.js";

// 路由守卫
import "@/router/routGuard.js";
Vue.use(global);
Vue.use(ElementUI);
Vue.use(VueCompositionApi);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
