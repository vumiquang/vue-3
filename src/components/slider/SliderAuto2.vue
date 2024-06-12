<script setup>
import { computed } from 'vue'

const props = defineProps({
  dataSrc: {
    type: Array,
    default: () => []
  },
  time: {
    type: Number,
    default: 10
  }
})

const duplicate = (arr, n) => {
  const array = []
  for (let i = 0; i < n; i++) {
    array.push(...arr)
  }
  return array
}

const time = computed(() => `${props.time}s`)
const data = computed(() => {
  if (props.dataSrc.length > 0 && props.dataSrc.length < 10) {
    const numberDuplicate = Math.ceil(10 / props.dataSrc.length)
    return duplicate(props.dataSrc, numberDuplicate)
  }
  return props.dataSrc
})
</script>

<template>
  <div class="slider" :style="`--time: ${time}`">
    <div class="slider-wrap">
      <div class="slider-item" v-for="(item, i) in data" :key="i">
        <img :src="item.src" />
      </div>
    </div>
    <div class="slider-wrap">
      <div class="slider-item" v-for="(item, i) in data" :key="i">
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  width: 100%;
  -webkit-mask-image: linear-gradient(90deg, transparent, #fff 20%, #fff 80%, transparent);
  display: flex;
  overflow: hidden;
  &:hover .slider-wrap {
    animation-play-state: paused !important;
  }
  .slider-wrap {
    display: inline-flex;
    white-space: nowrap;
    .slider-item {
      margin: 0 10px;
      padding: 10px 20px;
      img {
        height: 60px;
        width: auto;
      }
    }
  }
  .slider-wrap:first-child {
    animation: slider1 var(--time) linear infinite;
    animation-delay: calc(var(--time) * -1);
  }
  .slider-wrap:last-child {
    animation: slider2 var(--time) linear infinite;
    animation-delay: calc(var(--time) / -2);
  }
  @keyframes slider1 {
    from {
      transform: translateX(-100%);
    }
    to {
      transform: translateX(100%);
    }
  }
  @keyframes slider2 {
    from {
      transform: translateX(-200%);
    }
    to {
      transform: translateX(0);
    }
  }
}
</style>
