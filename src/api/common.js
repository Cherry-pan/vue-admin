import {
  getCategory,
  getCategoryAll
} from "@/api/news.js";
import {
  reactive
} from "@vue/composition-api";
import service from "@/utils/request.js";
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

/**
 * 获取七牛云token
 */
export function qiNiu(data) {
  return service.request({
    method: "post",
    url: "/uploadImgToken/",
    data
  });
}

/**
 * 初始化表格数据
 * @param {
 *   username: "",  用户名:Sting
     truename: "",  真实姓名:Sting
     phone: null,   电话号码:number
     pageNumber: 1, 真实姓名:number
     pageSize: 10   真实姓名:number
 * } params
 */
export function loadTableData(params) {
  return service.request({
    method: params.methods || "post",
    url: params.requestURL,
    data: params.data || {}
  });
}