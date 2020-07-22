import service from "@/utils/request.js";
/**
 * 获取信息列表
 */
export function getList(data) {
  return service.request({
    method: "post",
    url: "/news/getList/",
    data
  });
}

/**
 * 新增
 *
 */
export function addInfo(data) {
  return service.request({
    method: "post",
    url: "/news/add/",
    data
  });
}

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
export function deleteInfo(data) {
  return service.request({
    method: "post",
    url: "/news/deleteInfo/",
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
   * 添加子集分类
   */
  export function addChildrenCategory(data) {
    return service.request({
      method: "post",
      url: "/news/addChildrenCategory/",
      data
    });
  }

/**
 * 获取信息分类
 */
export function getCategory(data) {
  return service.request({
    method: "post",
    url: "/news/getCategory/",
    data
  });
}
/**
 * 获取所有信息分类（包含子集）
 */
export function getCategoryAll(data) {
  return service.request({
    method: "post",
    url: "/news/getCategoryAll/",
    data
  });
}
// 修改信息
export function editInfo(data) {
  return service.request({
    method: "post",
    url: "/news/editInfo/",
    data
  });
}
