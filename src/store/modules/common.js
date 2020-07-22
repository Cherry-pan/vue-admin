import { getCategory } from "@/api/news.js";
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
export default { namespaced: true, actions };
