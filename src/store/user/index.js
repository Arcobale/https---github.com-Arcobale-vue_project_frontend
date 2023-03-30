import { reqGetCode, reqRegister, reqLogin, reqGetUserInfo, reqLogout } from "@/api";
import { setToken, getToken, removeToken } from '@/utils/token'

const state = {
    code: '',
    token: getToken(),//持久化本地存储
    userInfo: {},
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token;
    },
    USERINFO(state, userInfo) {
        state.userInfo = userInfo;
    },
    LOGOUT(state) {
        //本地存储数据清空
        removeToken();
        //将仓库中无关用户信息清空
        state.token = '';
        state.userInfo = {};
    }
};
const actions = {
    async getCode({ commit }, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error("Failed"));
        }
    },
    async userRegister({ commit }, user) {
        let result = await reqRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async userLogin({ commit }, user) {
        let result = await reqLogin(user);
        //服务器下发token，用户的唯一标识
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            //持久化存储token
            setToken(result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async getUserInfo({ commit }) {
        let result = await reqGetUserInfo();
        if (result.code == 200) {
            commit("USERINFO", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async logout({commit}) {
        let result = await reqLogout();
        if (result.code == 200) {
            commit("LOGOUT");
            return 'ok';
        } else {
            return Promise.reject(new Error("Failed"));
        }
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}