import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (Login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (Register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: '/search',
      name: 'Search',
      // route level code-splitting
      // this generates a separate chunk (Search.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Search.vue')
    },
    {
      path: '/account',
      name: 'Account',
      // route level code-splitting
      // this generates a separate chunk (Account.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Account.vue')
    },
  ]
})

export default router
