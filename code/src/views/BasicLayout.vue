<template>
    <a-layout id="components-layout-demo-custom-trigger">
        <a-layout-sider :trigger="null" collapsible v-model="collapsed" width="256px">
            <div class="logo">
                <a href="">
                    <img src="~@/assets/logo.svg?inline" alt="" />
                    <h1 v-if="!collapsed">Easy Paper</h1>
                </a>
            </div>
            <a-menu :openKeys.sync="openKeys" mode="inline" theme="dark" :inlineCollapsed="collapsed">
                <!-- <sideMenus :routes="getRoutes"></sideMenus> -->
                <a-sub-menu v-for="item in getRoutes" :key="item.meta.key">
                    <span slot="title">
                        <a-icon type="mail" />
                        <span>{{ item.meta.title }}</span>
                    </span>
                    <a-menu-item v-for="data in item.children" :key="data.name" @click="$router.push({ path: data.path })">
                        {{ data.meta.title }}
                    </a-menu-item>
                </a-sub-menu>
            </a-menu>
        </a-layout-sider>
        <a-layout>
            <a-layout-header style="background: #fff; padding: 0">
                <a-icon class="trigger" :type="collapsed ? 'menu-unfold' : 'menu-fold'" @click="() => (collapsed = !collapsed)" />
                <div style="float:right;margin-right:50px">
                    <a-dropdown>
                        <span class="action ant-dropdown-link user-dropdown-menu">
                            <a-avatar class="avatar" :size="30" style="margin-right:20px" />
                            <span>Kite_Yiu</span>
                        </span>
                        <a-menu slot="overlay">
                            <a-menu-item key="0">
                                <a-icon type="user" />
                                <span>个人信息</span>
                            </a-menu-item>
                            <a-menu-item key="1">
                                <a-icon type="setting" />
                                <span>账户设置</span>
                            </a-menu-item>

                            <a-menu-divider />
                            <a-menu-item key="3">
                                <a href="javascript:;" @click="handleLogout">
                                    <a-icon type="logout" />
                                    <span>退出登录</span>
                                </a>
                            </a-menu-item>
                        </a-menu>
                    </a-dropdown>
                </div>
            </a-layout-header>
            <a-layout-content
                :style="{
                    margin: '16px 16px',
                    padding: '24px',
                    background: '#fff',
                    minHeight: '280px'
                }"
            >
                <router-view></router-view>
            </a-layout-content>
        </a-layout>
    </a-layout>
</template>
<script>
import { mixin, mixinDevice } from '@/utils/mixin';
// import sideMenus from '@c/sideMenus';
import { permissionRouter } from '@/router/index';
export default {
    mixins: [mixin, mixinDevice],
    // components: {
    //     sideMenus
    // },
    data() {
        return {
            openKeys: ['sub1', 'sub2', 'sub3'],
            collapsed: false
        };
    },
    methods: {
        handleLogout() {}
    },
    computed: {
        getRoutes() {
            // console.log();
            var routes = global.antRouter.slice(2);
            console.log(routes);
            return routes;
        }
    },
    created() {
        // console.log(permissionRouter);
    }
    // watch: {
    //   sidebarOpened (val) {
    //     this.collapsed = !val;
    //   }
    // }
};
</script>
<style lang="less">
#components-layout-demo-custom-trigger {
    font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
    .ant-layout-sider {
        position: relative;
        box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
        z-index: 106;
        min-width: 256px;
        min-height: 100vh;
        background: #001529;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        .logo {
            height: 64px;
            background-color: #002140;
            overflow: hidden;
            > a {
                height: 64px;
                line-height: 64px;
                padding-left: 22px;
                > img {
                    height: 32px;
                    // padding: 16px 0;
                }
                > h1 {
                    display: inline;
                    color: #fff;
                    font-size: 20px;
                    margin: 0 0 0 12px;
                    font-weight: 600;
                    vertical-align: middle;
                }
            }
        }
        > .ant-menu {
            padding: 16px 0;
        }
    }
    .trigger {
        font-size: 18px;
        line-height: 64px;
        padding: 0 24px;
        cursor: pointer;
        transition: color 0.3s;
        &:hover {
            color: #1890ff;
        }
    }
    .ant-layout-header {
        box-shadow: 0 2px 8px #f0f1f2;
    }
}
</style>
