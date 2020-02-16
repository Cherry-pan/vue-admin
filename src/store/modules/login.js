import { Login } from "@/api/login.js";
const login = {
  actions: {
    //可以回调处理事情 利用Pormise调用接口
    // context, data 第一个参数是可以随便定义名称，指向store里，第二个参数是外面传进来的
    login(context, data) {
      return new Promise((resolve, reject) => {
        //调用接口
        Login(data)
          .then(response => {
            resolve(response);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
  }
};
export default login;
