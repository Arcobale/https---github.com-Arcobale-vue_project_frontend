import {reqCartList, reqDeleteCart} from '@/api';
const state = {
    cartList: [],
};
const mutations = {
    CARTLIST(state, cartList) {
        state.cartList = cartList;
    }
};
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("CARTLIST", result.data);
        }
    },
    async deleteCartById({commit}, skuId) {
        let result = await reqDeleteCart(skuId);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("Failed"));
        }
    }
};
const getters = {
    cartList() {
        return state.cartList[0] || {};
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}