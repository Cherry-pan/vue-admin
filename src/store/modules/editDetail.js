const state = {
    /**
     * 已经存储了值，不刷新页面的话，值一直存在vuex
     * 刷新页面，数据丢失，但是可以从sessionStorage中取到值
     */
    id: "" || sessionStorage.getItem("infoId"),
    title: "" || sessionStorage.getItem("infoTitle")
}
const getters = {
    infoId: state => state.id,
    infoTitle: state => state.title
}
const mutations = {
    UPDARE_STATE_VALUE(state, params) {
        // 循环params
        for (const key in params) {
            //存储值
            state[key] = params[key].value
            // 是否存sessionStorage
            if (params[key].sessionStorage) {
                sessionStorage.setItem(params[key].sessionKey, params[key].value);
            }
        }
    },
    // SET_ID(state, value) {
    //     state.id = value;
    //     console.log(state.id, "111111111");
    //     //HTML5本地存储
    //     sessionStorage.setItem("infoId", value);
    // },
    // SET_TITLE(state, value) {
    //     state.title = value;
    //     console.log(state.title, "11111111");
    //     //HTML5本地存储
    //     sessionStorage.setItem("infoTitle", value);
    // }

}
export default {
    namespaced: true,
    state,
    getters,
    mutations
};