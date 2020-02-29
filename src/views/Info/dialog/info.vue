<template>
  <el-dialog title="新增" :visible.sync="dialogInfoVisibleFalg" @close="close" width="580px">
    <el-form ref="form" :model="form" label-width="70px">
      <el-form-item label="类型：">
        <el-select v-model="form.region" placeholder="请选择活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题：">
        <el-input v-model="form.type"></el-input>
      </el-form-item>
      <el-form-item label="概况：">
        <el-input type="textarea" v-model="form.desc"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="close">取 消</el-button>
        <el-button type="danger" @click="onSubmit">确 定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "dialogInfo",
  props: {
    // 单向数据流 ， 父级 -> 子级 不能反向修改
    flag: {
      type: Boolean,
      default: false
    }
  },

  setup(props, { emit }) {
    /**
     * 数据
     */
    // ref
    const dialogInfoVisibleFalg = ref(false);
    // 默认值

    // reactive
    const form = reactive({
      type: "",
      region: "",
      desc: ""
    });
    // watch
    watch(() => (dialogInfoVisibleFalg.value = props.flag));

    /**
     * 方法
     */
    const close = () => {
      dialogInfoVisibleFalg.value = false;
      emit("update:flag", false);
      //root.$emit("close", false); //需要做逻辑处理，使用回调，反之可以使用修饰器
    };
    const onSubmit = () => {
      console.log("submit!");
    };

    return {
      // ref
      dialogInfoVisibleFalg,
      // reactive
      form,
      // methods
      close,
      onSubmit
    };
  }
};
</script>

<style lang="scss" scoped>
</style>