import { MessageBox } from "element-ui";
import { ref } from "@vue/composition-api";
export function global() {
  const str = ref("");
  const comfirm = ({ content, tip, type, fn, id ,catchfn}) => {
    MessageBox.confirm(content, tip || "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: type || "warning",
      center: true
    })
      .then(() => {
        str.value = "删除";        
        /**
         * 如果前面的为真，自动会执行后面的
         * false的话不会执行
         */
        fn && fn(id || "");
      })
      .catch(() => {
        catchfn && catchfn();
        //   root.$message({
        //     type: type || "info",
        //     message: "已取消删除"
        //   });
      });
  };
  return {
    str,
    comfirm
  };
}
