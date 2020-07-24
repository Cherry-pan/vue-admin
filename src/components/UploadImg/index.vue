<template>
  <el-upload
    class="avatar-uploader"
    :action="config.actionURL"
    :data="data.qiNiuToken"
    :show-file-list="false"
    :on-success="handleAvatarSuccess"
    :before-upload="beforeAvatarUpload"
  >
    <img v-if="data.image" :src="data.image" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
import { reactive, ref, watch, onMounted } from "@vue/composition-api";
import { qiNiu } from "@/api/common.js";
export default {
  name: "UploadImg",
  props: {
    imgUrl: {
      type: String,
      default: ""
    },
    config: {
      type: Object,
      default: () => {}
    }
  },
  setup(props, { root, emit }) {
    console.log(props.config);
    /**
     * reactive
     */
    const data = reactive({
      image: "",
      qiNiuToken: {
        token: "",
        key: ""
      }
    });
    /**
     * 图片上传
     */
    const handleAvatarSuccess = (res, file) => {
      console.log(res);
      let imageURL = `${root.$store.getters["common/qiNiuURL"]}${res.key}`;
      data.image = imageURL;
      emit("update:imgUrl", imageURL); //父组件有sycn修饰，子组件才可以使用update
    };
    const beforeAvatarUpload = file => {
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!isLt2M) {
        root.$message.error("上传头像图片大小不能超过 10MB!");
      }
      // 文件名转码
      let suffix = file.name;
      let key = encodeURI(`${suffix}`);
      data.qiNiuToken.key = key;

      return isLt2M;
    };
    /**
     * 获取七牛云token
     */
    const getQiNiuToken = () => {
      let questData = {
        accesskey: props.config.accesskey,
        secretkey: props.config.secretkey,
        buckety: props.config.buckety
      };
      qiNiu(questData)
        .then(res => {
          data.qiNiuToken.token = res.data.data.token;
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 监听值变化
     */
    watch(
      () => props.imgUrl,
      value => {
        console.log(value);
        data.image = value;
      }
    );
    onMounted: {
      getQiNiuToken();
    }
    return {
      // reactive
      data,
      // methods
      handleAvatarSuccess,
      beforeAvatarUpload,
      getQiNiuToken
    };
  }
};
</script>

<style scoped lang="scss">
</style>