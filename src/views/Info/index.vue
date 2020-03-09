<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="label_wrap category">
          <label>类别：</label>
          <div class="conten_wrap">
            <el-select v-model="categoryValue" style="width:100%;">
              <el-option
                v-for="item in options.category"
                :key="item.id"
                :label="item.category_name"
                :value="item.id"
                class="flex a-item"
                style="padding-left:10px;box-sizing: border-box;"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label_wrap date" style="width:100px;">
          <label>日期：</label>
          <div class="conten_wrap">
            <el-date-picker
              v-model="dateValue"
              type="datetimerange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="left"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
            ></el-date-picker>
          </div>
        </div>
      </el-col>
      <el-col :span="5">
        <div class="label_wrap keyWords">
          <label>关键字：&nbsp;&nbsp;</label>
          <div class="conten_wrap">
            <el-select v-model="selectKey" style="width:100%;">
              <el-option
                v-for="item in searchOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value"
                class="flex a-item"
                style="padding-left:10px;box-sizing: border-box;"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="3">
        <el-input v-model="searchWork" placeholder="请输入标题" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;" @click="GetList">搜索</el-button>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>

      <el-col :span="2" style="float:right;">
        <el-button type="success" style="width:100%;" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table
      :data="tableData.item"
      v-loading="loadingData"
      border
      style="width: 100%;margin:30px 0;"
      @selection-change="handleSelectionChange"
      ref="multipleTable"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="450"></el-table-column>
      <el-table-column prop="categoryId" label="类别" width="130" :formatter="toCategory"></el-table-column>
      <el-table-column prop="createDate" label="日期" width="150" :formatter="toDate"></el-table-column>
      <el-table-column prop="name" label="管理员" width="90"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItems(scope.row.id)">删除</el-button>
          <el-button size="mini" type="success" @click="editInfo(scope.row.id)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 底部分页 -->
    <el-row>
      <el-col :span="8">
        <el-button @click="deleteAll">批量删除</el-button>
      </el-col>
      <el-col :span="16">
        <el-pagination
          class="pull-right"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :page-sizes="[10, 20, 30, 40]"
          :page-size="10"
          background
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >></el-pagination>
      </el-col>
    </el-row>

    <!-- 弹窗   @close="cancleDialog" -->
    <Dialog :flag.sync="dialogInfo" :options="options.category"></Dialog>
    <!-- 修改弹窗 -->
      <DialogEdit :flag.sync="dialogInfoEdit" :id="infoId" :options="options.category" @getListEmit="GetList"></DialogEdit>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import Dialog from "./dialog/info";
import DialogEdit from "./dialog/edit";
import { global } from "@/utils/global3.0.js";
import { common } from "@/api/common.js";
import { getList } from "@/api/news.js";
import { formatDate } from "@/utils/timestamp";
import { deleteInfo } from "@/api/news.js";
export default {
  name: "infoIndex",
  components: {
    Dialog,DialogEdit
  },
  setup(props, { root }) {
    // 声明出来
    const { str: aaa, comfirm } = global();
    const { getInfoCategory, categoryItem } = common();

    /**
     * 数据
     */
    // ref
    const categoryValue = ref("");
    const dialogInfo = ref(false);
    const dialogInfoEdit = ref(false);
    const dateValue = ref("");
    // 默认值
    const selectKey = ref("id");
    const searchWork = ref("");
    const loadingData = ref(true);
    const deleteInfoId = ref(""); //默认删除id
    // 页码总条数
    const total = ref(0);
    const infoId = ref("");

    // reactive
    // 表格数据
    const tableData = reactive({
      item: []
    });
    // 类型
    const options = reactive({
      category: []
    });
    // 搜索关键字
    const searchOptions = reactive([
      {
        value: "id",
        label: "ID"
      },
      {
        value: "title",
        label: "标题"
      }
    ]);
    // 页码
    const page = reactive({
      pageNumber: 1,
      pageSize: 10
    });

    /**
     * 方法
     */
    // 分页的方法
    const handleSizeChange = val => {
      page.pageSize = val;
    };
    // 点击第几页
    const handleCurrentChange = val => {
      page.pageNumber = val;
      GetList();
    };
    const cancleDialog = () => {
      // 做逻辑性的事情
      dialogInfo.value = false;
    };

    /**
     * 匹配分类
     */
    const toCategory = row => {
      // 调用一个函数，返回一个新的值，替换原始值  return 1111
      // filter返回的是数组
      let categoryName = options.category.filter(
        r => r.id === row.categoryId
      )[0];
      return categoryName.category_name;
    };

    /**
     * 格式化时间戳
     */
    const toDate = (row, column, cellValue, index) => {
      return formatDate(row.createDate);
    };

    /**
     * 删除
     */
    const deleteItems = id => {
      deleteInfoId.value = [id];
      comfirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete
      });

      // root.confirm
    };
    const deleteAll = () => {
      if (!deleteInfoId.value || deleteInfoId.value.length === 0) {
        root.$message({
          message: "未选中要批量删除的条目",
          type: "warning"
        });
        return false;
      }
      comfirm({
        content: "此操作将永久删除选中的文件，是否继续?",
        type: "success",
        fn: confirmDelete
      });
    };
    // 点击删除按钮，之后点击确定删除的方法
    const confirmDelete = value => {
      deleteInfo({ id: deleteInfoId.value })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          // 将id清空
          deleteInfoId.value = "";
          GetList();
        })
        .catch(error => {
          console.log(error);
        });
      // console.log(deleteInfoId.value[0])
    };

    // 批量删除
    const handleSelectionChange = val => {
      let id = val.map(item => item.id);
      deleteInfoId.value = id;
    };
    /**
     *   // callback触发事件
    const callbackComponents = (params)=>{
      console.log(params);
      if (params.function) {
        
      }
    }
     */
  

    // 获取分类接口
    // 监听
    watch(
      () => categoryItem.item,
      value => {
        options.category = value;
      }
    );

    /**
    点击搜索
     const searchData = () => {
      let requestData = fmtData();
      GetList();
    };
    */

    const fmtData = () => {
      let requestData = {
        pageNumber: page.pageNumber,
        pageSize: page.pageSize
      };
      // 分类
      if (categoryValue.value) {
        requestData.categoryId = categoryValue.value;
      }
      // 日期  搜索不出来日期???
      if (dateValue) {
        requestData.startTiem = dateValue.value[0];
        requestData.endTime = dateValue.value[1];
      }
      // 关键字
      if (searchWork.value) {
        requestData[selectKey.value] = searchWork.value; //???
      }
      return requestData;
    };
    // 获取列表
    const GetList = () => {
      let requestData = fmtData();
      // 加载状态
      loadingData.value = true; //有加载效果
      getList(requestData)
        .then(res => {
          tableData.item = res.data.data.data;
          // tableData.item.push(res.data.data.data)???还未push
          total.value = res.data.data.total;
          loadingData.value = false; //数据请求回来，关闭加载效果
        })
        .catch(erroe => {
          loadingData.value = false;
        });
    };
    /**
     * 修改弹窗内容
     */
    const editInfo = (id)=>{
      infoId.value = id;
      dialogInfoEdit.value = true;
    }
    onMounted(() => {
      // v3.0
      // getInfoCategory();
      // v2.0
      root.$store
        .dispatch("common/getCategory")
        .then(res => {
          // console.log(res);
          options.category = res;
        })
        .catch(error => {
          console.log(error);
        });

      // 获取列表
      GetList();
    });

    return {
      // ref
      infoId,
      searchWork,
      categoryValue,
      dateValue,
      selectKey,
      dialogInfo,
      total,
      loadingData,
      deleteInfoId,
      dialogInfoEdit,
      // reactive
      searchOptions,
      tableData,
      options,
      // 方法
      handleCurrentChange,
      handleSizeChange,
      cancleDialog,
      deleteItems,
      deleteAll,
      confirmDelete,
      toDate,
      toCategory,
      handleSelectionChange,
      fmtData,GetList,editInfo,
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.label_wrap {
  &.category {
    @include labelDom(left, 60, 40);
  }
  &.date {
    @include labelDom(right, 73, 40);
  }
  &.keyWords {
    @include labelDom(right, 130, 40);
  }
}
</style>