<script setup>
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import _ from 'lodash'
const props = defineProps({
  dataSrc: {
    type: Array,
    default: () => []
  },
  displayItem: {
    type: Number,
    default: 1
  }
})

const resizeObserver = ref(null)
const lengthData = ref(props.dataSrc.length)
const renderData = reactive({ data: [] })
const sliderRef = ref(null)
const containerRef = ref(null)
const containerWrapRef = ref(null)
const containerWidth = ref(0)
const translateX = ref(0)
const transition = ref('all 0.5s')
const currentSlide = ref(0)

const init = () => {
  renderData.data = _.cloneDeep(props.dataSrc)
  if (lengthData.value > 0) {
    renderData.data.push(props.dataSrc[0])
    renderData.data.unshift(props.dataSrc[lengthData.value - 1])
  }
}
init()

const resize = (entries) => {
  containerWidth.value = sliderRef.value.offsetWidth
}

const prevSlide = () => {
  translateX.value = translateX.value + itemWidth.value
  currentSlide.value = currentSlide.value - 1
  if (currentSlide.value == -1) currentSlide.value = lengthData.value - 1
}

const nextSlide = () => {
  translateX.value = translateX.value - itemWidth.value
  currentSlide.value = currentSlide.value + 1
  if (currentSlide.value == lengthData.value) currentSlide.value = 0
}

const handleTransition = () => {
  if (currentSlide.value == lengthData.value - 1 && translateX.value == 0) {
    transition.value = 'none'
    translateX.value = currentSlide.value * itemWidth.value * -1
    setTimeout(() => {
      transition.value = 'all 0.5s'
    })
  }
}

const itemWidth = computed(() => {
  if (sliderRef.value) return Math.round(sliderRef.value.offsetWidth / props.displayItem)
  return 0
})

const styleContainer = computed(() => ({
  width: `${itemWidth.value * props.displayItem}px`
}))

const styleWrap = computed(() => {
  return {
    transform: `translateX(${translateX.value}px)`,
    transition: transition.value,
    width: `${renderData.data.length * itemWidth.value}px`
  }
})

const styleItem = computed(() => ({
  width: `${itemWidth.value}px`
}))

onMounted(() => {
  resizeObserver.value = new ResizeObserver(_.debounce(resize, 150))
  resizeObserver.value.observe(sliderRef.value)
  translateX.value = -itemWidth.value
  containerWrapRef.value.addEventListener('transitionend', handleTransition)
})

onUnmounted(() => {
  resizeObserver.value.disconnect()
})
</script>

<template>
  <div class="slider" ref="sliderRef">
    <div class="slider-container" ref="containerRef" :style="styleContainer">
      <div class="slider-wrap" ref="containerWrapRef" :style="styleWrap">
        <div
          class="slider-item"
          v-for="(item, i) in renderData.data"
          :key="i"
          :style="styleItem"
          :data-index="i + 1"
        >
          <img :src="item.src" />
        </div>
      </div>
    </div>
    <div class="slider-dot">
      <div class="dot" v-for="(item, i) in lengthData" :key="i"></div>
    </div>
    <div class="slider-btn">
      <span class="btn btn-prev" @click="prevSlide">Prev</span>
      <span class="btn btn-next" @click="nextSlide">Next</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  margin: 0 auto;
  width: 40%;
  height: 400px;
  border: 1px solid red;
  position: relative;
  display: flex;
  justify-content: center;
  .slider-btn {
    position: absolute;
    top: calc(100% + 40px);
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    gap: 30px;
    .btn {
      font-size: 1.4rem;
      padding: 10px 20px;
      border-radius: 4px;
      box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.5);
      background: white;
      cursor: pointer;
    }
  }
  .slider-dot {
    position: absolute;
    top: calc(100% + 15px);
    left: 50%;
    transform: translateX(-50%);
    display: inline-flex;
    gap: 10px;
    .dot {
      cursor: pointer;
      width: 16px;
      height: 16px;
      border: 1px solid red;
      border-radius: 50%;
    }
  }
  .slider-container {
    width: 100%;
    height: 100%;
    display: flex;
    // overflow: hidden;
    .slider-wrap {
      height: 100%;
      display: flex;
      .slider-item {
        display: flex;
        height: 100%;
        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }
  }
}
</style>
