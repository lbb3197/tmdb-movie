import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Popular from "../views/Popular.vue";
import Top from "../views/Top.vue";
import MovieDetail from "../views/MovieDetail.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/popular", component: Popular },
  { path: "/top", component: Top },
  { path: "/movie/:id", component: MovieDetail, name: "MovieDetail" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
