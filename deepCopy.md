### 数据引用类型 分离
### 深拷贝
`深拷贝出来的是一个字符串，需要再次转为json`
```js
JSON.parse(JSON.stringify(data.areaOptionsObj))
```
### 浅拷贝
`浅拷贝出来的就是一个对象`
```js
 Object.assign({},data.form)
```
### 区别
`举个栗子`
```js
let AAA = {
    a:{
        a:{
            a:{

            }
        }
    }
}
```
`浅拷贝拷贝出来的对象，再次改变时，对象的第一层不会被影响，里面的还是会被影响`<br/>
```js
let AAA = {
    a:function(){},
    b:underfied,
    c:Symbol(),
    d:"aaa"
}
```
`深拷贝出来，如果是上面a、b、c的情况，就不能使用深拷贝的方法了，a、b、c会被丢失`
<!-- 预览md文件快捷键：ctrl+shift+v -->