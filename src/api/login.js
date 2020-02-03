import service from "@/utils/request.js";
/**
 * 获取验证码
 */
export function GetSms(data) {
    return service.request({
        method: 'post',
        url: "/getSms/",
        data
        // data:data ,左边的data是变量名（key）后台接收的。右边的data是接收的参数，两者都是同名的情况下，用ES6写法
    })
}
/**
 * 获取用户角色
 */

/**
 * 登录
 */
export function Login(data) {
    return service.request({
        method: "post",
        url: "/login/",
        data
    })
}

/**
 * 注册
 */
export function Register(data) {
    return service.request({
        method: "post",
        url: "/register/",
        data
    })
}