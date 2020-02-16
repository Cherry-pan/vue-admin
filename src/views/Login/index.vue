<template>
  <div id="login">
    <div class="login_wrap">
      <ul class="menu_tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{ current: item.current }"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!-- 表单 start -->
      <el-form :model="ruleForm" status-icon :rules="rules" ref="loginForm" class="login-form">
        <el-form-item prop="username">
          <label for="username">邮箱</label>
          <el-input type="text" id="username" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <label for="password">密码</label>
          <el-input
            type="password"
            id="password"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="repassword" v-show="model === 'register'">
          <label for="repassword">重复密码</label>
          <el-input
            type="password"
            id="repassword"
            v-model="ruleForm.repassword"
            autocomplete="off"
            minlength="6"
            maxlength="20"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code">
          <label for="code">验证码</label>
          <el-row :gutter="22">
            <el-col :span="15">
              <el-input v-model="ruleForm.code" id="code" type="text" maxlength="6" minlength="6"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                @click="getSms()"
                :disabled="codeButtonStatus.status"
                class="block"
              >{{codeButtonStatus.text}}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{model === "login"?"登录":"注册"}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
/**
 * 已经在request中引入了，request这个文件又导入了login.js中，这个文件又被引入到了index.vue中，为什么还要引入一下axios
 * 答：只引入了GetSms
 */
import sha1 from "js-sha1";
import axios from "axios";
import { GetSms, Register, Login } from "@/api/login.js";
import { reactive, ref, onMounted } from "@vue/composition-api";
import {
  stripscript,
  validateMail,
  validatePass,
  validateCode
} from "@/utils/validate.js";
export default {
  name: "login",
  setup(props, context) {
    /**
     * 具体验证表单信息
     */
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
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
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
      if (model.value === "login") {
        callback();
      }
      //过滤后的数据
      ruleForm.repassword = stripscript(value);
      value = ruleForm.repassword;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== ruleForm.password) {
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
        return callback(new Error("验证码只能是6位"));
      } else {
        callback();
      }
    };

    /**
     * 声明数据
     */
    // 这里放置data数据。生命周期，自定义的函数
    // reactive 对象类型的
    const menuTab = reactive([
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
    ]);

    // 表单  对象
    const ruleForm = reactive({
      username: "",
      password: "",
      repassword: "",
      code: ""
    });

    // 倒计时timer
    const timer = ref(null);

    // 模块值 model.value
    // ref声明基础的数据变量时使用,ref基础数据要.value才能拿到值
    const model = ref("login");

    // 登录时禁用按钮
    const loginButtonStatus = ref(true);

    //获取验证码禁用按钮、获取验证码
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });

    /**
     * 表单的验证
     */
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      repassword: [{ validator: validateRePassword, trigger: "blur" }],
      code: [{ validator: checkCode, trigger: "blur" }]
    });

    /**
     * 不建议在一个方法里做多件不同的事件（尽可能只做自己本身的事。不要做其他人的事情
     * 尽量把相同的事情封装一个方法里面，通过调用函数进行执行
     */

    /**
     * 声明函数methods
     */
    // vue数据驱动视图渲染
    const toggleMenu = data => {
      menuTab.forEach(r => {
        r.current = false;
      });

      // 高光
      data.current = true;

      // 修改模块值
      model.value = data.type;

      // 调用清除表单数据的方法
      resetFromData();

      //调用清除倒计时方法
      clearCountDown();
    };

    /**
     * 清除表单数据
     */
    const resetFromData = () => {
      context.refs["loginForm"].resetFields();
    };

    /**
     * 更改按钮状态
     */
    const updateButtonStatus = params => {
      //传了对象进来
      (codeButtonStatus.status = params.status),
        (codeButtonStatus.text = params.text);
    };

    /**
     * 获取短信
     */
    const getSms = () => {
      // 进行提示
      if (!ruleForm.username || !ruleForm.password) {
        context.root.$message.error("邮箱或密码不能为空！！");
        return false;
      }

      if (validateMail(ruleForm.username)) {
        context.root.$message.error("邮箱格式有误，请重新输入");
        return false;
      }

      // 改变获取验证码按钮的状态、改变获取验证码中的文字
      updateButtonStatus({
        status: true,
        text: "发送中"
      });

      //开启定时器
      setTimeout(function() {
        // 请求接口module: "login"
        GetSms({ username: ruleForm.username, module: model.value })
          .then(response => {
            let data = response.data;
            context.root.$message({
              message: data.message,
              type: "success"
            });
            //开启登录或注册的按钮
            loginButtonStatus.value = false;
            //调定时器，倒计时
            countDown(60);
          })
          .catch(error => {
            console.log(error);
          });
      }, 3000);
    };

    /**
     * 倒计时
     */
    const countDown = number => {
      // 判断开启定时器之前是否已经有定时器，如果有 先清除掉定时器
      if (timer.value) {
        clearInterval(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updateButtonStatus({
            status: false,
            text: "重新发送"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`;
        }
      }, 1000);
    };

    /**
     * 清除除倒计时
     */
    const clearCountDown = () => {
      // 还原验证码按钮成默认状态
      updateButtonStatus({
        status: false,
        text: "获取验证码"
      });
      //  清除倒计时
      clearInterval(timer.value);
    };
    /**
     * 表单提交
     */
    const submitForm = formName => {
      // this.$refs(2.0) = context.refs
      context.refs[formName].validate(valid => {
        // 验证通过时
        if (valid) {
          //三元运算
          model.value === "login" ? login() : register();
        } else {
          return false;
        }
      });
    };

    /**
     * 登录的方法
     */
    const login = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "login"
      };
      context.root.$store
        .dispatch("login", data)
        .then(response => {
          /**
           * 页面登录成功提示消息并且跳转到控制台
           */
          console.log(response);
          context.root.$message({
            type: "success",
            message: response.data.message
          });
          context.root.$router.push({
            name: "Console"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**
     * 注册的方法
     */
    const register = () => {
      let data = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      Register(data)
        .then(response => {
          let data = response.data;
          context.root.$message({
            message: data.message,
            type: "success"
          });
          //注册成功之后清空内容  调用切换菜单按钮的方法传参
          toggleMenu(menuTab[0]);
          clearCountDown();
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**
     * 生命周期
     * 2.0mounted已经改成onMounted
     */
    // 挂载完成执行
    onMounted(() => {});

    // 最后需要将定义的变量全都return
    return {
      menuTab,
      model,
      toggleMenu,
      submitForm,
      ruleForm,
      rules,
      getSms,
      codeButtonStatus,
      loginButtonStatus,
      timer,
      clearCountDown,
      login,
      register,
      resetFromData,
      updateButtonStatus
    };
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
    margin-top: 30px;
  }
  .block {
    display: block;
    width: 100%;
  }
}
</style>


