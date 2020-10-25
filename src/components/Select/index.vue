<template>
  <el-select v-model="data.defaulValue" @change="select">
    <el-option
      v-for="item in data.initOptionData"
      :key="item.value"
      :label="item.label"
      :value="item.value"
    ></el-option>
  </el-select>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
export default {
  name: "selectValue",
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    selectData: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    const data = reactive({
      defaulValue: "",
      initOptionData: [],
      optionsData: [
        { value: "mobile", label: "手机号" },
        { value: "name", label: "姓名" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    });
    const initOptionData = () => {
      let initData = props.config.initData;
      let arr = [];
      // 数据校验
      if (initData === 0) {
        console.log("config参数是空的，无法显示下拉列，表请检查参数");
        return false;
      }
      initData.forEach(element => {
        let item = data.optionsData.filter(r => r.value == element);
        if (item.length > 0) {
          arr.push(item[0]);
        }
      });
      if (arr === 0) {
        console.log("匹配的数据为空");
        return false;
      }
      // 初始化数据
      data.initOptionData = arr;
      // 默认值
      data.defaulValue = arr[0].value;
      // 未选择事也要传数据到父组件中
      emit("update:selectData", arr[0]);
    };
    // 选择数据触发
    const select = val => {
      let filterData = data.optionsData.filter(item => item.value == val);
      console.log(filterData);
      emit("update:selectData", filterData); //父组件要.aync
    };
    onMounted: {
      initOptionData();
    }
    return {
      data,
      select
    };
  }
};
</script>

<style>
</style>