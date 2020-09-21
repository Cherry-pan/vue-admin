import {
  getCategory
} from "@/api/news.js";
const state = {
  qiNiuURL: "http://www-web-jshtml-cn-idva7mx.web-jshtml.cn/",
}
const getters = {
  qiNiuURL: state => state.qiNiuURL
}
const mutations = {
}
const actions = {
  getCategory(context, data) {
    return new Promise((resolve, reject) => {
      //调用接口
      getCategory({})
        .then(res => {
          resolve(res.data.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
export default {
  namespaced: true,
  state,
  getters,
  actions,mutations
};