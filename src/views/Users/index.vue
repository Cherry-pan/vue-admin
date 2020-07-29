<template>
  <div>
    <el-form :model="ruleForm" ref="ruleForm" label-width="70px" class="demo-ruleForm just-c flex">
      <div class="flex keywords">
        <el-form-item label="关键字" prop="mobilephone" class="keyWords">
          <SelectValue :config="data.configOptions"></SelectValue>
        </el-form-item>
        <el-input
          v-model="ruleForm.search_key_word"
          placeholder="请输入关键字"
          clearable
          style="width:200px;margin-left:40px;"
        >
          <el-button icon="el-icon-search" slot="append"></el-button>
        </el-input>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="submitForm('ruleForm')"
        >添加用户</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <mytable :config="data.configTable">
      <template v-slot:status="data">
        <el-switch v-model="data.data.name" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
      </template>
      <template v-slot:operation="data">
        <el-button @click="handleClick(data.data)" type="text" size="small">编辑</el-button>
        <el-button @click="handleClick(data.data)" type="text" size="small">删除</el-button>
      </template>
    </mytable>
    <el-button style="margin:10px 0;" type="danger" icon="el-icon-delete">批量删除</el-button>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
// 引用api
import { requestRUL } from "@/api/requestURL.js";
// selectValue
import SelectValue from "@c/Select/index";
//tableValue
import mytable from "@c/Table/index";
export default {
  name: "userList",
  components: { SelectValue, mytable },
  setup(props, { root }) {
    /**
     * reactive
     */
    const ruleForm = reactive({
      mobilephone: "",
      search_key_word: ""
    });
    const data = reactive({
      configOptions: {
        initData: ["mobile", "name"]
      },
      configTable: {
        tHead: [
          {
            label: "邮箱/用户名",
            field: "email",
            width: 200
          },
          {
            label: "真实姓名",
            field: "name",
            width: 120
          },
          {
            label: "手机号",
            field: "mobilephone"
          },
          {
            label: "地区",
            field: "area"
          },
          {
            label: "角色",
            field: "role"
          },
          {
            label: "禁启用状态",
            field: "status",
            columnType: "slot",
            slotName: "status"
          },
          {
            label: "操作",
            field: "operation",
            columnType: "slot",
            slotName: "operation",
            width: 100
          }
        ],
        // 复选框
        selection: false,
        // 翻页记录
        pageRecords: true,
        // 请求
        request: {
          requestURL: requestRUL.getUserList,
          methods: "post",
          data: {
            username: "",
            truename: "",
            phone: "",
            pageNumber: 1,
            pageSize: 10
          }
        },
        paginationShowPage: true,
        paginationLayout: "total, sizes, prev, pager, next, jumper",
      }
    });

    /**
     * methods
     */
    const handleClick = row => {
      console.log(row);
    };
    const submitForm = () => {};
    return {
      // reactive
      ruleForm,
      data,
      // methods
      submitForm,
      handleClick
    };
  }
};
</script>

<style lang="scss" scoped>
</style>