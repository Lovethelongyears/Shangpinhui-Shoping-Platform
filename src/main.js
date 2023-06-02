import Vue from 'vue'
import App from './App.vue'
// 三级联动组件————全局组件
import TypeNav from '@/components/TypeNav'
import Carousel from '@/components/Carousel'
import Pagination from '@/components/Pagination'
import { Button,MessageBox,Input } from 'element-ui'
// 第一个参数：全局组件的名字 第二参数：哪一个组件 
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagination.name, Pagination)
Vue.component(Button.name, Button)
// element-UI注册组件的时候，挂在原型上的写法
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入路由
import router from './router'
// 引入仓库
import store from './store'
// 引入mockserve.js-------mock数据
import '@/mock/mockServe'
// 引入swiper样式
import 'swiper/css/swiper.css'
// 统一接口api文件夹里的全部请求函数
import * as API from '@/api'
// 引入插件
import VueLazyload from 'vue-lazyload'
import xz from '@/assets/1.gif'
// 注册插件
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading:xz
});
// 引入自定义插件
import myPlugins from './plugins/myPlugins'
Vue.use(myPlugins, {
  name:'upper'
})
// 引入表单验证插件
import '@/plugins/validate'
new Vue({
  render: h => h(App),
  // 注册路由信息：当这里书写router的时候，组件身上都拥有$route,$router属性
  beforeCreate() {
    // 全局事件总线
    Vue.prototype.$bus = this;
    Vue.prototype.$API = API;
  },
  router,
  // 注册仓库:组件实例的身上会多一个属性$store
  store
}).$mount('#app')
