<template>
  <el-dialog
    title="新增"
    :visible.sync="data.dialogInfoVisibleFalg"
    @close="close"
    width="580px"
    @opened="openDialog"
  >
    <el-form ref="form" :model="data.form" label-width="70px" :rules="data.rules">
      <el-form-item label="分类：" prop="category">
        <el-select v-model="data.form.category" placeholder="请选择分类">
          <el-option
            :label="item.category_name"
            :value="item.id"
            v-for="item in data.categoryOptions.item"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：" prop="title">
        <el-input v-model="data.form.title"></el-input>
      </el-form-item>
      <el-form-item label="概况：" prop="content">
        <el-input type="textarea" v-model="data.form.content"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" :loading="data.submitLoading" @click="onSubmit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
import { addInfo } from "@/api/news.js";
export default {
  name: "dialogInfo",
  props: {
    // 单向数据流 ， 父级 -> 子级 不能反向修改
    flag: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    }
  },

  setup(props, { emit, root, refs }) {
    const data = reactive({
      dialogInfoVisibleFalg: false, //弹窗标记
      submitLoading: false, //提交loading
      form: {
        title: "",
        category: "",
        content: ""
      },
      rules: {
        category: [{ required: true, message: "请选择分类", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
        content: [{ required: true, message: "内容不能为空", trigger: "blur" }]
      },
      // 分类类别
      categoryOptions: {
        item: []
      }
    });

    // watch
    watch(() => (data.dialogInfoVisibleFalg = props.flag));

    /**
     * 方法
     */
    // 重置表单
    const resetFields = () => {
      refs.form.resetFields();
    };
    const close = () => {
      data.dialogInfoVisibleFalg = false;
      resetFields(); //调用重置方法 网页会奔溃掉？？？
      emit("update:flag", false);
      // root.$emit("close", false); //需要做逻辑处理，使用回调，反之可以使用修饰器
    };
    const onSubmit = () => {
      let questData = {
        categoryId: data.form.category,
        title: data.form.title,
        content: data.form.content,
      };
      console.log(questData, "-----------");

      if (!data.form.category || !data.form.title || !data.form.content) {
        root.$message({
          type: "error",
          message: "字段名不能为空"
        });
      } else {
        data.submitLoading = true;
        addInfo(questData)
          .then(res => {
            // console.log(res);
            root.$message({
              type: "success",
              message: res.data.message
            });
            data.submitLoading = false;
            // 关闭弹窗
            close();
            // 回调父级数据
            emit("getListEmit");
          })
          .catch(error => {
            console.log(error);
            data.submitLoading = false;
          });
      }

      data.dialogInfoVisibleFalg = false;
    };
    // 打开对话框，加载分类的数据
    const openDialog = () => {
      resetFields();
      data.categoryOptions.item = props.options;
    };

    return {
      data,
      close,
      onSubmit,
      openDialog,
      resetFields
    };
  }
};
</script>

<style lang="scss" scoped>
</style>