/**
 * 过滤特殊字符
 */
export function stripscript(s) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < s.length; i++) {
        rs = rs + s.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

/**
 * 验证邮箱
 */
export function validateMail(value) {
    let reg = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
    return !reg.test(value) ? true : false
}

/**
 * 验证密码 密码为6至20位数字+字母   
 */
export function validatePass(value) {
    let reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/;
    // let reg = /^([a-zA-Z]|[0-9])(\W|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,,4})$/ //邮箱
    return !reg.test(value) ? true : false
}

/**
 * 验证验证码 只有6位数字
 */
export function validateCode(value) {
    let reg = /^[a-zA-Z0-9]{6}$/;
    return !reg.test(value) ? true : false
}