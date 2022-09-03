import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: "/",
      name: 'Home',
      component: () => import("@/views/Home.vue"),
      meta: {
        title: '學青選課囉~'
      }
    },
    {
      path: "/admin",
      name: 'Admin',
      component: () => import("@/views/Admin.vue"),
      meta: {
        title: 'Admin'
      }
    }
  ],
})

export default router
