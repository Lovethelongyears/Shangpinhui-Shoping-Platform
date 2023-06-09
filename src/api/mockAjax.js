// 对axios进行二次封装
import axios from "axios";
// 引入进度条
import nprogress from "nprogress";
// 引入进度条样式
import 'nprogress/nprogress.css'
// start:进度条开始 done：进度条结束

// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，需要配置一下
const requests = axios.create({
    // 配置对象
    // 基础路径，发请求时，路径当中会出现api
    baseURL: "/mock",
    // 代表请求超时的时间
    timeout:5000,    
})
// 请求拦截器：在发请求之前，请求拦截器可以检测到，可以在请求发出之前做些事
requests.interceptors.request.use((config) => {
    // config:配置对象，对象里的headers（请求头）属性很重要
    // 进度条开始动
    nprogress.start();
    return config;
})
// 响应拦截器
requests.interceptors.response.use((res) => {
    // 服务器成功的回调函数，服务器相应数据回来以后，响应拦截器可以检测到，可以做些事
    // 进度条结束
    nprogress.done();
    return res.data;
}, (error) => {
    // 响应失败的回调函数
    return Promise.reject(new Error('faile'))
})
// 对外暴露
export default requests;