import router from "@/router/index.js";
import store from '@/store/index.js';
import { getToken, removeToken ,removeUserName} from "@/utils/app.js";

// 白名单
const whiteRouter = ["/login"]; //indexOf方法，判断数组中是否存在指定的某个对象 如果不存在，则返回-1

// 路由守卫
router.beforeEach((to, from, next) => {
  if (getToken()) {
    if (to.path === "/login") {
      removeToken();
      removeUserName();
      // 清空cookie
      store.commit("login/set_token", "")
      store.commit("login/set_username","")
      next();
    } else {
      next();
    }

    /**
     * 1.to = /console
     * 2.to = index
     */
    // 路由动态添加，分配菜单，每个角色分配不同的菜单
  } else {
    if (whiteRouter.indexOf(to.path) !== -1) {
      //存在
      next();
    } else {
      // 获取用户的角色
      // 动态分配路有权限
      next("/login");
    }
  }
  /**
   * console.log(to); 即将要去的页面（下一个）
  console.log(from); 离开之前的页面（上一个）
  console.log(next); to
   */
  // next('/index');有路由指向，会重复判断，造成死循环
  next(); //不带参数的话，不会进行beforeEach
});
