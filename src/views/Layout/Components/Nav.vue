<template>
  <div id="nav-wrap">
    <div class="logo">
      <img src="@/assets/logo.png" alt srcset />
    </div>

    <el-menu
      default-active="index"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      background-color="transparent"
      active-text-color="white"
      text-color="white"
      router
    >
      <template v-for="(item,index) in routers">
        <el-submenu :index="index+''" :key="item.id" v-if="!item.hidden">
          <!-- 一级菜单 -->
          <template slot="title">
            <svg-icon :iconClass="item.meta.icon" :className="item.meta.icon"></svg-icon>
            <span slot="title">{{item.meta.name}}</span>
          </template>
          <el-menu-item
            v-for="subItem in item.children"
            :key="subItem.id"
            :index="subItem.path"
          >{{subItem.meta.name}}</el-menu-item>
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import { ref, reactive, computed } from "@vue/composition-api";
import { mapState, mapGetters } from "vuex";
export default {
  name: "navMenu",
  setup(props, { root }) {
    /**
     * computed监听
     */
    // 菜单是否折叠 默认false展开的
    const isCollapse = computed(() => {
      return root.$store.state.app.isCollapse;
    });

    /**
     * 路由--是一个数组
     */
    const routers = reactive(root.$router.options.routes);

    /**
     * 函数方法
     */

    /**
     * return出去
     */
    return {
      isCollapse,
      routers
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.logo {
  text-align: center;
  img {
    margin: auto;
    width: 80px;
    height: 80px;
    margin-top: 18px;
    @include webkit(transition, all 0.3s ease 0s);
  }
}
#nav-wrap {
  position: fixed;
  left: 0;
  top: 0;
  width: $navMenu;
  height: 100vh;
  background-color: #344a5f;
  @include webkit(transition, all 0.3s ease 0s);
  z-index: 999;
  svg {
    font-size: 20px;
    margin-right: 10px;
    margin-top: -5px;
    // 这两个要配合使用
    fill: currentColor;
    color: white;
  }
}
.open {
  #nav-wrap {
    width: $navMenu;
  }
}
.close {
  #nav-wrap {
    width: $navMenuMin;
  }
  .logo img {
    width: 40px;
    height: 40px;
  }
}
</style>