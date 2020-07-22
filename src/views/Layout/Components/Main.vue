<template>
  <div id="main-wrap">
    <div class="main-content">
      <div class="content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  setup(props, { root }) {
    
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
#main-wrap {
  // position: fixed;
  // top: 75px;
  // left: $navMenu;
  // right: 0;
  // bottom: 0;
  // border: 30px solid #f7f7f7;
  // border-bottom: none;
  height: 100vh;
}
.main-content,
.content {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding-right: 30px;
  @include webkit(transition, all 0.3s ease 0s);
  @include webkit(box-sizing, border-box);
}
.main-content {
  padding-top: $layoutHeader + 30;
  padding-left: $navMenu + 30;
  background-color: #f8f6f9;
}
.open {
  .main-content {
    padding-left: $navMenu + 30;
  }
}
.close {
  .main-content {
    padding-left: $navMenuMin + 30;
  }
}
.content {
  padding-top: 30px;
  padding-left: 30px;
  background-color: white;
}
</style>