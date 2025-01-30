/* eslint-disable */
import {
  createRouter as createVueRouter,
  createMemoryHistory,
  createWebHistory,
} from "vue-router";
import HomePage from "@/pages/HomePage.vue";
import AboutPage from "@/pages/AboutPage.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomePage,
  },
  {
    path: "/about",
    name: "about",
    component: AboutPage,
  },
];

const isServer = typeof window === "undefined";

const createRouter = () =>
  createVueRouter({
    history: isServer
      ? createMemoryHistory()
      : createWebHistory(process.env.BASE_URL),
    routes,
  });

export default createRouter;
