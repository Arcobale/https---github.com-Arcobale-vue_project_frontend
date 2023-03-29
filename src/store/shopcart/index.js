import {reqCartList, reqDeleteCart, reqUpdateCheckedById} from '@/api';
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
    },
    async updateCheckedById({commit}, {skuId, isChecked}) {
        let result = await reqUpdateCheckedById(skuId, isChecked);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("Failed"));
        }
    },
    deleteAllCheckedCart({dispatch, getters}) {
        //context:小仓库，里面有commit getters dispatch state
        let PromiseAll = [];
        getters.cartList.cartInfoList.forEach(cart => {
            if (cart.isChecked == 1) {
                //async返回的是promise，将每一个promise加入数组
                PromiseAll.push(dispatch("deleteCartById", cart.skuId));
            }
        });
        //全部的promise成功，结果才为成功
        return Promise.all(PromiseAll);
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