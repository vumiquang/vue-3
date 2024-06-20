import './assets/css/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.directive('ClickOutside', {
  mounted(el, binding) {
    const isFunction = typeof binding.value === 'function'
    if (!isFunction)
      throw new Error(
        `v-click-outside: Binding value should be function, ${binding.value} is not function`
      )
    el.clickOutsideFunc = function (e) {
      const isVisible = !!el && !!(el.offsetWidth || el.offsetHeight || el.getClientRects().length)
      if (!isVisible) return
      const path = (e.composedPath && e.composedPath()) || e.path
      const isClickOutside = path ? path.indexOf(el) < 0 : !el.contains(e.target)
      if (!isClickOutside) return

      binding.value(e)
    }
    window.addEventListener('click', el.clickOutsideFunc)
  },

  unmounted(el) {
    window.removeEventListener('click', el.clickOutsideFunc)
  }
})
app.mount('#app')
