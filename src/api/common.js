import { getCategory } from "@/api/news.js";
import { reactive} from "@vue/composition-api";
export function common() {
    const categoryItem = reactive({
        item:[]
    })
  const getInfoCategory = () => {
    getCategory({})
      .then(res => {
          categoryItem.item = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  };
  return {
    getInfoCategory,categoryItem
  };
}
