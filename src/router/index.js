import { createRouter, createWebHistory } from "vue-router";

import Top from "@/views/Top.vue";
import Specialists from "@/views/Specialists.vue";
import Specialist from "@/views/Specialist.vue";
import PaymentComplete from "@/views/PaymentComplete.vue";
import Login from "@/views/Login.vue";
import Smypage from "@/views/Smypage.vue"

import Store from "@/store/index.js";

const routes = [
  {
    path: "/login",
    name: "login",
    component: Login,
    meta: {
      isPublic: true,
    },
  },
  {
    path: "/",
    name: "Top",
    component: Top,
  },
  {
    path: "/payment/complete",
    name: "PaymentComplete",
    component: PaymentComplete,
  },
  {
    path: "/specialist",
    name: "Specialists",
    component: Specialists,
  },
  {
    path: "/specialist/:id",
    name: "Specialist",
    component: Specialist,
  },
  {
    path: "/mypage/:id/specialist",
    name: "Smypage",
    component: Smypage,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((page) => page.meta.isPublic) || Store.state.auth.token) {
    next();
  } else {
    next("/login");
  }
});

export default router;
