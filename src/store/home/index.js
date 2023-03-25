import {reqCategoryList, reqBannerList} from '@/api';
//home模块的小仓库
//state：仓库存储数据的地方
const state = {
    categoryList: [],
    bannerList: []
};
//mutations：修改state的唯一手段
const mutations = {
    CATEGORYLIST(state, categoryList) {
        state.categoryList = categoryList;
    },
    BANNERLIST(state, bannerList) {
        state.bannerList = bannerList;
    }
};
//actions：处理action，可以书写自己的业务逻辑，也可以处理异步
const actions = {
    //这里可以书写业务逻辑，但是不能修改state
    //通过APi里面的接口函数调用，向服务器发请求，获取服务器的数据
    async getCategoryList({commit}) {
        let result = await reqCategoryList();
        if (result.code == 200) {
            commit("CATEGORYLIST", result.data);
        }
    },
    async getBannerList({commit}) {
        let result = await reqBannerList();
        if (result.code == 200) {
            commit("BANNERLIST", result.data);
        }
    }
};
//getters：理解为计算属性，用于简化仓库数据，让组件获取仓库的数据更加方便
const getters = {};
//对外暴露Store类的一个实例
export default {
    state,
    mutations,
    actions,
    getters
}