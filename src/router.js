import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "",
      name: "home",
      component: () => import("@/views/Home.vue")
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/Cart.vue"),
    }
  ],
});


export default router;
