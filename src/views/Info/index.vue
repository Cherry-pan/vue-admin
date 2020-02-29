<template>
  <div>
    <el-row :gutter="8">
      <el-col :span="4">
        <div class="label_wrap category">
          <label>类型：</label>
          <div class="conten_wrap">
            <el-select v-model="categoryValue" style="width:100%;">
              <el-option
                v-for="item in options"
                :key="item.categioryValue"
                :label="item.label"
                :value="item.categoryValue"
                class="flex a-item"
                style="padding-left:10px;box-sizing: border-box;"
              ></el-option>
            </el-select>
          </div>
        </div>
      </el-col>
      <el-col :span="7">
        <div class="label_wrap date">
          <label>日期：&nbsp;&nbsp;</label>
          <div class="conten_wrap">
            <el-date-picker
              v-model="dateValue"
              type="monthrange"
              align="right"
              unlink-panels
              range-separator="至"
              start-placeholder="开始月份"
              end-placeholder="结束月份"
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
        <el-input v-model="searchWork" placeholder="请输入" style="width:100%;"></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="danger" style="width:100%;">搜索</el-button>
      </el-col>
      <el-col :span="1">&nbsp;</el-col>

      <el-col :span="2" style="float:right;">
        <el-button type="success" style="width:100%;" @click="dialogInfo = true">新增</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%;margin:30px 0;">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column prop="title" label="标题" width="450"></el-table-column>
      <el-table-column prop="type" label="类别" width="110"></el-table-column>
      <el-table-column prop="date" label="日期" width="150"></el-table-column>
      <el-table-column prop="name" label="管理员" width="110"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="deleteItems">删除</el-button>
          <el-button size="mini" type="success" @click="dialogInfo=true">编辑</el-button>
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
          background
          layout="prev, pager,next"
          :total="1000"
        ></el-pagination>
      </el-col>
    </el-row>

    <!-- 弹窗 -->
    <Dialog :flag.sync="dialogInfo"></Dialog>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import Dialog from "./dialog/info";
import { global } from "@/utils/global3.0.js";
export default {
  name: "infoIndex",
  components: {
    Dialog
  },
  setup(props, { root }) {
    // 声明出来
    const { str:aaa, comfirm } = global();
    // 监听str
    // watch(() => {
    //   console.log(aaa.value);
    // });
    /**
     * 数据
     */
    // ref
    const categoryValue = ref("国际信息");
    const dialogInfo = ref(false);
    const dateValue = ref("");
    // 默认值
    const selectKey = ref("id");
    const searchWork = ref("");

    // reactive
    // 表格数据
    const tableData = reactive([
      {
        date: "2019-09-10 19:31:31",
        name: "管理员",
        title: "纽约市百思豪宣布退出总统竞选 特朗普发推回应",
        type: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        name: "管理员",
        title:
          "习近平在中央政协工作会议暨庆祝中华人民政治协商会议成立70周年大会上发表重要讲话",
        type: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        name: "管理员",
        title: "基里巴斯与台当局“断交” 系蔡当局上台后断交第7国",
        type: "国内信息"
      },
      {
        date: "2019-09-10 19:31:31",
        name: "管理员",
        title: "不选了！纽约市长百思豪宣布退出2020举国大选",
        type: "国内信息"
      }
    ]);
    // 类型
    const options = reactive([
      {
        value: 1,
        label: "国际信息"
      },
      {
        value: 2,
        label: "国内信息"
      },
      {
        value: 3,
        label: "行业信息"
      }
    ]);
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

    /**
     * 方法
     */
    // 分页的方法
    const handleSizeChange = val => {
      console.log(val);
    };
    const handleCurrentChange = val => {
      console.log(val);
    };
    const closeDialog = () => {
      // 做逻辑性的事情
      dialogInfo.value = false;
    };
    // 删除
    const deleteItems = () => {
      comfirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete
      });
      // root.confirm
    };
    const deleteAll = () => {
      comfirm({
        content: "此操作将永久删除选中的文件，是否继续?",
        type: "success",
        fn: confirmDelete
      });
      // root.confirm
    };

    // 点击删除按钮，之后点击确定删除的方法
    const confirmDelete = value => {
      // console.log(value);
    };

    return {
      // ref
      searchWork,
      categoryValue,
      dateValue,
      selectKey,
      dialogInfo,
      // reactive
      searchOptions,
      tableData,
      options,
      // 方法
      handleCurrentChange,
      handleSizeChange,
      closeDialog,
      deleteItems,
      deleteAll,
      confirmDelete
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