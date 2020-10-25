<template>
  <div>
    <el-form
      :model="ruleForm"
      ref="ruleForm"
      label-width="70px"
      class="demo-ruleForm just-c flex"
    >
      <div class="flex keywords">
        <el-form-item label="关键字" prop="mobilephone" class="keyWords">
          <select-value
            :config="data.configOptions"
            :selectData.sync="data.selectData"
          ></select-value>
        </el-form-item>
        <el-input
          v-model="ruleForm.search_key_word"
          placeholder="请输入关键字"
          clearable
          style="width:200px;margin-left:40px;"
        >
          <el-button
            icon="el-icon-search"
            slot="append"
            @click="search"
          ></el-button>
        </el-input>
      </div>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-circle-plus-outline"
          @click="openDig('add', '')"
          >添加用户</el-button
        >
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <my-table
      :config="data.configTable"
      :tableRow.sync="data.tableRow"
      ref="myTable"
    >
      <template v-slot:status="data">
        <el-switch
          @change="handleSwitch(data.data)"
          v-model="data.data.status"
          active-value="2"
          inactive-value="1"
          active-color="#13ce66"
          inactive-color="#ff4949"
        ></el-switch>
      </template>
      <template v-slot:operation="data">
        <el-button @click="openDig('edit', data.data)" type="text" size="small"
          >编辑</el-button
        >
        <el-button @click="handleClickDelet(data.data)" type="text" size="small"
          >删除</el-button
        >
      </template>
      <template v-slot:tableFooter>
        <el-button
          size="small"
          style="margin:10px 0;"
          type="danger"
          icon="el-icon-delete"
          @click="batchDel"
          >批量删除</el-button
        >
      </template>
    </my-table>

    <!-- 新增用户 -->
    <add-user
      :flag.sync="data.dialogInfo"
      :editData="data.editData"
      ref="openDig"
      @refresh="refresh"
    ></add-user>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted, provide } from "@vue/composition-api";
// 引用api
import { requestRUL } from "@/api/requestURL.js";
// selectValue
import SelectValue from "@c/Select/index";
//tableValue
import MyTable from "@c/Table/index";
// addUser组件
import AddUser from "./addUser";
import { deleteUser, userActives } from "@/api/users.js";
import { global } from "@/utils/global3.0.js";
export default {
  name: "userList",
  components: { SelectValue, MyTable, AddUser },
  setup(props, { root, refs }) {
    const { str: aaa, comfirm } = global();
    //刷新页面v3.0
    const myTable = ref(null);
    /**
     * reactive
     */
    const ruleForm = reactive({
      search_key_word: ""
    });
    const data = reactive({
      editData: {},
      configOptions: {
        initData: ["mobile", "name"]
      },
      // 下拉框选择数据
      selectData: {},
      configTable: {
        tHead: [
          {
            label: "邮箱/用户名",
            field: "username",
            width: 200
          },
          {
            label: "真实姓名",
            field: "truename",
            width: 120
          },
          {
            label: "手机号",
            field: "phone"
          },
          {
            label: "地区",
            field: "region"
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
            field: "btnPerm",
            columnType: "slot",
            slotName: "operation",
            width: 100
          }
        ],
        // 复选框
        selection: true,
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
        paginationLayout: "total, sizes, prev, pager, next, jumper"
      },
      dialogInfo: false,
      // table选择的数据
      tableRow: {},
      // 阻止多次触发启用禁用按钮
      preventUsersFlag: false
    });

    /**
     * methods
     */
    // 搜索关键字
    const search = () => {
      let requeryQarams = {
        [data.selectData.value]: ruleForm.search_key_word
      };
      // console.log(data.selectData);
      console.log(requeryQarams);
      refs.myTable.refreshParamsData(requeryQarams);
    };
    // 单个删除
    const handleClickDelet = row => {
      comfirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete(row.id)
      });
    };
    // 批量删除
    const batchDel = () => {
      if (!data.tableRow.ids || data.tableRow.ids.length === 0) {
        root.$message.error("请至少选择一条要删除的数据！");
        return false;
      }
      comfirm({
        content: "此操作将永久删除选中的文件, 是否继续?",
        tip: "警告",
        fn: confirmDelete(data.tableRow.ids)
      });
    };
    const confirmDelete = id => {
      let arr = [];
      if (typeof id == "string") {
        arr = [id];
      } else {
        arr = id;
      }
      deleteUser({ id: arr })
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          // 法一
          // refs.myTable.refresh();
          // 法二
          refresh();
        })
        .catch(error => {
          console.log(error);
        });
    };
    // 获取按钮权限
    // const getButtonPer = () => {
    //   GetPermButton()
    //     .then(res => {
    //       console.log(res.data.data);
    //       data.checkList = res.data.data;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // };
    /**
     * 用户按钮禁启用
     */
    const UserActives = data => {
      if (data.preventUsersFlag) {
        return false;
      }
      data.preventUsersFlag = true;
      let requestData = {
        id: data.id,
        status: data.status
      };
      userActives(requestData)
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          data.preventUsersFlag = !data.preventUsersFlag;
        })
        .catch(error => {
          console.log(error);
          data.preventUsersFlag = !data.preventUsersFlag;
        });
    };
    /**
     * switch开关
     */
    const handleSwitch = data => {
      //不传参数的话，就是switch对应的值，传参数的话，就是这个整条记录的内容
      console.log(data);
      UserActives(data);
    };
    /**
     * 刷新数据
     */
    const refresh = () => {
      myTable.value.refresh();
    };

    /**
     * 打开弹窗
     */
    const openDig = (type, digital) => {
      data.dialogInfo = true;
      // refs.openDig.init(type, digital);
      data.editData = Object.assign({}, digital);
    };
    const submitForm = () => {};
    return {
      // reactive
      ruleForm,
      data,
      // methods
      submitForm,
      handleClickDelet,
      confirmDelete,
      openDig,
      batchDel,
      myTable,
      refresh,
      handleSwitch,
      search,
      // getButtonPer,
      UserActives
    };
  }
};
</script>

<style lang="scss" scoped>
</style>