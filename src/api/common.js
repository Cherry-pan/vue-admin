import { getCategory, getCategoryAll } from "@/api/news.js";
import { reactive } from "@vue/composition-api";
export function common() {
  const categoryItem = reactive({
    item: []
  });
  /**
   * 获取分类
   */
  const getInfoCategory = () => {
    getCategory({})
      .then(res => {
        categoryItem.item = res.data.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  };
  /**
   * 获取全部分类[带有子集分类]
   */
  const getInfoCategoryAll = () => {
    getCategoryAll({})
      .then(res => {
        console.log(res);
        
        categoryItem.item = res.data.data;
      })
      .catch(error => {
        console.log(error);
      });
  };
  return {
    getInfoCategory,
    categoryItem,
    getInfoCategoryAll
  };
}
