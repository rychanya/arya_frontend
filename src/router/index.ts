import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { store, CloseMenu } from "@/store/index";

import Home from "../views/Home.vue";
import Search from "@/views/Search.vue";
import UpLoad from "@/views/UpLoad.vue";
import Login from "@/views/Login.vue";
import NotFound from "@/views/NotFound.vue";
import SignIn from "@/views/SignIn.vue";
import UploadDetail from "@/views/UploadDetail.vue";
import QADetail from "@/views/QADetail.vue";
import QAINCDetail from "@/views/QAINCDetail.vue";

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
    path: "/upload/:id",
    name: "UpLoadDetail",
    component: UploadDetail,
    meta: {
      requiresAuth: true,
      title: "Upload Detail",
    },
  },
  {
    path: "/qa/:id",
    name: "QADetail",
    component: QADetail,
    meta: {
      requiresAuth: true,
      title: "QA Detail",
    },
  },
  {
    path: "/qa/inc/:id",
    name: "QAINCDetail",
    component: QAINCDetail,
    meta: {
      requiresAuth: true,
      title: "QA INC Detail",
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
    path: "/signin",
    name: "signin",
    component: SignIn,
    meta: {
      title: "Signin",
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
