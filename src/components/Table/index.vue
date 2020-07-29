<template>
  <div>
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column v-if="tableConfig.selection" type="selection" width="55"></el-table-column>
      <template v-for="item in tableConfig.tHead">
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
      v-if="tableConfig.paginationShowPage"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="paginationData.currentPage"
      :page-sizes="paginationData.pageSizes"
      :page-size="paginationData.pageSize"
      :layout="tableConfig.paginationLayout"
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
import tableLoadData from "@/mixins/tableLoadData.js";
import pagination from "@/mixins/pagination.js";
export default {
  name: "table",
  props: {
    config: {
      type: Object,
      default: () => {}
    }
  },
  mixins: [tableLoadData,pagination],
  data() {
    return {
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
    };
  },
  /**
   * watch
   */
  // 数据监听
  // watch(
  //   [() => tableData.item, () => tableData.total],
  //   //第一次监听，是空的
  //   ([tableData, total]) => {
  //     data.tableData = tableData;
  //     tableTotal(total);
  //   }
  // );
  // // 页码监听
  // watch(
  //   [() => paginationData.currentPage, () => paginationData.pageSize],
  //   ([currentPage, pageSize]) => {
  //     if (data.tableConfig.request.data) {
  //       data.tableConfig.request.data.pageNumber = currentPage;
  //       data.tableConfig.request.data.pageSize = pageSize;
  //       tableLoadData(data.tableConfig.request);
  //     }
  //   }
  // );
  watch: {},
  /**
   * methods
   */
  methods: {
    // 初始化数据
    initTableConfig() {
      let configData = this.config;
      let keys = Object.keys(this.tableConfig); //数组
      for (let key in configData) {
        if (keys.includes(key)) {
          //keys数组是否包含某个key
          this.tableConfig[key] = configData[key];
        }
      }
    }
  },
  beforeMount() {
    this.initTableConfig();
  },
  mounted() {}
};
</script>

<style>
</style>