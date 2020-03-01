<template>
  <div id="header-wrap">
    <div class="flex just-c">
      <div class="header-icon" @click="navMenuState">
        <svg-icon iconClass="menu" class="menu"></svg-icon>
      </div>
      <div class="flex">
        <div class="flex a-item">
          <img
            src="https://i0.hdslb.com/bfs/face/ab8f7c88f46fd060bb6f661c8695604aae61a515.jpg@96w_96h_100Q_1c.webp"
            alt
            style="width:40px;height:40px; border-radius: 50%;"
          />
          <div class="user-info">{{username}}</div>
        </div>
        <div class="header-icon" @click="exit">
          <svg-icon iconClass="logout" class="logout"></svg-icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "@vue/composition-api";
export default {
  setup(props, { root }) {
    const username = computed(() => root.$store.state.login.username);
    /***
     * 菜单的收缩
     */
    const navMenuState = () => {
      root.$store.commit("app/SET_COLLAPSE");
    };

    /**
     * 退出
     */
    const exit = () => {
      root.$store.dispatch("login/exit").then(()=>{
        root.$router.push({
          name:"login"
        })
      });
    };

    return {
      navMenuState,
      username,
      exit
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#header-wrap {
  position: fixed;
  top: 0;
  right: 0;
  left: $navMenu;
  height: $layoutHeader;
  background-color: white;
  @include webkit(box-shadow, 0 3px 16px 0 rgba(0, 0, 0, 0.1));
  @include webkit(transition, all 0.3s ease 0s);
  line-height: $layoutHeader;
  z-index: 3;
}
.open {
  #header-wrap {
    left: $navMenu;
  }
}
.close {
  #header-wrap {
    left: $navMenuMin;
  }
}
.header-icon {
  padding: 0 32px;
  svg {
    font-size: 25px;
    margin-bottom: -5px;
    cursor: pointer;
  }
}
.user-info {
  height: 100%;
  border-right: 1px solid #ededed;
  padding-right: 32px;
  padding-left: 20px;
  + .header-icon {
    padding: 0 28px;
  }
}
</style>