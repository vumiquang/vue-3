<script setup>
import { onMounted, onUnmounted, onUpdated } from 'vue'
const props = defineProps({
  text: {
    type: String,
    default: ''
  }
})
console.log('::Child:: created')

onUpdated(() => {
  console.log('::Child:: updated')
})

onMounted(() => {
  console.log('::Child:: mounted')
})

onUnmounted(() => {
  console.log('::Child:: unmounted')
})
</script>

<template>
  <div class="child">{{ props.text }}</div>
</template>

<style scoped lang="scss">
.child {
  padding: 10px 20px;
  border: 1px solid tomato;
  font-size: 1.4rem;
  width: fit-content;
}
</style>
