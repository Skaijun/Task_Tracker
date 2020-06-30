import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "createtask",
    component: () => import("../views/CreateTask"),
  },
  {
    path: "/tasks",
    name: "tasks",
    component: () => import("../views/Tasks.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
