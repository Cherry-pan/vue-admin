import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import app from "@/store/modules/app.js";
import login from "@/store/modules/login";
import common from "@/store/modules/common";
import editDetail from "@/store/modules/editDetail";
import permission from "@/store/modules/permission";

export default new Vuex.Store({
  modules: {
    app,
    login,
    common,
    editDetail,
    permission
  }
});