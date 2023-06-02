import { reqGetSearchInfo } from "@/api"
// search模块仓库
const state = {
    // 仓库初始状态
    searchList:{}
}
const mutations = {
    GETSEARCHLIST(state,searchList) {
        state.searchList=searchList
    }
}
const actions = {
    // 获取search模块的数据
    async getSearchList({ commit },params={}) {
        // 当前这个reqGetSearchInfo函数在调用获取服务器数据的时候，至少传递一个参数（空对象）
        //params形参：是当用户派发action的时候，第二个参数传递过来的，至少是一个空对象
        let result = await reqGetSearchInfo(params)
        if (result.code == 200) {
            commit('GETSEARCHLIST',result.data)
        }
    }
}
// 计算属性：getters在项目中是为了简化数据
// getters可以把将来在组件中需要的数据简化，将来组件在获取数据的时候就方便了
const getters = {
    // 当前形参state是当前仓库中的state，并非大仓库中的state
    goodsList(state) {
        // 如果服务器数据回来了，是一个数组
        // 如果没有网络，应该返回undefined
        return state.searchList.goodsList||[]
    },
    trademarkList(state) {
        return state.searchList.trademarkList
    },
    attrsList(state) {
        return state.searchList.attrsList
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}