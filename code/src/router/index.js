import Vue from "vue";
import VueRouter from "vue-router";
import LoginLayout from "@views/LoginLayout";
import BasicLayout from "@views/BasicLayout";
import About from "@views/About";
import Home from "@views/Home";
import Login from "@c/Login/Login";
import Register from "@c/Login/Register";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 固定的路由表
export const fixedRouter = [
  {
    path: "",
    component: LoginLayout,
    redirect: "/login",
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
      },
      {
        path: "/register",
        name: "register",
        component: Register
      }
    ]
  },
  {
    path: "/index",
    component: BasicLayout
  }
];
// 需要权限判断展示的路由
export const permissionRouter = [
  {
    path: "/index/about",
    name: "about",
    component: About,
    meta: { title: "用户页面", roles: ["user"] }
  },
  {
    path: "/index/home",
    name: "home",
    component: Home,
    meta: { title: "管理员页面", roles: ["admin"] }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: fixedRouter
});

export default router;
