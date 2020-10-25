<template>
  <el-dialog
    :title="data.mainTitle"
    :visible.sync="data.dialogFormVisible"
    @close="close"
    @open="open"
  >
    <el-form :model="data.form" ref="form" :rules="data.rules" v-loading="data.loading">
      <el-form-item label="用户名" :label-width="data.formLabelWidth" prop="username">
        <el-input v-model="data.form.username" placeholder="请输入邮箱" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="data.formLabelWidth" prop="password">
        <el-input v-model="data.form.password" type="password" placeholder="请输入密码" clearable></el-input>
      </el-form-item>
      <el-form-item label="姓名" :label-width="data.formLabelWidth" placeholder="请输入姓名" clearable>
        <el-input v-model="data.form.truename"></el-input>
      </el-form-item>
      <el-form-item label="手机号" :label-width="data.formLabelWidth" prop="phone">
        <el-input v-model="data.form.phone" type="tel" placeholder="请输入手机号" clearable></el-input>
      </el-form-item>
      <el-form-item label="地区" :label-width="data.formLabelWidth">
        <city-picker
          :areaOptionArr="data.areaOptionArr"
          :areaOptionsObj.sync="data.form.areaOptionsObj"
        ></city-picker>
      </el-form-item>
      <el-form-item label="是否启用" :label-width="data.formLabelWidth">
        <el-radio
          v-model="data.form.radio"
          :label="item.radio"
          v-for="(item) in data.status"
          :key="item.index"
        >{{item.label}}</el-radio>
      </el-form-item>
      <el-form-item label="角色" :label-width="data.formLabelWidth" prop="role">
        <el-checkbox-group v-model="data.form.role">
          <el-checkbox
            v-for="(city,index) in data.checkList"
            :label="city.name"
            :key="index"
          >{{city.name}}</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item style="text-align:center;">
        <el-button type="primary" @click="onSubmit('ruleForm')">确定</el-button>
        <el-button @click="resetForm('ruleForm')">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import sha1 from "js-sha1";
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
// 地区选择组件
import CityPicker from "@c/CityPicker/index.vue";
import {
  GetRole,
  GetSystem,
  GetPermButton,
  addUser,
  editUser,
  deleteUser
} from "@/api/users.js";
import { stripscript, validateMail, validatePass } from "@/utils/validate.js";
// import { delete } from "vue/types/umd";
export default {
  name: "addUser",
  props: {
    // 单向数据流 ， 父级 -> 子级 不能反向修改
    flag: {
      type: Boolean,
      default: false
    },
    // 编辑的数据
    editData: {
      type: Object,
      default: () => {}
    }
  },
  components: { CityPicker },
  setup(props, { root, refs, emit }) {
    const data = reactive({
      form: {
        id: "",
        role: [],
        areaOptionsObj: {}
      },
      rules: {
        username: [
          {
            required: true,
            message: "用户名不能为空",
            validator: validateUsername,
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "密码不能为空",
            validator: validatePassword,
            trigger: "blur"
          }
        ],
        role: [
          //如果先点击确定，会验证，再选择一个，但是验证信息还是没有去掉
          {
            // type: "array",
            required: true,
            message: "请选择角色",
            trigger: "change"
          }
        ],
        phone: [
          {
            min: 1,
            max: 11,
            message: "手机号长度在 1 到 11 个字符",
            trigger: "blur"
          }
          // { pattern: /^1(3|4|5|6|7|8|9)\d{9}$/, message: "请输入正确的手机号码" }
        ]
      },
      dialogFormVisible: false,
      formLabelWidth: "80px",
      // 角色
      checkList: [],
      // 地区
      areaOptionArr: ["province", "city", "area", "street"], //默认全部
      status: [
        {
          radio: "1",
          label: "禁用"
        },
        {
          radio: "2",
          label: "启用"
        }
      ],
      loading: false,
      mainTitle: "",
      // rowEdit: {},
      // type: "",
      // 按钮权限
      btnPerm: []
    });
    // watch
    watch(() => (data.dialogFormVisible = props.flag));

    /**
     * methods
     */
    /**
     * 初始化数据
     */
    // const init = (type, digital) => {
    //   console.log(type, digital);
    //   data.type = type;

    // };
    /**
     * 验证表单
     */
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateMail(value)) {
        refs.form.validateField("username");
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback(); //验证通过
      }
    };
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      /**
       * 1、编辑状态下，有id，密码不为空时，需要校验
       *    密码为空，不需要校验
       *
       * 2、添加状态下，没有id，需要校验
       */
      //过滤后的数据
      if (!value) {
        callback();
      }
      if ((data.form.id && value) || data.form.id) {
        if (value) {
          data.form.password = stripscript(value);
          value = data.form.password;
        }
        if (value === "") {
          callback(new Error("请输入密码"));
        } else if (validatePass(value)) {
          callback(new Error("密码6至20位的数字和字母"));
        } else {
          callback();
        }
      }
    };
    // 清空表单
    const resetFields = () => {
      if (refs.form) {
        refs.form.resetFields();
      }
      // data.checkList = [];
    };
    const close = () => {
      data.dialogFormVisible = false;
      resetFields(); // 清空表单
      emit("update:flag", false);
    };
    // 请求角色,当弹窗再次被点击的时候无法选择角色
    const getRole = () => {
      // if (data.checkList.length == 0) {
        GetRole()
          .then(res => {
            data.checkList = res.data.data;
          })
          .catch(error => {
            console.log(error);
          });
      // }
    };
    // 获取系统
    const getSys = () => {
      GetSystem()
        .then(res => {
          // console.log(res.data.data);
          data.checkList = res.data.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 添加用户
     */
    const AddUser = () => {
      let requestData = {
        username: data.form.username,
        truename: data.form.truename,
        password: sha1(data.form.password),
        phone: data.form.phone,
        region: data.form.areaOptionsObj,
        status: data.form.radio,
        role: data.form.role
        // btnPerm:data.form.userName
      };
      requestData.role = data.form.role.join(); //默认以，隔开
      requestData.region = JSON.stringify(
        Object.assign({}, data.form.areaOptionsObj)
      );
      addUser(requestData)
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          emit("refresh");
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 编辑用户
     */
    const EditUser = id => {
      let requestData = {
        id,
        username: data.form.username,
        truename: data.form.truename,
        password: data.form.password || "",
        phone: data.form.phone,
        region: data.form.areaOptionsObj,
        status: data.form.radio,
        role: data.form.role
        // btnPerm:data.form.userName
      };
      requestData.role = data.form.role.join(); //默认以，隔开
      requestData.region = JSON.stringify(
        Object.assign({}, data.form.areaOptionsObj)
      );
      editUser(requestData)
        .then(res => {
          root.$message({
            message: res.data.message,
            type: "success"
          });
          emit("refresh");
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 窗口打开，动画结束时的回调
     */
    const open = () => {
      data.form = props.editData;
      if (data.form.id) {
        console.log(1111);
        data.mainTitle = "编辑用户";
        let tempData = props.editData;
        data.form.id = props.editData.id;
        if (tempData.role instanceof Array) {
          return false;
        } else { //添加用户
          tempData.role = tempData.role.split(",");
        }
        data.form = tempData;
        for (let key in props.editData) {
          data.form[key] = props.editData.id ? props.editData[key] : "";
        }
      } else {
        console.log(2222);
        data.mainTitle = "新增用户";
        data.form.id && delete data.form.id;
      }
      // getRole();

      getSys();
      // getButtonPer();
    };
    const resetForm = form => {
      resetFields();
      data.dialogFormVisible = false;
    };
    /**
     * 添加用户保存
     */
    const onSubmit = form => {
      data.loading = true;
      refs.form.validate(valid => {
        if (valid) {
          if (data.form.id) {
            EditUser(data.form.id);
          } else {
            AddUser();
          }
          close();
          data.loading = false;
          // data.dialogFormVisible = false;
        } else {
          console.log("error submit!!");
          data.loading = false;
          return false;
        }
      });
    };

    return {
      data,
      close,
      resetFields,
      onSubmit,
      // getRole,
      open,
      getSys,
      AddUser,
      resetForm,
      // changeRole,
      // init,
      EditUser
    };
  }
};
</script>

<style>
</style>