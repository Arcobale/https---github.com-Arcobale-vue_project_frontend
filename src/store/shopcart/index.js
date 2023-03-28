import {reqCartList} from '@/api';
const state = {
    carList: [],
};
const mutations = {
    CARTLIST(state, carList) {
        state.carList = carList;
    }
};
const actions = {
    async getCartList({commit}) {
        let result = await reqCartList();
        if (result.code == 200) {
            commit("CARTLIST", result.data);
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