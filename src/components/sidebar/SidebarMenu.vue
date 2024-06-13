<script setup>
import MenuItem from './MenuItem.vue'
import { faHome } from '@fortawesome/free-solid-svg-icons'
const emit = defineEmits(['onChangePage'])
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
  },
  {
    text: 'Mouse Effect',
    icon: faHome,
    dropdown: [
      {
        text: 'Mouse hover',
        icon: faHome,
        link: '/mouse-hover'
      }
    ]
  }
])
</script>

<template>
  <div>
    <MenuItem
      v-for="item in menu"
      :key="item.text"
      :item="item"
      @onChangePage="emit('onChangePage')"
    />
  </div>
</template>

<style scoped></style>
