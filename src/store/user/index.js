import { reqGetCode, reqRegister, reqLogin } from "@/api";

const state = {
    code: '',
    token: '',//vuex的数据不是持久化
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
    },
    USERLOGIN(state, token) {
        state.token = token;
    }
};
const actions = {
    async getCode({commit}, phone) {
        let result = await reqGetCode(phone);
        if (result.code == 200) {
            commit("GETCODE", result.data);
            return 'ok';
        } else {
            return Promise.reject(new Error("Failed"));
        }
    },
    async userRegister({commit}, user) {
        let result = await reqRegister(user);
        if (result.code == 200) {
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
        }
    },
    async userLogin({commit}, user) {
        let result = await reqLogin(user);
        //服务器下发token，用户的唯一标识
        console.log(result);
        if (result.code == 200) {
            commit("USERLOGIN", result.data.token);
            return 'ok';
        } else {
            return Promise.reject(new Error(result.message));
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