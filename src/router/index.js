import {
  createRouter,
  createWebHistory
} from 'vue-router'

import Top from "@/views/Top.vue"
import Specialists from "@/views/Specialists.vue"
import Specialist from "@/views/Specialist.vue"
import PaymentComplete from "@/views/PaymentComplete.vue"


const routes = [{
    path: '/',
    name: 'Top',
    component: Top
  },
  {
    path: '/payment/complete',
    name: 'PaymentComplete',
    component: PaymentComplete
  },
  {
    path: '/specialist',
    name: 'Specialists',
    component: Specialists
  },
  {
    path: '/specialist/:id',
    name: 'Specialist',
    component: Specialist
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router