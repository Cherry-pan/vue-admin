### router路由跳转
#### 1、明文传参[`query`]:URL路径`会`显示传递的参数<br/>
  `优势：页面刷新新参数不会丢失`<br/>
  `劣势：参数公开`
* 传参方式

  * HTML跳转
  ```js    
    <router-link :to="{name:'editDetail',query:{page:1,code:1111}}"></router-link>
  ```
  * JS跳转
  ```js
  this.$router.push({
      name:"editDetail",
      query:{
          page:1,
          code:1111
      }
  })
  ```
* 接收参数
  ```js
  this.$route.query.page
  ```
#### 2、密文传参[`params`]:URL路径`不会`显示传递的参数<br/>
  `优势：参数不显示`<br/>
  `劣势：页面刷新参数丢失`
* 传参方式
  * HTML跳转
  ```js    
    <router-link :to="{name:'editDetail',params:{page:1,code:1111}}"></router-link>
  ```
  * JS跳转
  ```js
  this.$router.push({
      name:"editDetail",
      params:{
          page:1,
          code:1111
      }
  })
  ```
* 接收参数
  ```js
  this.$route.params.page
  ```
#### 3、冒号的形式传参<br/>
  `优势：页面刷新后参数不会丢失`<br/>
  `劣势：需要手动配置`
* 路由配置
    ```js
    {
      path: "/editDetail/:id/:title",  //手动配置path
      name: "editDetail",
      hidden:true, 
      meta: {
        name: "信息分类"
      },
      component: () => import("../views/Info/editDetail.vue"),
    }
    ```
* 传参方式<br/>
  `root`是vue3.0中的，相当于2.0中的`this`
  ```js
  const editDetail = (data)=>{
    root.$router.push({
      path:`/editDetail/${data.id}/${data.title}`
    })
  }
  ```  
* 接收参数
  ```js
  root.$route.params.id
  root.$route.params.title
  ```
#### 4、vuex结合H5本地存储<br/>
 `优势：参数不显示`<br/>
  `劣势：大材小用，解决第二种密文传参刷新后参数丢失的情况`
* 传参方式
  * store中 
  ```js
  /**
   * 已经存储了值，不刷新页面的话，值一直存在vuex
   * 刷新页面，数据丢失，但是可以从sessionStorage中取到值
   */
  const state = {
    id: "" || sessionStorage.getItem("infoId"),
    title: "" || sessionStorage.getItem("infoTitle")
  }
  //取到sessionStorage中缓存的值
  const getters = {
    infoId: state => state.id,
    infoTitle: state => state.title
  }
  const mutations = {
      SET_ID(state, value) {
          state.id = value;
          sessionStorage.setItem("infoId", value);
      },
      SET_TITLE(state, value) {
          state.title = value;
          sessionStorage.setItem("infoTitle", value);
      }

  }
  export default {
    namespaced: true,
    state,
    getters,
    mutations
  };
  ```
  `vuex刷新后数据丢失，但是可以利用H5的本地存储`
  * js
  ```js
  root.$store.commit("editDetail/SET_ID",id)
  root.$store.commit("editDetail/SET_TITLE",title)
  //在跳转之前提前将数据存储起来
  root.$router.push({
        name: "editDetail",
        params: {
          id: data.id,
          title: data.title
        }
  });
  ```
* 接收方式
  ```js
  //代码会在这里又重新执行一遍,vuex中的数据就会丢失
  let id = root.$route.params.id ||root.$store.getters["editDetail/infoId"];
  let title = root.$route.params.title || root.$store.getters["editDetail/infoTitle"];
  ```
  `store中的数据导出使用了命名空间`
#### 5、新窗口打开
 `优势：参数不显示`<br/>
  `劣势：大材小用，解决第二种密文传参刷新后参数丢失的情况`
* HTML
  ```js
  <router-link target="_blank" :to="{name:'editDetail',params:{id:scope.row.id}}">
    <el-button size="mini" type="success">编辑详情</el-button>
  </router-link>
  ```
  `注意：vue1不支持`
* JS
  ```js
  let routerDate = root.$router.resolve({
    name: "editDetail",   
    query: {
      id: data.id,
      title: data.title
    },
  });
  window.open(routerDate.href,"_blank");
  ```