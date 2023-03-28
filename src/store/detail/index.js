import { reqGoodList, reqAddOrUpdateShopCart } from "@/api";
import { getUUID } from '@/utils/uuid_token'
const state = {
    goodList: {},
    //游客临时身份
    uuid_token: getUUID(),
};

const mutations = {
    GOODLIST(state, goodList) {
        state.goodList = goodList;
    }
};

const actions = {
    async getGoodList({ commit }, skuId) {
        let result = await reqGoodList(skuId);
        if (result.code == 200) {
            commit("GOODLIST", result.data);
        }
    },
    async addOrUpdateShopCart({ commit }, { skuId, skuNum }) {
        //无返回值
        let result = await reqAddOrUpdateShopCart(skuId, skuNum);
        if (result.code == 200) {
            return "ok";
        } else {
            return Promise.reject(new Error("Failed"));
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
    spuSaleAttrList() {
        return state.goodList.spuSaleAttrList || [];
    },
};

export default {
    state,
    mutations,
    actions,
    getters
}