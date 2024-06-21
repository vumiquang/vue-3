import HomePage from '@/pages/HomePage.vue'
import DirectiveCustomPage from '@/pages/DirectiveCustomPage.vue'
import SliderPage from '@/pages/SliderPage.vue'
import MouseHoverPage from '@/pages/MouseHoverPage.vue'
import KeepAlivePage from '@/pages/KeepAlivePage.vue'
import TransitionPage from '@/pages/TransitionPage.vue'

export const pageConfig = [
  {
    text: 'Home',
    path: '',
    component: HomePage
  },
  {
    text: 'Vue Core',
    path: 'vue-core',
    dropdown: [
      {
        text: 'Custom directive',
        path: 'custom-directive',
        component: DirectiveCustomPage
      },
      {
        text: 'Transition',
        path: 'transition',
        component: TransitionPage
      },
      {
        text: 'KeepAlive',
        path: 'keep-alive',
        component: KeepAlivePage
      }
    ]
  },
  {
    text: 'Components',
    path: 'components',
    dropdown: [
      {
        text: 'Custom directive',
        path: 'slider',
        component: SliderPage
      }
    ]
  },
  {
    text: 'Mouse',
    path: 'mouse',
    dropdown: [
      {
        text: 'Mouse zoom hover',
        path: 'mouse-zoom-hover',
        component: MouseHoverPage
      }
    ]
  }
]
