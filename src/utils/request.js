import axios from "axios";
import {
    Message
} from 'element-ui';

// 创建axios，赋给变量service
const BASEURL = process.env.NODE_ENV === "production" ? "" : "/web";

const service = axios.create({
    baseURL: BASEURL,
    timeout: 15000
});


// 添加请求拦截器
/**
 * 请求接口之前，做的一些数据处理（请求拦截器）
 */
service.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    //console.log(config)
    //业务请求


    //最终目的不是在请求添加参数
    config.headers['token'] = '11111111'
    config.headers['userID'] = "22222"
    config.headers["sui"] = "33333 "
    return config;
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

/**
 * 请求接口之后，返回数据进行拦截（响应拦截器）
 *  
 * */
service.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    let data = response.data;
    //业务请求
    if (data.resCode !== 0) { //不等于0时，就是错误信息，
        Message.error(data.message);
        return Promise.reject(data);
    } else {
        return response; //等于0的情况就是响应请求
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});


export default service;

/**
 * 使用export default时，但不能同时存在多个default
 * 文件 import 不需要花括号
 */