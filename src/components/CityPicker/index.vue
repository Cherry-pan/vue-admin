<template>
  <el-row :gutter="20">
    <el-col :span="6">
      <el-select
        v-model="areaOptions.PROVINCE_CODE"
        placeholder="请选择"
        @change="handleProvince"
        v-if="init.province"
      >
        <el-option
          v-for="item in areaOptions.provinceOptions"
          :key="item.PROVINCE_CODE"
          :label="item.PROVINCE_NAME"
          :value="item.PROVINCE_CODE"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select
        v-model="areaOptions.CITY_CODE"
        placeholder="请选择"
        @change="handleCity"
        v-if="init.city"
      >
        <el-option
          v-for="item in areaOptions.cityOptions"
          :key="item.CITY_CODE"
          :label="item.CITY_NAME"
          :value="item.CITY_CODE"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="6">
      <el-select
        v-model="areaOptions.AREA_CODE"
        placeholder="请选择"
        @change="handleCounty"
        v-if="init.area"
      >
        <el-option
          v-for="item in areaOptions.areaOptions"
          :key="item.AREA_CODE"
          :label="item.AREA_NAME"
          :value="item.AREA_CODE"
        ></el-option>
      </el-select>
    </el-col>
    <el-col :span="5">
      <el-select
        v-model="areaOptions.STREET_CODE"
        placeholder="请选择"
        @change="handleStreet"
        v-if="init.street"
      >
        <el-option
          v-for="item in areaOptions.streetOptions"
          :key="item.STREET_CODE"
          :label="item.STREET_NAME"
          :value="item.STREET_CODE"
        ></el-option>
      </el-select>
    </el-col>
  </el-row>
</template>

<script>
import {
  reactive,
  ref,
  watch,
  onMounted,
  onBeforeMount
} from "@vue/composition-api";

import { getAreaOptions } from "./index";
export default {
  name: "cityPicker",
  props: {
    areaOptionsObj: {
      type: Object,
      default: () => {}
    },
    areaOptionArr: {
      type: Array,
      default: () => []
    }
  },
  setup(props, { root, emit }) {
    // console.log(prop.areaOptionsObj,"areaOptionsObj>>>>>>>>>>>");
    //   引入组件的方法
    const {
      getProvince,
      handleProvince,
      handleCity,
      handleCounty,
      handleStreet,
      areaOptions,
      resultsData
    } = getAreaOptions({ root });
    const init = reactive({
      province: false,
      city: false,
      area: false,
      street: false
    });
    // 初始化省市区
    const initCityPicker = () => {
      let initData = props.areaOptionArr;
      if (initData.length == 0) {
        for (const key in init) {
          if (init.hasOwnProperty(key)) {
            init[key] = true;
          }
        }
      } else {
        initData.forEach(item => {
          init[item] = true;
        });
      }
    };
    onBeforeMount(() => {
      initCityPicker();
      getProvince();
    });
    // 监听数据集合的变化
    watch(
      [
        () => resultsData.PROVINCE_CODE,
        () => resultsData.CITY_CODE,
        () => resultsData.AREA_CODE,
        () => resultsData.STREET_CODE
      ],
      (province, city, area, street) => {
        emit("update:areaOptionsObj", resultsData);
      }
    );
    return {
      getProvince,
      handleProvince,
      handleCity,
      handleCounty,
      handleStreet,
      areaOptions,
      initCityPicker,
      init,
      resultsData
    };
  }
};
</script>

<style lang="sass" scoped>

</style>