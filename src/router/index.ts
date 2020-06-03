import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Layouts from "@/views/layouts/index.vue"

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/404',
    component: () => import('@/views/404.vue'),
  },
  {
    path: "/",
    name: "Home",
    component: Layouts,
    redirect: '/home',
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/Home.vue'),
        meta: { title: 'Home', icon: 'Home' }
      }
    ]
  }
  // {
  //   path: "/about",
  //   name: "About",
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ "../views/About.vue")
  // }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
