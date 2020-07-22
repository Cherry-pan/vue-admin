import { MessageBox } from "element-ui";
export default {
  install(Vue, options) {
    Vue.prototype.confirm = ({ content, tip, type, fn }) => {
      MessageBox.confirm(content, tip || "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: type || "warning",
        center: true
      })
        .then(() => {
          /**
           * 如果前面的为真，自动会执行后面的
           * false的话不会执行
           */
          fn && fn(11111);
        })
        .catch(() => {
          //   root.$message({
          //     type: type || "info",
          //     message: "已取消删除"
          //   });
        });
    };
  }
};

// vue 插件
