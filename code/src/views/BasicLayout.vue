<template>
  <a-layout id="components-layout-demo-custom-trigger">
    <a-layout-sider :trigger="null"
                    collapsible
                    v-model="collapsed"
                    width="256px">
      <div class="logo">
        <a href="">
          <img src="~@/assets/logo.svg?inline"
               alt="" />
          <h1 v-if="!collapsed">Easy Paper</h1>
        </a>
      </div>
      <a-menu :defaultSelectedKeys="['1']"
              mode="inline"
              theme="dark"
              :inlineCollapsed="collapsed">
        <sideMenus :routes="getRoutes"></sideMenus>
        <!-- <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="mail" />
            <span>投稿中心</span>
          </span>
          <a-menu-item key="5" @click="$router.push({ path: '/index/about' })"
            >投递稿件</a-menu-item
          >
          <a-menu-item key="6">草稿箱</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="appstore" />
            <span>稿件中心</span>
          </span>
          <a-menu-item key="9">我的稿件</a-menu-item>
          <a-menu-item key="10">Option 10</a-menu-item>
          <a-sub-menu key="sub3" title="Submenu">
            <a-menu-item key="11">Option 11</a-menu-item>
            <a-menu-item key="12">Option 12</a-menu-item>
          </a-sub-menu>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="mail" />
            <span>个人中心</span>
          </span>
          <a-menu-item key="13" @click="$router.push({ path: '/index/about' })"
            >个人信息</a-menu-item
          >
          <a-menu-item key="14">安全中心</a-menu-item>
          <a-menu-item key="15">设置</a-menu-item>
        </a-sub-menu> -->
      </a-menu>
    </a-layout-sider>
    <a-layout>
      <a-layout-header style="background: #fff; padding: 0">
        <a-icon class="trigger"
                :type="collapsed ? 'menu-unfold' : 'menu-fold'"
                @click="() => (collapsed = !collapsed)" />
      </a-layout-header>
      <a-layout-content :style="{
          margin: '16px 16px',
          padding: '24px',
          background: '#fff',
          minHeight: '280px'
        }">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { mixin, mixinDevice } from "@/utils/mixin";
import sideMenus from "@c/sideMenus";
import { permissionRouter } from "@/router/index";
export default {
  mixins: [mixin, mixinDevice],
  components: {
    sideMenus
  },
  data () {
    return {
      collapsed: false
    };
  },
  computed: {
    getRoutes () {
      return global.antRouter;
    }
  },
  created () {
    // console.log(permissionRouter);
  }
  // watch: {
  //   sidebarOpened (val) {
  //     this.collapsed = !val;
  //   }
  // }
};
</script>
<style lang="less" scoped>
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
          height: 36px;
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
