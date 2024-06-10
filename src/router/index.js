import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomePage from '@/pages/HomePage.vue'
import SliderPage from '@/pages/SliderPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: [
        {
          path: '',
          name: 'home-page',
          component: HomePage
        },
        {
          path: 'slider-auto',
          name: 'slider-page-auto',
          component: SliderPage
        }
      ]
    }
  ]
})

export default router
