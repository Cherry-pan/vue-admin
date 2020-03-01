import service from "@/utils/request.js";
/**
 * 列表
 */

/**
 * 新增
 */

/**
 * 编辑
 */
export function edit_category(data) {
  return service.request({
    method: "post",
    url: "/news/editCategory/",
    data
  });
}

/**
 * 删除
 */
export function deleteCategory(data) {
  return service.request({
    method: "post",
    url: "/news/deleteCategory/",
    data
  });
}
/**
 * 添加一级分类
 */
export function addFirstCategory(data) {
  return service.request({
    method: "post",
    url: "/news/addFirstCategory/",
    data
  });
}

/**
 * 获取信息分类
 */
export function getCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  });
}
