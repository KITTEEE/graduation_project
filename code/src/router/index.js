import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginLayout from '@views/LoginLayout';
import BasicLayout from '@views/BasicLayout';
import Login from '@c/Login/Login';
import Register from '@c/Login/Register';
// 投稿者页面
import MyContributions from '@views/user/myContributions';
import PaperDetail from '@views/user/paperdetail';
import EditPaperDetail from '@views/editor/paperdetail';
import Drafts from '@views/user/drafts';
import Delivery from '@views/user/delivery';
import Info from '@views/user/info';
import Setting from '@views/user/Setting';
// 审稿人页面
import FstCheck from '@views/editor/fstCheck';
import SecCheck from '@views/editor/secCheck';
import WaitEmploy from '@views/editor/waitEmploy';
import HasEmploy from '@views/editor/hasEmploy';
import EditorInfo from '@views/editor/editorInfo';
import EditorSetting from '@views/editor/editorSetting';

// 管理员界面
import Commitor from '@views/admin/commitor';
import Editor from '@views/admin/editor';
import Paper from '@views/admin/paper';
import Power from '@views/admin/power';
import Person from '@views/admin/person';
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
        meta: { title: '稿件中心', roles: ['contributor'], key: 'sub1', icon: 'book' },
        children: [
            {
                path: '/user/mycontribute',
                name: 'mycontribute',
                component: MyContributions,
                meta: {
                    title: '我的稿件',
                    roles: ['contributor']
                }
            },
            {
                path: '/user/paperdetail',
                name: 'paperdetail',
                component: PaperDetail,
                meta: { title: '稿件详情', roles: ['contributor'] }
            },
            {
                path: '/user/drafts',
                name: 'drafts',
                component: Drafts,
                meta: { title: '草稿箱', roles: ['contributor'] }
            }
        ]
    },
    {
        path: '/user',
        name: 'delivery',
        component: BasicLayout,
        meta: { title: '投稿中心', roles: ['contributor'], key: 'sub2', icon: 'mail' },
        children: [
            {
                path: '/user/delivery',
                name: 'toDelivery',
                component: Delivery,
                meta: { title: '我要投稿', roles: ['contributor'] }
            }
        ]
    },
    {
        path: '/user',
        name: 'personal',
        component: BasicLayout,
        meta: { title: '个人中心', roles: ['contributor'], key: 'sub3', icon: 'user' },
        children: [
            {
                path: '/user/info',
                name: 'info',
                component: Info,
                meta: { title: '个人信息', roles: ['contributor'] }
            },
            {
                path: '/user/setting',
                name: 'setting',
                component: Setting,
                meta: { title: '个人设置', roles: ['contributor'] }
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
                path: '/editor/paperdetail',
                name: 'paperdetail',
                component: EditPaperDetail,
                meta: { title: '稿件详情', roles: ['editor'] }
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
            },
            {
                path: '/editor/hasEmploy',
                name: 'hasEmploy',
                component: HasEmploy,
                meta: { title: '已录用', roles: ['editor'] }
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
    },

    // 管理员路由
    {
        path: '/admin',
        name: 'admin',
        redirect: '/admin/commitor',
        component: BasicLayout,
        meta: { title: '用户管理', roles: ['admin'], key: 'sub6', icon: 'user' },
        children: [
            {
                path: '/admin/commitor',
                name: 'commitor',
                component: Commitor,
                meta: { title: '投稿人管理', roles: ['admin'] }
            },
            {
                path: '/admin/editor',
                name: 'editor',
                component: Editor,
                meta: { title: '审稿人管理', roles: ['admin'] }
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: BasicLayout,
        meta: { title: '稿件管理', roles: ['admin'], key: 'sub7', icon: 'user' },
        children: [
            {
                path: '/admin/paper',
                name: 'paper',
                component: Paper,
                meta: { title: '稿件管理', roles: ['admin'] }
            }
        ]
    },
    {
        path: '/admin',
        name: 'admin',
        component: BasicLayout,
        meta: { title: '个人管理', roles: ['admin'], key: 'sub8', icon: 'user' },
        children: [
            {
                path: '/admin/power',
                name: 'power',
                component: Power,
                meta: { title: '权限管理', roles: ['admin'] }
            },
            {
                path: '/admin/person',
                name: 'person',
                component: Person,
                meta: { title: '个人管理', roles: ['admin'] }
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
