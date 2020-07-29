### 引用组件
```js
<template>
    <mytable :config="data.configTable"></mytable>
</template>

import mytable from "@c/Table/index";
export default {
    components: { mytable },
    setup(props, { root }) {
        // 传入参数
        const data = reactive({
        configTable: {
            tHead: [{
                label: "邮箱/用户名",
                field: "email",
                width:200
            }],  
            selection:false  
        }
        });
        return {data}
    }
}
```
`tHead表头，可设置多个，数组中包含对象，每个对象就是每一列`
`selection配置表格前面是否有多选显示`
### 组件说明
```js
setup(props, { root }) {
    // 配置参数，可自行添加数据
    const data = reactive({
        // 每一行的数据
        tableData: [{  
          email: "605992259@qq.com",
          name: "xxx",
          mobilephone: 13218009875,
          area: "南京市",
          role: "管理员"
        }]
    });
    return {data}
}
```
### 组件目录位置
```js
src/components/Table/index.vue
```
### 子组件接收参数类型
```js
export default {
    // config.tHead 数组类型
    // config.selection 布尔类型
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    }
}
```