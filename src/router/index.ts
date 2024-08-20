import { createRouter, createWebHistory } from 'vue-router'
import MainContainer from '../views/MainContainer.vue'
import HomeView from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Main',
      component: MainContainer,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomeView
        },
        {
          path: '/search',
          name: 'Search',
          // route level code-splitting
          // this generates a separate chunk (search.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/Search.vue')
        },
        {
          path: '/account',
          name: 'Account',
          // route level code-splitting
          // this generates a separate chunk (account.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/Account.vue')
        },
      ]
    },
    
    {
      path: '/login',
      name: 'Login',
      // route level code-splitting
      // this generates a separate chunk (login.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      // route level code-splitting
      // this generates a separate chunk (register.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Register.vue')
    },
    {
      path: '/change-pwd',
      name: 'ChangePwd',
      // route level code-splitting
      // this generates a separate chunk (changePwd.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChangePwd.vue')
    },
    {
      path: '/deposit-history',
      name: 'DepositHistory',
      // route level code-splitting
      // this generates a separate chunk (depositHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DepositHistory.vue')
    },
    {
      path: '/withdraw-history',
      name: 'WithdrawHistory',
      // route level code-splitting
      // this generates a separate chunk (withdrawHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WithdrawHistory.vue')
    },
    {
      path: '/game-history',
      name: 'GameHistory',
      // route level code-splitting
      // this generates a separate chunk (gameHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GameHistory.vue')
    },
    {
      path: '/session/:id',
      name: 'SessionDetail',
      // route level code-splitting
      // this generates a separate chunk (sessionDetail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SessionDetail.vue')
    },
    {
      path: '/session-square',
      name: 'SessionSquare',
      // route level code-splitting
      // this generates a separate chunk (sessionSquare.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SessionSquare.vue')
    },
  ]
})

export default router
