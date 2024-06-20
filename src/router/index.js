import { createRouter, createWebHistory } from 'vue-router'
import { defineAsyncComponent } from 'vue'

import HomeView from '@/views/HomeView.vue'

import { pageConfig } from '@/configs/page-config'

const RouterRender = pageConfig.reduce((acc, currentItem) => {
  if (currentItem.hasOwnProperty('component'))
    return [...acc, { path: currentItem.path, component: currentItem.component }]
  if (currentItem.hasOwnProperty('dropdown')) {
    const parentPath = currentItem.path
    const childrenRoute = currentItem.dropdown.map((item) => ({
      path: `${parentPath}/${item.path}`,
      component: item.component
    }))
    return [...acc, ...childrenRoute]
  }
  return acc
}, [])

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      children: RouterRender
    }
  ]
})

export default router
