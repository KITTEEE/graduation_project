import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginLayout from '@views/LoginLayout';
import BasicLayout from '@views/BasicLayout';
import Home from '@views/Home';
import Login from '@c/Login/Login';
import Register from '@c/Login/Register';

import MyContributions from '@views/user/myContributions';
import Drafts from '@views/user/drafts';
import Delivery from '@views/user/delivery';
import Info from '@views/user/info';
import Setting from '@views/user/Setting';

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err);
};

// 固定的路由表
export const fixedRouter = [
    {
        path: '',
        component: LoginLayout,
        redirect: '/login',
        children: [
            {
                path: '/login',
                name: 'login',
                component: Login
            },
            {
                path: '/register',
                name: 'register',
                component: Register
            }
        ]
    },
    {
        path: '/index',
        redirect: '/index/mycontribute',
        component: BasicLayout
    }
];
// 需要权限判断展示的路由
export const permissionRouter = [
    {
        path: '/index',
        name: 'index',
        component: BasicLayout,
        meta: { title: '稿件中心', roles: ['user'], key: 'sub1' },
        children: [
            {
                path: '/index/mycontribute',
                name: 'mycontribute',
                component: MyContributions,
                meta: { title: '我的稿件', roles: ['user'] }
            },
            {
                path: '/index/drafts',
                name: 'drafts',
                component: Drafts,
                meta: { title: '草稿箱', roles: ['user'] }
            }
        ]
    },
    {
        path: '/index',
        name: 'delivery',
        component: BasicLayout,
        meta: { title: '投稿中心', roles: ['user'], key: 'sub2' },
        children: [
            {
                path: '/index/delivery',
                name: 'toDelivery',
                component: Delivery,
                meta: { title: '我要投稿', roles: ['user'] }
            }
        ]
    },
    {
        path: '/index',
        name: 'personal',
        component: BasicLayout,
        meta: { title: '个人中心', roles: ['user'], key: 'sub3' },
        children: [
            {
                path: '/index/info',
                name: 'info',
                component: Info,
                meta: { title: '个人信息', roles: ['user'] }
            },
            {
                path: '/index/setting',
                name: 'setting',
                component: Setting,
                meta: { title: '个人设置', roles: ['user'] }
            }
        ]
    },
    {
        path: '/index/home',
        name: 'home',
        component: Home,
        meta: { title: '管理员页面', roles: ['admin'] }
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: fixedRouter
});

export default router;
