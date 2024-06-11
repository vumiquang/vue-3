<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  dataSrc: {
    type: Array,
    default: () => []
  },
  gap: {
    type: Number,
    default: 30
  },
  mode: {
    type: String,
    default: 'number',
    validator: (value) => ['number', 'gap'].includes(value)
  },
  time: {
    type: Number,
    default: 10
  },
  direction: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right'].includes(value)
  },
  initPosition: {
    type: String,
    default: 'left',
    validator: (value) => ['left', 'right', 'center'].includes(value)
  }
})

const total = computed(() => props.dataSrc.length)
const sliderRef = ref(null)
const wrapItemRef = ref(null)
const widthSlider = ref(0)
const widthWrapItem = ref(0)

const resize = () => {
  widthSlider.value = sliderRef.value?.offsetWidth ?? 0
  widthWrapItem.value = wrapItemRef.value?.offsetWidth ?? 0
}

const style = computed(() => {
  return {
    '--width-wrap': `${widthWrapItem.value}px`,
    '--width-slider': `${widthSlider.value}px`,
    '--time': `${props.time}s`,
    '--first-wrap-delay': `0s`,
    '--last-wrap-delay': `${props.time}s`,
    '--gap': `${props.gap}px`
  }
})

onMounted(async () => {
  await nextTick()
  console.log('wrapItemRef.value?.offsetWidth', wrapItemRef.value?.offsetWidth)
  resize()
  window.addEventListener('resize', resize)
})
onUnmounted(() => {
  window.removeEventListener('resize', resize)
})
</script>

<template>
  <div class="slider" ref="sliderRef" :style="style">
    <div class="slider-wrap" v-if="!!total" ref="wrapItemRef">
      <div class="slider-item" v-for="(item, i) in props.dataSrc" :key="i">
        <img :src="item.src" />
      </div>
    </div>
    <div class="slider-wrap" v-if="!!total">
      <div class="slider-item" v-for="(item, i) in props.dataSrc" :key="i">
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  width: 100%;
  height: 40px;
  border: 1px solid red;
  display: flex;
  gap: var(--gap);
  position: relative;
  .slider-wrap {
    height: 40px;
    position: absolute;
    display: flex;
    gap: var(--gap);
    left: 100%;
    animation: slide var(--time) linear infinite;
    &:first-child {
      animation-delay: var(--first-wrap-delay);
    }
    &:last-child {
      animation-delay: var(--last-wrap-delay);
    }
    .slider-item {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: auto;
        height: 100%;
      }
    }
  }
  @keyframes slide {
    from {
      left: 100%;
    }
    to {
      left: var(--width-wrap);
    }
  }
}
</style>
