import { createRouter, createWebHistory } from 'vue-router'
import MainContainer from '../views/MainContainer.vue'
import HomeView from '../views/Home.vue'
import storage from '@/utils/storage';

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
          meta: {auth: true},
          // route level code-splitting
          // this generates a separate chunk (account.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import('../views/Account.vue')
        },
      ]
    },
    {
      path: '/freespin',
      name: 'Freespin',
      // route level code-splitting
      // this generates a separate chunk (freespin.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Freespin.vue')
    },
    {
      path: '/freespin/:type',
      name: 'FreespinDetail',
      // route level code-splitting
      // this generates a separate chunk (freespinDetail.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/FreespinDetail.vue')
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
      meta: {auth: true},
      // route level code-splitting
      // this generates a separate chunk (changePwd.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChangePwd.vue')
    },
    {
      path: '/deposit-history',
      name: 'DepositHistory',
      meta: {auth: true},
      // route level code-splitting
      // this generates a separate chunk (depositHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/DepositHistory.vue')
    },
    {
      path: '/withdraw-history',
      name: 'WithdrawHistory',
      meta: {auth: true},
      // route level code-splitting
      // this generates a separate chunk (withdrawHistory.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/WithdrawHistory.vue')
    },
    {
      path: '/game-history',
      name: 'GameHistory',
      meta: {auth: true},
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
      path: '/square',
      name: 'SessionSquare',
      // route level code-splitting
      // this generates a separate chunk (sessionSquare.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/SessionSquare.vue')
    },
    {
      path: '/withdraw',
      name: 'Withdraw',
      meta: {auth: true},
      // route level code-splitting
      // this generates a separate chunk (withdraw.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Withdraw.vue')
    },
    {
      path: '/deposit',
      name: 'Deposit',
      meta: {auth: true},
      // route level code-splitting
      // this generates a separate chunk (deposit.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/Deposit.vue')
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if(savedPosition) {      
      return savedPosition
    } else {
      return { left: 0, top: 0 }
    }
  }
})

router.beforeEach((to, from, next) => {
  const token = storage.getItem('token');

  if (token && (to.path === '/login' || to.path === '/register')) {
    next({ path: '/' });
  } else if (to.meta.auth) {
    if (token) {
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    }
  } else {
    next();
  }
});

export default router
