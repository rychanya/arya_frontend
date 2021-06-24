import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Home.vue";
import Search from "@/views/Search.vue";
import UpLoad from "@/views/UpLoad.vue";
import Login from "@/views/Login.vue";
import { store, CloseMenu } from "@/store/index";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/search",
    name: "Search",
    component: Search,
  },
  {
    path: "/upload",
    name: "UoLoad",
    component: UpLoad,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to) => {
  store.commit(CloseMenu);
});

export default router;
