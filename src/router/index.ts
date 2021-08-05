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
import NavBar from "@/views/NavBar.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    components: {
      default: Home,
      navbar: NavBar,
    },
    meta: {
      title: "",
    },
  },
  {
    path: "/search",
    name: "Search",
    components: {
      default: Search,
      navbar: NavBar,
    },
    meta: {
      title: "Search",
    },
  },
  {
    path: "/upload/:id",
    name: "UpLoadDetail",
    components: {
      default: UploadDetail,
      navbar: NavBar,
    },
    meta: {
      requiresAuth: true,
      title: "Upload Detail",
    },
  },
  {
    path: "/qa/:id",
    name: "QADetail",
    components: {
      default: QADetail,
      navbar: NavBar,
    },
    meta: {
      requiresAuth: true,
      title: "QA Detail",
    },
  },
  {
    path: "/qa/inc/:id",
    name: "QAINCDetail",
    components: {
      default: QAINCDetail,
      navbar: NavBar,
    },
    meta: {
      requiresAuth: true,
      title: "QA INC Detail",
    },
  },
  {
    path: "/upload",
    name: "UpLoad",
    components: {
      default: UpLoad,
      navbar: NavBar,
    },
    meta: {
      requiresAuth: true,
      title: "Upload",
    },
  },
  {
    path: "/login",
    name: "login",
    components: {
      default: Login,
      navbar: NavBar,
    },
    meta: {
      title: "Login",
    },
  },
  {
    path: "/signin",
    name: "signin",
    components: {
      default: SignIn,
      navbar: NavBar,
    },
    meta: {
      title: "Signin",
    },
  },
  {
    path: "/:pathMatch(.*)",
    name: "not-found",
    components: {
      default: NotFound,
      navbar: NavBar,
    },
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
