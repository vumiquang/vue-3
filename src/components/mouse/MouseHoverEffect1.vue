<script setup>
import { onMounted, onUnmounted, ref } from 'vue'

const top = ref(0)
const left = ref(0)
const showCursor = ref(false)

const handleMouseMove = (e) => {
  e.preventDefault()
  const { clientX: x, clientY: y } = e
  left.value = x
  top.value = y
}

const handleMouseOut = (e) => {
  console.log('==leave aa')
  showCursor.value = false
}
const handleMouseEnter = (e) => {
  e.preventDefault()
  showCursor.value = true
}
</script>

<template>
  <div
    class="mouse-wrap"
    @mousemove="handleMouseMove"
    @mouseout="handleMouseOut"
    @mouseenter="handleMouseEnter"
  >
    <slot></slot>
    <Teleport to="#body">
      <div class="mouse-effect-1" :style="`left: ${left}px; top: ${top}px`" v-if="showCursor"></div>
    </Teleport>
  </div>
</template>

<style scoped lang="scss">
.mouse-effect-1 {
  z-index: 1;
  position: fixed;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: rgb(19, 203, 253);
  transform: translate(-50%, -50%);
}
</style>
