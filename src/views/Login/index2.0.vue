<template>
  <div id="login">
    
    <div class="login_wrap">
      <ul class="menu_tab">
        <li
          v-for="(item, i) in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >
          {{ item.txt }}
        </li>
      </ul>
      <!-- 表单 start -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="login-form"
      >
        <el-form-item prop="username">
          <label>邮箱</label>
          <el-input
            type="text"
            v-model="ruleForm.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label>密码</label>
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="password"
            v-model="ruleForm.repassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label>验证码</label>
          <el-row :gutter="22">
            <el-col :span="15">
              <el-input
                v-model.number="ruleForm.code"
                minlength="0"
                maxlength="6"
              ></el-input
            ></el-col>
            <el-col :span="9">
              <el-button type="success">获取验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('ruleForm')"
            class="login-btn"
            >登录</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {
  stripscript,
  validateMail,
  validatePass,
  validateCode
} from "@/utils/validate.js";
export default {
  data() {
    // 验证用户名
    var validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else if (validateMail(value)) {
        callback(new Error("请输入正确的邮箱格式"));
      } else {
        callback(); //验证通过
      }
    };

    // 验证密码
    var validatePassword = (rule, value, callback) => {
      //过滤后的数据
      this.ruleForm.password = stripscript(value);
      value = this.ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码6至20位的数字和字母"));
      } else {
        callback();
      }
    };

    // 验证重复密码
    var validateRePassword = (rule, value, callback) => {
      // 如果模块值为login，就直接通过
      if (this.model === "login") {
        callback();
      }
      //过滤后的数据
      this.ruleForm.repassword = stripscript(value);
      value = this.ruleForm.repassword;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次密码输入不一样"));
      } else {
        callback();
      }
    };

    // 验证验证码
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (validateCode(value)) {
        return callback(new Error("验证码只能是6位数"));
      } else {
        callback();
      }
    };

    return {
      menuTab: [
        {
          txt: "登录",
          current: true,
          type: "login"
        },
        {
          txt: "注册",
          current: false,
          type: "register"
        }
      ],
      // 模块
      model: "login",
      // 表单
      ruleForm: {
        username: "",
        password: "",
        repassword: "",
        code: ""
      },
      rules: {
        username: [{ validator: validateUsername, trigger: "blur" }],
        password: [{ validator: validatePassword, trigger: "blur" }],
        repassword: [{ validator: validateRePassword, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }]
      }
    };
  },
  // 挂载完成自动编译
  mounted() {},
  methods: {
    // vue数据驱动视图渲染
    toggleMenu(data) {
      this.menuTab.forEach(r => {
        r.current = false;
      });
      data.current = true;
      this.model = data.type;
    },
    // 表单
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
#login {
  background-color: #334960;
  height: 100vh;
  padding-top: 100px;
  box-sizing: border-box;
}
.login_wrap {
  width: 338px;
  margin: auto;
}
.menu_tab {
  text-align: center;
  li {
    font-size: 14px;
    color: white;
    display: inline-block;
    width: 80px;
    height: 36x;
    line-height: 36px;
    border-radius: 2px;
    cursor: pointer;
  }
  .current {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
.login-form {
  label {
    display: inline-block;
    margin-top: 10px;
    color: white;
  }
  .login-btn {
    width: 100%;
    margin-top: 30px;
  }
}
</style>
