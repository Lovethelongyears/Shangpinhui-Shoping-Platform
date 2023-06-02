// 配置路由的地方
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
// 使用插件
Vue.use(VueRouter)
// 引入store
import store from "@/store";
// 先把VueRouter原型对象的push保存一份
let originPush = VueRouter.prototype.push
let originReplace = VueRouter.prototype.replace
// 重写push|replace
// 第一个参数：告诉原来push方法，你往哪跳转（传递哪些参数）
VueRouter.prototype.push = function (location, resolve, reject) {
    if (resolve && reject) {
        // call||apply区别
        // 相同点，都可以调用函数一次，都可以篡改函数的上下文一次
        // 不同点：call与apply传递参数：call传递参数用逗号隔开，apply方法执行，传递数组
        originPush.call(this, location, resolve, reject)
    } else {
        originPush.call(this, location, () => { }, () => { })
    }
}
VueRouter.prototype.replace = function (location, resolve, reject) {
    if (resolve && reject) {
        originReplace.call(this, location, resolve, reject)
    } else {
        originReplace.call(this, location, () => { }, () => { })
    }
}
// 配置路由
const router = new VueRouter({
    routes,
    // 滚动行为
    scrollBehavior(to, from, savedPosition) {
        // 返回的y代表滚动条在最上方
        return { y: 0 }
    }
})
// 全局守卫---在路由跳转之前进行判断
router.beforeEach(async (to, from, next) => {
    // to:可以获取需要跳转到哪个路由
    // from:可以获取到从哪个路由跳转
    // next:放行函数 next(path)表示放行到指定路由
    // next()
    // 用户登录了才会有token
    let token = store.state.user.token;
    // 用户信息
    let name = store.state.user.userInfo.name;
    if (token) {
        // 用户已经登录了
        if (to.path == '/login'||to.path=='/register') {
            next('/')
        } else {
            if (name) {
                next();
            } else {
                // 没有用户信息
                try {
                    // 获取用户信息在首页展示
                    await store.dispatch('getUserInfo')
                    next();
                } catch (error) {
                    // token失效了重新登录
                    // 清除token
                    await store.dispatch('userLoginout')
                    next('/login')
                }
            }
        }
    } else {
        // 未登录:不能去交易相关、支付相关、个人中心的页面，点击这些路由应该跳转到登录页面
        let toPath = to.path;
        if (toPath.indexOf('/trade')!=-1||toPath.indexOf('/pay')!=-1||toPath.indexOf('/center')!=-1) {
            next('login?redirect='+toPath)
        } else {
            next();
        }
    }
})
export default router;