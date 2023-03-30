//配置路由的地方
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
import store from '@/store'
//使用插件
Vue.use(VueRouter)

//配置路由
let router = new VueRouter({
    //配置路由
    routes,
    scrollBehavior(to, from, savedPosition) {
        // always scroll to top
        return { y: 0 };
    }
})

//全局首位，前置守卫（在路由跳转之间进行判断）
//to:将要跳转的路由信息
//from:从哪个路由而来的信息
//next:放行函数，next()放行，next(path)放行到指令路由
router.beforeEach(async (to, from, next) => {
    let token = store.state.user.token;
    let name = store.state.user.userInfo.name;
    let toPath = to.path;
    if (token) {
        //如果用户已经登录了还想去login（不能去，停留在首页）
        if (to.path == '/login' || to.path == '/register') {
            next('/home');
        } else {
            //如果用户名已有
            //路由组件间跳转，不刷新页面，用户信息一直有
            if (name) {
                next();
            } else {
                //刷新页面了，没有用户信息，dispatch让仓库存储用户信息再进行跳转
                try {
                    //获取用户信息成功
                    //Home和Header中的dispatch转移到了这里
                    await store.dispatch("getUserInfo");
                    next();
                } catch (error) {
                    //token过期了
                    //清空token，返回登录页面
                    store.dispatch("logout");
                    next('/login');
                }
            }
        }
    } else {
        //未登录不能去交易、支付、订单页面，跳转登录页面
        if (to.path == '/trade' || to.path == '/pay' || to.path == '/paysuccess' || to.path.indexOf('/center') != -1) {
            //query保存本来要去的路径
            next('/login?redirect=' + toPath);
            alert('您还未登录！');
        } else {
            next();
        }
    }
})

export default router;