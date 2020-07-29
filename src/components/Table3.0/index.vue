<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%">
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

    <!-- 页码 -->
    <el-pagination
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
    }
  },
  setup(props, { root }) {
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
        paginationLayout: "total, sizes, prev, pager, next, jumper",//页码默认是有
      },
      btnValue: "",
      // 表格
      tableData: [
        {
          email: "605992259@qq.com",
          name: "xxx",
          mobilephone: 13218009875,
          area: "南京市",
          role: "管理员"
        },
        {
          email: "605992259@qq.com",
          name: "x1111x",
          mobilephone: 13218009875,
          area: "南京市",
          role: "管理员"
        }
      ],
      configOptions: {
        initData: ["mobile", "name"]
      }
      // 页码
    });
    /**
     * methods
     */
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
      handleCurrentChange
    };
  }
};
</script>

<style>
</style>