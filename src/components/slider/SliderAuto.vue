<script setup>
import { computed } from 'vue'

const props = defineProps({
  dataSrc: {
    type: Array,
    default: () => []
  },
  time: {
    type: Number,
    default: 20
  }
})

const time = computed(() => `${props.time}s`)
const timePerItem = computed(() => {
  if (!props.dataSrc.length) return `${props.time}s`
  return `${props.time / props.dataSrc.length}s`
})
</script>

<template>
  <div
    class="slider"
    :style="`--time: ${time}; --time-item: ${timePerItem}; --count: ${props.dataSrc.length}`"
  >
    <div
      class="slider-item"
      v-for="(item, i) in props.dataSrc"
      :key="i"
      :style="`--index:${props.dataSrc.length - i};`"
    >
      <img :src="item.src" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  width: 100%;
  height: 40px;
  position: relative;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
  &:hover .slider-item {
    animation-play-state: paused !important;
  }
  .slider-item {
    position: absolute;
    top: 0;
    left: max(calc(20% * var(--count)), 100%);
    height: 100%;
    width: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    animation: slide var(--time) linear infinite;
    animation-delay: calc(var(--time-item) * var(--index) * -1);
    img {
      object-fit: contain;
      width: 100%;
      height: 100%;
    }
  }
  @keyframes slide {
    to {
      left: -20%;
    }
  }
}
</style>
