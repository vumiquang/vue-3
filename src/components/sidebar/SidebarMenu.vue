<script setup>
import MenuItem from './MenuItem.vue'
import { faHome } from '@fortawesome/free-solid-svg-icons'

import { reactive } from 'vue'

const menu = reactive([
  {
    text: 'Home',
    icon: faHome,
    link: '/'
  },
  {
    text: 'Slider',
    icon: faHome,
    dropdown: [
      {
        text: 'Auto slider',
        icon: faHome,
        link: '/slider-auto'
      }
    ]
  }
])
</script>

<template>
  <div>
    <MenuItem v-for="item in menu" :key="item.text" :item="item" />
  </div>
</template>

<style scoped></style>
