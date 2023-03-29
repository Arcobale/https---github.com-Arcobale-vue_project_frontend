import { reqGetCode, reqRegister } from "@/api";

const state = {
    code: '',
};
const mutations = {
    GETCODE(state, code) {
        state.code = code
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
    }
};
const getters = {};
export default {
    state,
    mutations,
    actions,
    getters,
}