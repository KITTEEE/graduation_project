import Vue from "vue";
import VueRouter from "vue-router";
import LoginLayout from "@c/Login/LoginLayout";
import Login from "@c/Login/Login";
import Register from "@c/Login/Register";
// import Home from "../views/Home.vue";

Vue.use(VueRouter);

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
