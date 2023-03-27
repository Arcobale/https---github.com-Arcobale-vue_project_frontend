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

const getters = {};

export default {
    state,
    mutations,
    actions,
    getters
}