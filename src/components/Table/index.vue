<template>
  <div>
    <el-table
      :data="data.tableData"
      border
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <!-- slot -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope">
            <!-- 父组件状态 -->
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>

        <!-- function -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else-if="item.columnType === 'function'"
        ></el-table-column>

        <!-- 文本渲染 -->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <div class="tableFooter">
      <el-row class="flex a-item">
        <el-col :span="4">
          <slot name="tableFooter"></slot>
        </el-col>
        <el-col :span="20" class="flex flex-end a-item">
          <!-- 页码 -->
          <el-pagination
            class="pull-right"
            v-if="data.tableConfig.paginationShowPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="paginationData.currentPage"
            :page-sizes="paginationData.pageSizes"
            :page-size="paginationData.pageSize"
            :layout="data.tableConfig.paginationLayout"
            background
            :total="paginationData.total"
          ></el-pagination>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import {
  reactive,
  ref,
  watch,
  onMounted,
  onBeforeMount
} from "@vue/composition-api";

import { loadData } from "./tableLoadData";
import { pageRecord } from "./pageRecord";
import { pagination } from "./paginationHook";
export default {
  name: "table",
  props: {
    config: {
      type: Object,
      default: () => {}
    },
    tableRow: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    // 加载数据
    const { tableData, tableLoadData } = loadData({ root });
    // 页码记录
    const { aa } = pageRecord({ root });
    // 页码
    const {
      paginationData,
      handleSizeChange,
      handleCurrentChange,
      tableTotal
    } = pagination({ root });
    const data = reactive({
      tableConfig: {
        tHead: [],
        selection: true,
        pageRecords: false,
        request: {},
        paginationShowPage: true,
        paginationLayout: "total, sizes, prev, pager, next, jumper" //页码默认是有
      },
      btnValue: "",
      // 表格
      tableData: [],
      configOptions: {
        initData: ["mobile", "name"]
      }
      // 页码
    });
    /**
     * methods
     */
    // 当勾选复选框发生变化时
    const handleSelectionChange = val => {
      let checkedBox = {
        ids: val.map(item => item.id)
      };
      emit("update:tableRow", checkedBox);
    };
    /**
     * watch
     */
    // 数据监听
    watch(
      [() => tableData.item, () => tableData.total],
      //第一次监听，是空的
      ([tableData, total]) => {
        data.tableData = tableData;
        tableTotal(total);
      }
    );
    // 页码监听
    watch(
      [() => paginationData.currentPage, () => paginationData.pageSize],
      ([currentPage, pageSize]) => {
        if (data.tableConfig.request.data) {
          data.tableConfig.request.data.pageNumber = currentPage;
          data.tableConfig.request.data.pageSize = pageSize;
          tableLoadData(data.tableConfig.request);
        }
      }
    );
    // 初始化table配置项
    const initTableConfig = () => {
      let configData = props.config;
      let keys = Object.keys(data.tableConfig); //数组
      for (let key in configData) {
        if (keys.includes(key)) {
          //keys数组是否包含某个key
          data.tableConfig[key] = configData[key];
        }
      }
    };

    // 刷新数据
    const refresh=()=>{
      tableLoadData(props.config.request);
    }

    // 带参数的刷新shuj
    const refreshParamsData = (params)=>{
      console.log(params);
      // let requestData = Object.assign({},params,{
      //   pageNumber:1,
      //   pageSize:10
      // })
      // console.log(requestData);
    }

    onBeforeMount(() => {
      initTableConfig(); //不需要监听，在挂载之前可以对进行预先处理
      tableLoadData(props.config.request);
    });
    onMounted: {
    }
    return {
      data,
      paginationData,
      handleSizeChange,
      handleCurrentChange,
      handleSelectionChange,refresh
    };
  }
};
</script>

<style lang="scss" scoped>
.tableFooter {
  margin-top: 20px;
}
</style>