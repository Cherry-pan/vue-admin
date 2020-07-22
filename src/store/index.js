import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "@/store/modules/app.js";
import login from "@/store/modules/login";
import common from "@/store/modules/common";

export default new Vuex.Store({
  modules: {
    app,
    login,
    common
  }
});
