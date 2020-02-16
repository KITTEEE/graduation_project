import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginLayout from '@views/LoginLayout';
import BasicLayout from '@views/BasicLayout';
import Login from '@c/Login/Login';
import Register from '@c/Login/Register';
// 投稿者页面
import MyContributions from '@views/user/myContributions';
import Drafts from '@views/user/drafts';
import Delivery from '@views/user/delivery';
import Info from '@views/user/info';
import Setting from '@views/user/Setting';
// 审稿人页面
import FstCheck from '@views/editor/fstCheck';
import SecCheck from '@views/editor/secCheck';
import WaitEmploy from '@views/editor/waitEmploy';
import EditorInfo from '@views/editor/editorInfo';
import EditorSetting from '@views/editor/editorSetting';

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
    }
];
// 需要权限判断展示的路由
export const permissionRouter = [
    // 投稿者路由
    {
        path: '/user',
        name: 'user',
        redirect: '/user/mycontribute',
        component: BasicLayout,
        meta: { title: '稿件中心', roles: ['user'], key: 'sub1', icon: 'book' },
        children: [
            {
                path: '/user/mycontribute',
                name: 'mycontribute',
                component: MyContributions,
                meta: { title: '我的稿件', roles: ['user'] }
            },
            {
                path: '/user/drafts',
                name: 'drafts',
                component: Drafts,
                meta: { title: '草稿箱', roles: ['user'] }
            }
        ]
    },
    {
        path: '/user',
        name: 'delivery',
        component: BasicLayout,
        meta: { title: '投稿中心', roles: ['user'], key: 'sub2', icon: 'mail' },
        children: [
            {
                path: '/user/delivery',
                name: 'toDelivery',
                component: Delivery,
                meta: { title: '我要投稿', roles: ['user'] }
            }
        ]
    },
    {
        path: '/user',
        name: 'personal',
        component: BasicLayout,
        meta: { title: '个人中心', roles: ['user'], key: 'sub3', icon: 'user' },
        children: [
            {
                path: '/user/info',
                name: 'info',
                component: Info,
                meta: { title: '个人信息', roles: ['user'] }
            },
            {
                path: '/user/setting',
                name: 'setting',
                component: Setting,
                meta: { title: '个人设置', roles: ['user'] }
            }
        ]
    },

    //审稿人路由
    {
        path: '/editor',
        name: 'editor',
        redirect: '/editor/fstCheck',
        component: BasicLayout,
        meta: { title: '审稿中心', roles: ['editor'], key: 'sub4', icon: 'book' },
        children: [
            {
                path: '/editor/fstCheck',
                name: 'fstCheck',
                component: FstCheck,
                meta: { title: '待初审', roles: ['editor'] }
            },
            {
                path: '/editor/secCheck',
                name: 'secCheck',
                component: SecCheck,
                meta: { title: '待外审', roles: ['editor'] }
            },
            {
                path: '/editor/waitEmploy',
                name: 'waitEmploy',
                component: WaitEmploy,
                meta: { title: '待录用', roles: ['editor'] }
            }
        ]
    },
    {
        path: '/editor',
        name: 'editor',
        redirect: '/editor/info',
        component: BasicLayout,
        meta: { title: '个人中心', roles: ['editor'], key: 'sub5', icon: 'user' },
        children: [
            {
                path: '/editor/info',
                name: 'editorInfo',
                component: EditorInfo,
                meta: { title: '个人信息', roles: ['editor'] }
            },
            {
                path: '/editor/setting',
                name: 'editorSetting',
                component: EditorSetting,
                meta: { title: '个人设置', roles: ['editor'] }
            }
        ]
    }
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: fixedRouter
});

export default router;
