import { reqSearchList } from "@/api";
//search模块的小仓库
const state = {
    searchList: {}
};
const mutations = {
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList;
    }
};
const actions = {
    async getSearchList({ commit }, params = {}) {
        let result = await reqSearchList(params);
        if (result.code == 200) {
            commit("GETSEARCHLIST", result.data);
        }
    }
};
//getters主要作用：简化数据
const getters = {
    //假如网络加载速度慢或者没网，应该返回undefined
    attrsList() {
        return state.searchList.attrsList || [];
    },
    goodsList() {
        return state.searchList.goodsList;
    },
    trademarkList() {
        return state.searchList.trademarkList;
    }
};
export default {
    state,
    mutations,
    actions,
    getters
}