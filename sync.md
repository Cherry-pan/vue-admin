### 父子组件通讯 
- props、emit、.sync
```js
// 第一种父组件有修饰符sync
// 父组件
<Dialog :tableRow.sync="dialogInfo"></Dialog>
// 子组件
emit("update:tableRow", checkedBox);
// 第二种
// 父组件
 <DialogEdit :flag.sync="dialogInfoEdit" @getListEmit="GetList"></DialogEdit>
//  子组件触发父组件的方法
 emit("getListEmit");
```

- 中央时间总线bus
```js
// 首先要全局引入
import Vue from "vue";
export default new Vue()
import Event from "@/utils/bus.js"
// 注册事件
 Event.$on("showFn",(data)=>{
    console.log(data);
  })
//调用事件
 Event.emit("showFn",{aa:"222"})  
```
- store vuex
```js
// store中存放一个默认值
const state = {
  test:"11"
}
const mutations = {
  test(state,value){
    state.test = value
  }
}
// 父组件调用store
 const aa = ()=>{
  root.$store.commit("common/test",{a:"aaa"})
}
// 子组件监听
 watch(()=>root.$store.state.common.test,(newValue)=>{
  console.log(newValue);
})
```
- \$attrs、$listeners
```js
// 父组件
<A a="ssss" b="ddd"/>
// 子组件
<div>{{$attrs}}</div>
// 孙组件
<C v-bind="$attrs" />


// 孙组件调用父组件的方法
const backcall = ()=>{
    emit("update")
}
// 子组件
<B v-bind="$attrs" v-on="$listeners"/>
// 父组件
<A a="ssss" b="ddd" v-on:update="bus"/>
```
`注意点：如果props接收的值的名称相同属性时，将不会显示`
- provide、inject 跨代
```js
// 父组件
provide("opopop","我师父组件")
// 孙组件
 const aa = inject("opopop")
```
- \$parent、$children、ref
```js
// 子组件调父组件方法
this.$parent.initData();
```