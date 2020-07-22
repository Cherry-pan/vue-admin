<template>
  <div id="layout" :class="[menuStatus?'close':'open']">
    <Nav></Nav>
    <Header></Header>
    <Main></Main>
  </div>
</template>

<script>
import Nav from "./Components/Nav";
import Header from "./Components/Header";
import Main from "./Components/Main";
import { computed } from "@vue/composition-api";

export default {
  name: "layout",
  components: {
    Nav,
    Header,
    Main
  },
  setup(props, { root }) {
    const menuStatus = computed(() => root.$store.state.app.isCollapse);
    return {
      menuStatus
    };
  }
};
</script>

<style lang="scss" scoped>
</style>