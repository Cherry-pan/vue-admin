<template>
  <el-select v-model="defaulValue">
    <el-option
      v-for="(item) in initOption"
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
    }
  },
  data() {
    return {
      defaulValue: "",
      initOption: [],
      optionsData: [
        { value: "mobile", label: "手机号" },
        { value: "name", label: "姓名" },
        { value: "email", label: "邮箱" },
        { value: "id", label: "ID" },
        { value: "title", label: "标题" }
      ]
    };
  },
  beforeCreate(){
    console.log(11111111);
  },
  created(){
    console.log(2222222);
  },
  beforeMount(){
    console.log(333333);
  },
  mounted(){
    console.log(44444);
  },

  methods: {
    initOptionData() {
      let initData = this.config.initData;
      let arr = [];
      // 数据校验
      if (initData === 0) {
        console.log("config参数是空的，无法显示下拉列，表请检查参数");
        return false;
      }
      initData.forEach(element => {
        let item = this.optionsData.filter(r => r.value == element);
        if (item.length > 0) {
          arr.push(item[0]);
        }
      });
      console.log(arr);
      if (arr === 0) {
        console.log("匹配的数据为空");
        return false;
      }
      // 初始化数据
      this.initOption = arr;
      // 默认值
      this.defaulValue = arr[0].value;
    }
  },
  watch: {
    config: {
      handler(newValue, oldValue) {
        console.log(55555);
        this.initOptionData();
      },
      immediate:true,  //组件化初始化时，立即对其监听
    }
  },
  mounted() {}
};
</script>

<style>
</style>