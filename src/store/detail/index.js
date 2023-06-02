import { reqAddOrUpdateShopCart, reqGoodsInfo } from '@/api'
import {getUUID} from '@/store/utils/uuid_token'
const state = {
    goodsInfo: {},
    // 游客历史身份
    uuid_token:getUUID()
}
const mutations = {
    GETGOODSINFO(state, goodsInfo) {
        state.goodsInfo=goodsInfo
    }
}
const actions = {
    // 获取产品信息的action
    async getGoodsInfo({commit},skuid) {
        let result = await reqGoodsInfo(skuid);
        if (result.code == 200) {
            commit('GETGOODSINFO',result.data)
        }
    },
    // 将产品添加到购物车中
    async addOrUpdateShopCart({ commit }, {skuId, skuNum}) {
        // 加入购物车返回的解构
        // 加入购物车以后（发请求），前台将参数带给服务器
        // 服务器写入数据成功，并没有返回其他的数据，只是返回code=200，代表操作成功
        let result = await reqAddOrUpdateShopCart(skuId, skuNum)
        // 代表服务器加入购物车成功
        if (result.code == 200) {
            return 'ok'
        } else {
            // 代表购物车加入失败
            return Promise.reject(new Error('faile'))
        }
    }
}
// 简化数据
const getters = {
    // 路径导航简化的数据
    categoryView(state) {
        return state.goodsInfo.categoryView||{}
    },
    // 简化产品信息的数据
    skuInfo(state) {
        return state.goodsInfo.skuInfo||{}
    },
    // 产品售卖属性的简化
    spuSaleAttrList(state) {
        return state.goodsInfo.spuSaleAttrList||[]
    }
}
export default {
    state,
    mutations,
    actions,
    getters
}