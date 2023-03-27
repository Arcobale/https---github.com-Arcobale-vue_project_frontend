import { reqGoodList } from "@/api";

const state = {
    goodList: {},
};

const mutations = {
    GOODLIST(state, goodList) {
        state.goodList = goodList;
    }
};

const actions = {
    async getGoodList({commit}, skuId) {
        let result = await reqGoodList(skuId);
        if (result.code == 200) {
            commit("GOODLIST", result.data);
        }
    }
};

const getters = {
    categoryView() {
        //至少返回一个空对象，防止undefine警告
        return state.goodList.categoryView || {};
    },
    skuInfo() {
        return state.goodList.skuInfo || {};
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}