
import { createRouter, createWebHistory } from 'vue-router'

import DashboardHome from '../pages/DashboardHome.vue'
import HomePage from '../pages/HomePage.vue'
import MonitoringPage from '../pages/MonitoringPage.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardHome,
    },
    {
      path: '/products',
      name: 'products',
      component: HomePage,
    },
    {
      path: '/monitoring',
      name: 'monitoring',
      component: MonitoringPage,
    },
  ],
})

export default router
