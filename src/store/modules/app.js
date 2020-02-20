const state = {
  isCollapse: JSON.parse(sessionStorage.getItem("isCollapse")) || false
};
const getters = {
  isCollapse: state => state.isCollapse
};
const mutations = {
  //同步 没有回调处理事情
  SET_COLLAPSE(state) {
    state.isCollapse = !state.isCollapse;
    //HTML5本地存储
    sessionStorage.setItem("isCollapse", JSON.stringify(state.isCollapse));
  }
};

export default { namespaced: true, state, getters, mutations };
