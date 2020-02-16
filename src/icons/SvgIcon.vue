<template>
  <svg :class="svgClass" aria-hidden="true">
    <use :xlink:href="iconName" />
  </svg>
</template>

<script>
import { ref, computed } from "@vue/composition-api";
export default {
  name: "svgIcon",
  // props:["iconClass","className"],
  props: {
    //分页
    iconClass: {
      type: String, //定义接收的值类型
      default: "" //默认值
    },
    className: {
      type: String,
      default: ""
    }
  },
  setup(props) {
    const count = ref(1);
    /**
     * computed 监听属性变化，并计算属性
     */
    const plusOne = computed(() => count.value + 1);

    // 计算属性，得出最终结果，并返回
    const iconName = computed(() => `#icon-${props.iconClass}`);

    // 判断类名是否存在className
    const svgClass = computed(() => {
      if (props.className) {
        return `svg-icon ${props.className}`;
      } else {
        return `svg-icon`;
      }
    });

    return {
      plusOne,
      iconName,
      svgClass
    };
  }
};
</script>

<style lang="scss" scoped>
.svg-icon {
  width: 1em;
  height: 1em;
}
</style>