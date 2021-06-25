import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store, CloseMenu } from "@/store/index";

import Home from "../views/Home.vue";
import Search from "@/views/Search.vue";
import UpLoad from "@/views/UpLoad.vue";
import Login from "@/views/Login.vue";
import Logout from "@/views/Logout.vue";
import NotFound from "@/views/NotFound.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "",
    },
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
    meta: {
      title: "Search",
    },
  },
  {
    path: "/upload",
    name: "UoLoad",
    component: UpLoad,
    meta: {
      requiresAuth: true,
      title: "Upload",
    },
  },
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      title: "Login",
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: Logout,
    meta: {
      title: "Logout",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    component: NotFound,
    meta: {
      title: "404 Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  store.commit(CloseMenu);
  if (to.meta.requiresAuth && !store.getters.isAuthenticated) {
    return {
      path: "/login",
      query: { redirect: to.fullPath },
    };
  }
});
router.afterEach((to) => {
  const title = to.meta.title || "";
  document.title = `Kitten answers ${title}`;
});

export default router;
