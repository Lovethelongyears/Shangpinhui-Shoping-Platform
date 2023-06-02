// 登录与注册的模块
import { reqGetCode, reqUserResgiter, reqUserLogin, reqUserInfo, reqLogout } from '@/api'
import { getToken, removeToken, setToken } from './utils/token'
const state = {
    code: '',
    token:getToken(),
    userInfo:{}
}
const mutations = {
    GETCODE(state, code) {
        state.code=code
    },
    USERLOGIN(state, token) {
        state.token=token
    },
    GETUSERINFO(state, userInfo) {
        state.userInfo=userInfo
    },
    // 清除本地数据
    CLEAR(state) {
        state.token = '';
        state.userInfo = {};
        removeToken();
    }
}
const actions = {
    // 获取验证码
    async getCode({commit},phone) {
        let result = await reqGetCode(phone)
        if (result.code == 200) {
            commit('GETCODE', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 注册
    async userRegister({ commit }, user) {
        let result = await reqUserResgiter(user)
        if (result.code == 200) {
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 登录[token]
    async userLogin({ commit }, data) {
        let result = await reqUserLogin(data)
        // 服务器下发的token是用户的唯一标识
        if (result.code == 200) {
            commit('USERLOGIN', result.data.token)
            // 持久化存储token
            setToken(result.data.token)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 获取用户信息
    async getUserInfo({commit}) {
        let result = await reqUserInfo();
        if (result.code == 200) {
            commit('GETUSERINFO', result.data)
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    },
    // 退出登录
    async userLogout({commit}) {
        let result = await reqLogout()
        // action里面不能操作state
        if (result.code == 200) {
            commit('CLEAR')
            return 'ok'
        } else {
            return Promise.reject(new Error('faile'))
        }
    }
}
const getters = {}
export default {
    state,
    mutations,
    actions,
    getters
}