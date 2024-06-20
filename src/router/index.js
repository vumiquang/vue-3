import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import HomePage from '@/pages/HomePage.vue'
import SliderPage from '@/pages/SliderPage.vue'
import MouseHoverPage from '@/pages/MouseHoverPage.vue'
import DirectiveCustomPage from '@/pages/DirectiveCustomPage.vue'

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
        },
        {
          path: 'mouse-hover',
          name: 'mouse-hover-page',
          component: MouseHoverPage
        },
        {
          path: 'directive-custom',
          name: 'directive-custom',
          component: DirectiveCustomPage
        }
      ]
    }
  ]
})

export default router
