//当前这个模块，API进行统一管理
import requests from "./request";
import requestsMock from "./requestMock";
//三级联动接口
//发请求：axios发请求返回结果Promise对象
export const reqCategoryList = () => requests({ url: '/product/getBaseCategoryList', method: 'get' });

//获取banner
export const reqBannerList = () => requestsMock({ url: '/banner', method: 'get' });

//获取floor
export const reqFLoorList = () => requestsMock({ url: '/floor', method: 'get' });

export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params });