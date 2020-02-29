<template>
  <div id="category">
    <el-button type="danger">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <el-row :gutter="10">
      <el-col :span="10">
        <div class="catagory-wrap">
          <div class="category first">
            <span class="plus">+</span>
            <h4 class="flex just-c">
              新闻
              <div class="button-group">
                <el-button type="danger" size="mini" round>编辑</el-button>
                <el-button type="success" size="mini" round>添加子级</el-button>
                <el-button size="mini" round>删除</el-button>
              </div>
            </h4>
            <ul>
              <li class="flex just-c">
                国内
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
          <div class="category">
            <span class="plus minus">-</span>
            <h4>新闻</h4>
            <ul>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
              <li>国内</li>
            </ul>
          </div>
        </div>
      </el-col>
      <el-col :span="14">
        <div class="edit">
          <h4>一级分类编辑</h4>
          <el-form
            :label-position="labelPosition"
            label-width="120px"
            :model="formLabelAlign"
            style="text-indent: 20px;"
          >
            <el-form-item label="一级分类名称">
              <el-input v-model="formLabelAlign.region" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" style="margin:20px 0;">
              <el-input v-model="formLabelAlign.type" style="width:300px;"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="danger">确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { reactive, ref, watch } from "@vue/composition-api";
export default {
  name: "category",
  setup(props, { root }) {
    const labelPosition = ref("right");
    const formLabelAlign = reactive({
      region: "",
      type: ""
    });
    return { labelPosition, formLabelAlign };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.catagory-wrap {
  .first {
    &:before {
      top: 25px;
    }
  }
  div:last-child {
    &:before {
      bottom: 21px;
    }
  }
}
.category {
  position: relative;
  line-height: 44px;
  cursor: pointer;
  &:before {
    content: "";
    border-left: 1px dashed #000;
    position: absolute;
    left: 22px;
    top: 32px;
    bottom: 0;
  }

  span.plus {
    display: inline-block;
    width: 12px;
    height: 12px;
    line-height: 12px;
    border-radius: 3px;
    text-align: center;
    position: absolute;
    left: 15px;
    top: 15px;
    border: 1px solid #000;
  }
  h4 {
    text-indent: 40px;
    .button-group {
      padding-right: 11px;
      display: none;
    }
  }
  li {
    position: relative;
    padding-left: 37px;
    margin-left: 23px;
    &:before {
      content: "";
      border-bottom: 1px dashed #000;
      position: absolute;
      left: 0;
      top: 22px;
      width: 32px;
    }
    .button-group {
      padding-right: 11px;
      display: none;
    }
  }
  h4,
  li {
    &:hover {
      @include webkit(transition, all 0.3s ease 0s);
      background-color: #f3f3f3;
      .button-group {
        display: block;
      }
    }
  }
}
.edit {
  h4 {
    line-height: 44px;
    background-color: #f3f3f3;
    text-indent: 20px;
    margin-bottom: 20px;
  }
}
.hr-e9e9e9 {
  
  margin-left: -11px;
  margin-top: 30px;
  margin-bottom: 30px;
  width: calc(100% + 22px);
  border:none;
  border-bottom: 1px solid #e9e9e9;
}
</style>