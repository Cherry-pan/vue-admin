### vue2.0与3.0映射
|  vue2.0           | vue3.0  |
|  ----             | ----  |
| ~~beforeCreate~~  | setup() |
| ~~created~~       | setup() |
| beforeMount       | onBeforeMount |
| mounted           | onMounted |
| ~~methods~~       | 去除，普通方式写方法 |
| beforeUpdate      | onBeforeUpdate |
| updated           | onUpdated
| beforeDestory     | onBeforeUnmount |
| destoryed         | onUnmount |
| errorCaptured     | onErrorCaptured |
|                   | onRenderTracked |   
|                   | onRenderTriggered |  
