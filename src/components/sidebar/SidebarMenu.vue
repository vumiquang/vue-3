<script setup>
import MenuItem from './MenuItem.vue'
const emit = defineEmits(['onChangePage'])
import { ref } from 'vue'
import { pageConfig } from '@/configs/page-config'

const menu = ref(pageConfig)
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
