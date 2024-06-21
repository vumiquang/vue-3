<script setup>
import { ref } from 'vue'
const count = ref(0)

import { onActivated, onDeactivated } from 'vue'

onActivated(() => {
  console.log('-> onActivated B')
})

onDeactivated(() => {
  console.log('-> onDeactivated B')
})
</script>

<template>
  <div>Count: {{ count }} <button @click="count += 1">Add</button></div>
</template>

<style scoped lang="scss"></style>
