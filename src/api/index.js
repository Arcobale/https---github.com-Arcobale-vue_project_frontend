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

//获取搜索模块数据
export const reqSearchList = (params) => requests({ url: '/list', method: 'post', data: params });

//获取产品详情
export const reqGoodList = (skuId) => requests({url: `/item/${skuId}`, method: 'get'});

//将产品添加到购物车
export const reqAddOrUpdateShopCart= (skuId, skuNum) => requests({url: `/cart/addToCart/${skuId}/${skuNum}`, method: 'post'})

//获取购物车列表数据
export const reqCartList = () => requests({url: '/cart/cartList', method:'get'});

//删除购物车产品
export const reqDeleteCart = (skuId) => requests({url: `/cart/deleteCart/${skuId}`, method:'delete'});

//切换购物车产品选中状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get'});

//获取注册验证码
export const reqGetCode = (phone) => requests({url:`/user/passport/sendCode/${phone}`, method: 'get'});

//注册用户
export const reqRegister = (data) => requests({url: `/user/passport/register`, method:'post', data});