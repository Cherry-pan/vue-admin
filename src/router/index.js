import Vue from "vue";
import VueRouter from "vue-router";
import Layout from '@/views/Layout/index.vue';

Vue.use(VueRouter);

/**
 * 默认路由
 */
const defaultRouterMap = [{
    path: "/",
    redirect: 'login', //重定向
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  }, {
    path: "/console",
    name: "Console",
    redirect: 'index',
    meta: {
      name: "控制台",
      icon: "iBoard"
    },
    component: Layout,
    children: [{
      path: "/index",
      name: "index",
      meta: {
        name: "首页"
      },
      component: () => import("../views/Console/index.vue"),
    }]
  },
]

/**
 * 动态路由
 */
const asyncRouterMap = [{
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理",
      icon: "info"
    },
    component: Layout,
    children: [{
      path: "/infoIndex",
      name: "infoIndex",
      meta: {
        name: "信息列表"
      },
      component: () => import("../views/Info/index.vue"),
    }, {
      path: "/infoCategiry",
      name: "InfoCategiry",
      meta: {
        name: "信息分类"
      },
      component: () => import("../views/Info/category.vue"),
    }, {
      path: "/editDetail",
      name: "editDetail",
      hidden: true, //不显示
      meta: {
        name: "信息分类"
      },
      component: () => import("../views/Info/editDetail.vue"),
    }]
  },
  {
    path: "/userIndex",

    name: "UserIndex",
    meta: {
      name: "用户管理",
      icon: "user"
    },
    component: Layout,
    children: [{
      path: "/userList",
      name: "UserList",
      meta: {
        name: "用户列表"
      },
      component: () => import("../views/Users/index.vue"),
    }]
  }
]

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: defaultRouterMap
});

export default router;