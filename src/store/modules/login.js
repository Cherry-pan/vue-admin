import { Login } from "@/api/login.js";
// import cookie from "cookie_js";
import {
  setToken,
  setUseName,
  getUserName,
  removeToken,
  removeUserName
} from "@/utils/app.js";
const state = {
  token: "",
  username: getUserName() || ""
};
const getters = {
  // username: state => state.username
};
const mutations = {
  set_token(state, value) {
    state.token = value;
  },
  set_username(state, value) {
    state.username = value;
  },
  remove_cookie(state) {
    state.token = "";
  }
};
const actions = {
  //可以回调处理事情 利用Pormise调用接口
  // context, data 第一个参数是可以随便定义名称，指向store里，第二个参数是外面传进来的
  login(context, data) {
    return new Promise((resolve, reject) => {
      //调用接口
      Login(data)
        .then(response => {
          let data = response.data.data;
          // console.log(token);

          context.commit("set_token", data.token);
          setToken(data.token);
          context.commit("set_username", data.username);
          setUseName(data.username);
          resolve(response);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  /**
   * 退出一定要把cookie删掉
   */
  exit({ commit }) {
    return new Promise((resolve, reject) => {
      removeToken();
      removeUserName();
      commit("set_token", "");
      commit("set_username", "");
      resolve();
    });
  }
};
export default { namespaced: true, actions, getters, state, mutations };
