<template>
  <div>
    <el-form ref="infoForm" :model="infoForm" label-width="80px">
      <el-form-item label="信息分类">
        <el-select v-model="infoForm.categoryId" placeholder="请选择活动区域">
          <el-option
            v-for="(item,index) in data.infoCategory"
            :label="item.category_name"
            :value="item.id"
            :key="index"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="新闻标题" style="width:50%">
        <el-input v-model="infoForm.title"></el-input>
      </el-form-item>
      <el-form-item label="缩略图">
        <uploadImg :imgUrl.sync="infoForm.imgUrl" :config="uploadImg"></uploadImg>
      </el-form-item>
      <el-form-item label="选择日期">
        <el-date-picker v-model="infoForm.createDate" align="right" type="date" placeholder="选择日期"></el-date-picker>
      </el-form-item>
      <el-form-item label="详细内容">
        <quill-editor v-model="infoForm.content" ref="myQuillEditor"></quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="data.submitLoading" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import { getList, editInfo } from "@/api/news.js";
import { formatDate } from "@/utils/timestamp";
// 富文本
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
// 图片上传
import uploadImg from "@c/UploadImg/index";
export default {
  name: "editDetail",
  components: {
    quillEditor,
    uploadImg
  },
  setup(props, { root }) {
    let id = root.$route.params.id || root.$store.getters["editDetail/infoId"];
    let title =
      root.$route.params.title || root.$store.getters["editDetail/infoTitle"];
    console.log(id, title);
    /**
     * ref
     */
    const loadingData = ref(true);
    /**
     * reactive
     */
    const data = reactive({
      id: root.$route.params.id || root.$store.getters["editDetail/infoId"],
      infoCategory: [], //信息分类
      submitLoading: false
    });
    const infoForm = reactive({
      categoryId: "",
      title: "",
      createDate: "",
      content: "",
      imgUrl: ""
    });
    // 上传配置
    const uploadImg = reactive({
      actionURL: "http://up-z2.qiniup.com",
      accesskey: "Avh-EZZAa4TxqPQZsEW42fXBUbTMFi-RKSZTRKJj",
      secretkey: "l9AXtnhCVkZexXNRcmHXzmecXiCUiLynwGboMeUw",
      buckety: "webjshtml"
    });
    /**
     * 方法
     */
    /**
     * 获取信息分类列表
     */
    const getInfoCategory = () => {
      root.$store
        .dispatch("common/getCategory")
        .then(res => {
          data.infoCategory = res.data;
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 获取当前ID信息
     */
    const getInfo = () => {
      let requestData = {
        pageNumber: 1,
        pageSize: 1,
        id: data.id
      };
      // 加载状态
      loadingData.value = true; //有加载效果
      getList(requestData)
        .then(res => {
          console.log(res.data.data.data, "res>>>>>>>>>>>");
          let data = res.data.data.data[0];
          infoForm.categoryId = data.categoryId;
          infoForm.title = data.title;
          infoForm.createDate = formatDate(data.createDate);
          infoForm.content = data.content;
          infoForm.imgUrl = data.imgUrl;
          loadingData.value = false; //数据请求回来，关闭加载效果
        })
        .catch(erroe => {
          loadingData.value = false;
        });
    };

    /**
     * 提交
     */
    const onSubmit = () => {
      let questData = {
        id: data.id,
        categoryId: infoForm.categoryId,
        title: infoForm.title,
        content: infoForm.content,
        imgUrl: infoForm.imgUrl
      };
      console.log(questData, "-----------");
      data.submitLoading = true;
      editInfo(questData)
        .then(res => {
          root.$message({
            type: "success",
            message: res.data.message
          });
          data.submitLoading = false;
        })
        .catch(error => {
          console.log(error);
          data.submitLoading = false;
        });
    };
    onMounted: {
      getInfoCategory();
      getInfo();
    }
    return {
      //ref
      loadingData,
      // reactive
      data,
      infoForm,
      uploadImg,
      //  方法
      getInfoCategory,
      getInfo,
      onSubmit
    };
  }
};
</script>

<style lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>