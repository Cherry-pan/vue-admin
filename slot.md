### v-slot插槽 
`父组件传内容到子组件显示`
- 匿名插槽<br/>
  `没有指定某一个插槽，全部都显示`
- 具名插槽<br/>
  `指定插槽内显示内容`
  ```js
  //子组件
  <template>
    <slot name="status"></slot>
  </template>

  <!-- 父组件使用slot -->
  <template #status>1111</template>
  ```
- 作用域插槽<br/>
  `可以进行数据绑定，父子组件之间的通信`
  ```js
  //子组件
  <template slot-scope="scope">
    <slot name="status" :data="scope.row"></slot>
  </template>

  //父组件
  <template v-slot:status="data">
    <el-switch v-model="data.data.name"></el-switch>
  </template>
  ```