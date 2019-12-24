import Vue from "vue";
import VueRouter from "vue-router";
import LoginLayout from "@views/LoginLayout";
import BasicLayout from "@views/BasicLayout";
import About from "@views/About";
import Login from "@c/Login/Login";
import Register from "@c/Login/Register";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

const routes = [
  { path: "/", redirect: "/login" },
  {
    path: "/login",
    name: "LoginLayout",
    component: LoginLayout,
    children: [
      {
        path: "/login",
        name: "login",
        component: Login
        // component: () => {
        //   import("@c/Login/Login");
        // }
      },
      {
        path: "/register",
        name: "register",
        component: Register
        // component: () => {
        //   import("@c/Login/Register");
        // }
      }
    ]
  },
  {
    path: "/index",
    component: BasicLayout,
    children: [
      {
        path: "/index/about",
        name: "about",
        component: About
      }
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
