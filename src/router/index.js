import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SigninView from '../views/SigninView.vue'

// import DashboardView from '../views/DashboardView.vue'
import SignupView from '../views/SignupView.vue'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/signin',
    name: 'signin',
    component: SigninView,
  },
  {
    path: '/signup',
    name: 'signup',
    component: SignupView,
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('@/views/dashboard/Dashboard.vue'),
    // eslint-disable-next-line consistent-return
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name: 'pages-login',
        })
      }
      next()
    },
  },
  {
    path: '/typography',
    name: 'typography',
    component: () => import('@/views/typography/Typography.vue'),
  },
  {
    path: '/icons',
    name: 'icons',
    component: () => import('@/views/icons/Icons.vue'),
  },
  {
    path: '/cards',
    name: 'cards',
    component: () => import('@/views/cards/Card.vue'),
  },
  {
    path: '/simple-table',
    name: 'simple-table',
    component: () => import('@/views/simple-table/SimpleTable.vue'),
  },
  {
    path: '/form-layouts',
    name: 'form-layouts',
    component: () => import('@/views/form-layouts/FormLayouts.vue'),
  },
  {
    path: '/pages/account-settings',
    name: 'pages-account-settings',
    component: () => import('@/views/pages/account-settings/AccountSettings.vue'),
  },
  {
    path: '/pages/category',
    name: 'pages-category',
    component: () => import('@/views/pages/Category.vue'),
  },
  {
    path: '/pages/product',
    name: 'pages-product',
    component: () => import('@/views/pages/Product.vue'),
  },
  {
    path: '/pages/pos',
    name: 'pages-pos',
    component: () => import('@/views/pages/POS.vue'),
  },
  {
    path: '/pages/transaction',
    name: 'pages-transaction',
    component: () => import('@/views/pages/Transaction.vue'),
  },
  {
    path: '/pages/revenue',
    name: 'pages-revenue',
    component: () => import('@/views/pages/Revenue.vue'),
  },
  {
    path: '/pages/login',
    name: 'pages-login',
    component: () => import('@/views/pages/Login.vue'),
    meta: {
      layout: 'blank',
    },
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'dashboard',
        })
      }
      next()
    },
  },
  {
    path: '/pages/register',
    name: 'pages-register',
    component: () => import('@/views/pages/Register.vue'),
    meta: {
      layout: 'blank',
    },
    // eslint-disable-next-line consistent-return
    beforeEnter(to, from, next) {
      if (store.getters['auth/authenticated']) {
        return next({
          name: 'dashboard',
        })
      }
      next()
    },
  },
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/Error.vue'),
    meta: {
      layout: 'blank',
    },
  },
  {
    path: '*',
    redirect: 'error-404',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
