<template>
  <div id="category">
    <el-button type="danger" @click="addFirst({type:'category_first_add'})">添加一级分类</el-button>
    <hr class="hr-e9e9e9" />
    <el-row :gutter="10">
      <el-col :span="10">
        <div class="catagory-wrap">
          <div class="category first" v-for="firstItem in category.item" :key="firstItem.id">
            <!-- 一级分类 -->
            <span class="plus">+</span>
            <h4 class="flex just-c">
              {{firstItem.category_name}}
              <div class="button-group">
                <el-button
                  type="danger"
                  size="mini"
                  round
                  @click="editCategory({data:firstItem,type:'category_first_edit'})"
                >编辑</el-button>
                <el-button
                  type="success"
                  size="mini"
                  round
                  @click="handleAddChildren({data:firstItem,type:'category_first_edit'})"
                >添加子级</el-button>
                <el-button size="mini" round @click="DeleteCategoryComfirm(firstItem.id)">删除</el-button>
              </div>
            </h4>
            <!-- 子集分类 -->
            <ul v-if="firstItem.children">
              <li
                class="flex just-c"
                v-for="childrenItem in firstItem.children"
                :key="childrenItem.id"
              >
                {{childrenItem.category_name}}
                <div class="button-group">
                  <el-button type="danger" size="mini" round>编辑</el-button>
                  <el-button size="mini" round>删除</el-button>
                </div>
              </li>
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
            ref="formName"
          >
            <el-form-item label="一级分类名称" v-if="category_first_input">
              <el-input
                v-model="formLabelAlign.categoryName"
                style="width:300px;"
                :disabled="category_first_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item label="二级分类名称" style="margin:20px 0;" v-if="category_sec_input">
              <el-input
                v-model="formLabelAlign.seccategoryName"
                style="width:300px;"
                :disabled="category_sec_disabled"
              ></el-input>
            </el-form-item>
            <el-form-item>
              <el-button
                type="danger"
                style="margin:20px 0 0 20px;"
                @click="submit"
                :loading="submit_btn_onloading"
                :disabled="submit_btn_disabled"
              >确定</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { addFirstCategory, deleteCategory, edit_category } from "@/api/news.js";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global3.0.js";
import { common } from "@/api/common.js";
export default {
  name: "category",
  setup(props, { root, refs }) {
    // 声明
    const { comfirm } = global();
    const { getInfoCategory, categoryItem } = common();
    // ref
    const labelPosition = ref("right");
    const category_first_input = ref(true);
    const category_sec_input = ref(true);
    const submit_btn_onloading = ref(false);
    const category_first_disabled = ref(true);
    const category_sec_disabled = ref(true);
    const submit_btn_disabled = ref(true);
    const categoryId = ref("");
    // 是一级分类还是编辑修改
    const catagory_type = ref("");
    //  reactive
    const formLabelAlign = reactive({
      categoryName: "",
      seccategoryName: ""
    });
    const category = reactive({
      item: [],
      // 存当前要修改的值
      current: []
    });

    /**
     * methods
     */
    const submit = () => {
      /**
       * 两种情况一种是直接添加一级分类，另一种是编辑一级分类 两种提交方式
       */
      if (catagory_type.value === "category_first_add") {
        AddFirstCategory();
      }
      if (catagory_type.value === "category_first_edit") {
        EditFirstCategory();
      }
    };
    // 添加分类
    const AddFirstCategory = () => {
      if (!formLabelAlign.categoryName) {
        root.$message({
          showClose: true,
          message: "分类名称不能为空",
          type: "error"
        });
        return false; //不加return会走两遍
      }
      // 按钮加载状态为true
      submit_btn_onloading.value = true;
      addFirstCategory({ categoryName: formLabelAlign.categoryName })
        .then(res => {
          if (res.data.resCode === 0) {
            root.$message({
              showClose: true,
              message: res.data.message,
              type: "success"
            });
          }
          submit_btn_onloading.value = false;
          category.item.push(res.data.data);

          // 清除表单内容
          // refs[formName].resetFields();
          formLabelAlign.categoryName = "";
          formLabelAlign.seccategoryName = "";

          /**
           *  添加分类，调用分类的接口，达到刷新的效果
           * 两种添加的方法：
           * 1.请求分类的接口（缺点：浪费资源）
           * 2。数组的方法，直接将数据加到数组的末尾
           * */
          // GetCategory();
        })
        .catch(error => {
          console.log(error);
          submit_btn_onloading.value = false;
          formLabelAlign.categoryName = "";
          formLabelAlign.seccategoryName = "";
        });
    };
    const addFirst = ({ type }) => {
      // 当点击添加一级分类时，清空数据信息
      catagory_type.value = type;
      formLabelAlign.categoryName = "";
      formLabelAlign.seccategoryName = "";
      category_first_input.value = true;
      category_sec_input.value = false;
      category_first_disabled.value = false;
      category_sec_disabled.value = false;
      submit_btn_disabled.value = false;
    };

    // 删除接口
    const DeleteCategoryComfirm = categoryID => {
      categoryId.value = categoryID;
      comfirm({
        content: "此操作将永久删除该文件, 是否继续?",
        tip: "提示",
        fn: DeleteCategory,
        id: "2222",
        catchfn: cancelDel
      });
    };
    // 点击确定删除
    const DeleteCategory = () => {
      deleteCategory({ categoryId: categoryId.value })
        .then(res => {
          /**
           * 操作数组splice
           * 两个参数的时候是删除，三个参数是替换/插入
           * splice(1,2,{})
           * let newData = category.item.filter(r=>r.id !== categoryId.value)
           * category.item - newData;
           */
          let index = category.item.findIndex(
            index => index.id === categoryId.value
          );

          category.item.splice(index, 1);
          root.$message({
            showClose: true,
            message: res.data.message,
            type: "success"
          });
        })
        .catch(error => {
          console.log(error);
        });
    };
    // 取消删除
    const cancelDel = () => {
      categoryId.value = "";
    };

    // 编辑修改
    const editCategory = ({ data, type }) => {
      category_first_disabled.value = false;
      category_sec_disabled.value = false;
      submit_btn_disabled.value = false;
      category_sec_input.value = false;
      // 一级分类名称输入还原名称
      formLabelAlign.categoryName = data.category_name;
      catagory_type.value = type;
      category.current = data;
    };
    // 调用修改编辑的接口
    const EditFirstCategory = () => {
      if (category.current.length === 0) {
        root.$message({
          showClose: true,
          message: "未选择分类",
          type: "error"
        });
        return false;
      }
      let requestData = {
        id: category.current.id,
        categoryName: formLabelAlign.categoryName
      };
      edit_category(requestData)
        .then(res => {
          // console.log(res.data.data.data.categoryName);
          root.$message({
            showClose: true,
            message: res.data.message,
            type: "success"
          });
          category.current.category_name = res.data.data.data.categoryName;
          // let data = category.item.filter(r => r.id === category.current.id);
          // data[0].category_name = res.data.data.data.categoryName;
          // 编辑之后需要清空
          formLabelAlign.categoryName = "";
          category.current = [];
        })
        .catch(error => {
          console.log(error);
        });
    };

    /**
     * 添加二级菜单
     */
    const handleAddChildren = data => {
      console.log(data);
      
      // formLabelAlign.categoryName = data.category_name;
      category_sec_disabled.value = false;
      submit_btn_disabled.value = false;
    };

    // 监听
    watch(
      () => categoryItem.item,
      value => {
        category.item = value;
      }
    );
    /**
     * 生命周期onmounted挂载完成
     */
    onMounted(() => {
      getInfoCategory();
    });
    return {
      // ref
      category_first_input,
      catagory_type,
      category_sec_input,
      labelPosition,
      submit_btn_onloading,
      category_first_disabled,
      category_sec_disabled,
      submit_btn_disabled,
      categoryId,
      // reactive
      formLabelAlign,
      category,
      // methods
      submit,
      addFirst,
      DeleteCategory,
      DeleteCategoryComfirm,
      cancelDel,
      editCategory,
      AddFirstCategory,
      EditFirstCategory,
      handleAddChildren
    };
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/config.scss";
.catagory-wrap {
  div:first-child {
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
  text-indent: 20px;
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
  border: none;
  border-bottom: 1px solid #e9e9e9;
}
</style>