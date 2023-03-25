import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import LoginView from "../views/LoginView.vue"
import Register from "../views/RegisterView.vue"
import MissingView from "../views/MissingView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: LoginView,
    },
    {
      path: "/register",
      name: "register",
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: Register,
    },
    {
      path: "/foods/notFound-foods",
      name: "notFound-Foods",
      component: MissingView,
    },
    {
      path: "/foods/:id",
      name: "foodDetail",
      component: () => import("../components/FoodDetail.vue"),
    },
    {
      path: "/bookmarks",
      name: "bookmarkList",
      component: () => import("../components/Bookmark.vue"),
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notFound",
      component: MissingView,
    },
  ],
})

router.beforeEach(function (to, from, next) {
  const isAuthenticated = localStorage.getItem("access_token")
  if (to.name === "bookmarkList" && !isAuthenticated) next({ name: "login" })
  if ((to.name === "register" || to.name === "login") && isAuthenticated)
    next({ name: "home" })
  else next()
})

export default router
