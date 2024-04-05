import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  { path: '/login', component: () => import('@/views/login') },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/views/layout'),
    children: [
      { path: 'article', component: () => import('@/views/article') },
      { path: 'dashboard', component: () => import('@/views/dashboard') }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
