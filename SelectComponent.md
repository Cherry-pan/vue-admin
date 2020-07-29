### 引用组件
```js
<template>
    <SelectValue :config="data.configOptions"></SelectValue>
</template>

import SelectValue from "@c/Select/index";
export default {
    components: { SelectValue },
    setup(props, { root }) {
        // 传入参数
        const data = reactive({
        configOptions: {
            initData: ["mobile", "name"],
            aa:""  //可自行传入数据
        }
        });
        return {data}
    }
}
```

### 组件说明
```js
setup(props, { root }) {
    // 配置参数，可自行添加数据
    const data = reactive({
        optionsData: [
            { value: "mobile", label: "手机号" },
            { value: "name", label: "姓名" },
            { value: "email", label: "邮箱" },
            { value: "id", label: "ID" },
            { value: "title", label: "标题" }
        ]
    });
    return {data}
}
```
### 组件目录位置
```js
src/components/Select/index.vue
```
### 子组件接收参数类型
```js
export default {
    // config.initData 数组类型
    // config.aa 任意字符串
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    }
}
```