import service from "@/utils/request.js";

/**
 * 获取角色
 */
export function GetRole(data) {
    return service.request({
        method: "post",
        url: "/role/",
        data
    });
}
/**
 * 获取系统
 */
export function GetSystem(data) {
    return service.request({
        method: "post",
        url: "/system/",
        data
    });
}
/**
 * 获取按钮权限
 */
export function GetPermButton(data) {
    return service.request({
        method: "post",
        url: "/permButton/",
        data
    });
}

/**
 * 用户添加
 */

export function addUser(data) {
    return service.request({
        method: "post",
        url: "/user/add/",
        data
    });
}

/**
 * 用户编辑
 */
export function editUser(data) {
    return service.request({
        method: "post",
        url: "/user/edit/",
        data
    });
}
/**
 * 用户删除
 */
export function deleteUser(data) {
    return service.request({
        method: "post",
        url: "/user/delete/",
        data
    });
}
/**
 * 用户禁启用
 */

export function userActives(data) {
    return service.request({
        method: "post",
        url: "/user/actives/",
        data
    });
}