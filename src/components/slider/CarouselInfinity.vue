<script setup>
import { ref, reactive, onMounted, onUnmounted, computed, nextTick } from 'vue'
import _ from 'lodash'
const props = defineProps({
  dataSrc: {
    type: Array,
    default: () => []
  },
  displayItem: {
    type: Number,
    default: 1
  },
  gap: {
    type: Number,
    default: 30
  },
  autoPlay: {
    type: Boolean,
    default: true
  },
  autoPlayTime: {
    type: Number,
    default: 3000
  },
  pauseOnHover: {
    type: Boolean,
    default: false
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
const transition = ref('none')
const currentSlide = ref(0)
const isNextSlide = ref(true)
const isPrevSlide = ref(true)
const isGoToSlide = ref(true)
const isDragging = ref(false)
const dragStart = ref(0)
const dragEnd = ref(0)
const oldTranSlateX = ref(0)
const timeInterval = ref(null)

const init = () => {
  renderData.data = _.cloneDeep(props.dataSrc)
  if (lengthData.value > 0) {
    renderData.data.push(props.dataSrc[0])
    renderData.data.unshift(props.dataSrc[lengthData.value - 1])
  }
}
init()

const resize = async () => {
  handleResizeSlide()
}

const handleResizeSlide = _.debounce(async () => {
  containerWidth.value = sliderRef.value.offsetWidth
  await nextTick()
  goToSlide(currentSlide.value + 1)
}, 100)

const goToSlide = (index) => {
  translateX.value = index * itemWidth.value * -1
}

const dotGoToSlide = (i) => {
  if (!isGoToSlide.value) return
  transition.value = 'all 0.1s'
  goToSlide(i + 1)
  currentSlide.value = i
  isGoToSlide.value = false
  setTimeout(() => {
    isGoToSlide.value = true
  }, 300)
}

const prevSlide = (isDrag = false) => {
  if (!isPrevSlide.value) return
  transition.value = 'all 0.1s'
  translateX.value = isDrag
    ? oldTranSlateX.value + itemWidth.value
    : translateX.value + itemWidth.value
  currentSlide.value = currentSlide.value - 1
  if (currentSlide.value == -1) currentSlide.value = lengthData.value - 1
  isPrevSlide.value = false
  setTimeout(() => {
    isPrevSlide.value = true
  }, 300)
  autoPlay()
}

const nextSlide = (isDrag = false) => {
  if (!isNextSlide.value) return
  transition.value = 'all 0.1s'
  translateX.value = isDrag
    ? oldTranSlateX.value - itemWidth.value
    : translateX.value - itemWidth.value
  currentSlide.value = currentSlide.value + 1
  if (currentSlide.value == lengthData.value) currentSlide.value = 0
  isNextSlide.value = false
  setTimeout(() => {
    isNextSlide.value = true
  }, 300)
  autoPlay()
}

const handleTransition = () => {
  if (currentSlide.value == lengthData.value - 1 && translateX.value == 0) {
    translateX.value = (currentSlide.value + 1) * itemWidth.value * -1
  }
  if (currentSlide.value == 0 && translateX.value != -itemWidth.value) {
    translateX.value = -itemWidth.value
  }
  transition.value = 'none'
}

const isActiveDot = (i) => {
  return i == currentSlide.value ? 'active' : ''
}

const itemWidth = computed(() => {
  if (sliderRef.value)
    return Math.round(sliderRef.value.offsetWidth / props.displayItem) + props.gap
  return 0
})

const styleContainer = computed(() => ({
  width: `${itemWidth.value * props.displayItem}px`
}))

const styleWrap = computed(() => {
  return {
    transform: `translate3D(${translateX.value}px,0,0)`,
    transition: transition.value,
    width: `${renderData.data.length * itemWidth.value}px`
  }
})

const styleItem = computed(() => ({
  width: `${itemWidth.value}px`,
  marginRight: `${props.gap}px`
}))

const handleMouseDown = (e) => {
  e.preventDefault()
  if (timeInterval.value) clearInterval(timeInterval.value)
  oldTranSlateX.value = (currentSlide.value + 1) * itemWidth.value * -1
  isDragging.value = true
  dragStart.value = e.clientX
}

const handleMouseMove = (e) => {
  e.preventDefault()
  if (isDragging.value) {
    dragEnd.value = e.clientX
    const distance = dragEnd.value - dragStart.value
    translateX.value = oldTranSlateX.value + distance
  }
}

const handleMouseUp = (e) => {
  e.preventDefault()
  handleChangeMoveSlider()
}

const handleMouseLeave = (e) => {
  e.preventDefault()
  handleChangeMoveSlider()
}

const handleChangeMoveSlider = () => {
  if (isDragging.value) {
    isDragging.value = false
    const distance = dragEnd.value - dragStart.value
    if (Math.abs(distance) >= containerWidth.value / 3) {
      if (distance > 0) {
        prevSlide(true)
      } else {
        nextSlide(true)
      }
    } else {
      transition.value = 'all 0.1s'
      translateX.value = oldTranSlateX.value
    }
    autoPlay()
  }
}

const autoPlay = () => {
  if (!props.autoPlay) return
  if (timeInterval.value) clearInterval(timeInterval.value)
  timeInterval.value = setInterval(() => {
    nextSlide(false)
  }, props.autoPlayTime)
}

const onMouseOverSlider = () => {
  if (timeInterval.value && props.pauseOnHover) clearInterval(timeInterval.value)
}

const onMouseLeaveSlider = () => {
  autoPlay()
}

onMounted(async () => {
  window.addEventListener('resize', handleResizeSlide)
  resizeObserver.value = new ResizeObserver(resize)
  resizeObserver.value.observe(sliderRef.value)
  translateX.value = -itemWidth.value
  containerWrapRef.value.addEventListener('transitionend', handleTransition)
  await nextTick()
  autoPlay()
})

onUnmounted(() => {
  resizeObserver.value.disconnect()
  window.removeEventListener('resize', handleResizeSlide)
})
</script>

<template>
  <div
    class="slider"
    ref="sliderRef"
    @mouseover="onMouseOverSlider"
    @mouseleave="onMouseLeaveSlider"
  >
    <div
      class="slider-container"
      ref="containerRef"
      :style="styleContainer"
      draggable
      @mousedown="handleMouseDown"
      @mouseup="handleMouseUp"
      @mousemove="handleMouseMove"
      @mouseleave="handleMouseLeave"
    >
      <div class="slider-wrap" ref="containerWrapRef" :style="styleWrap">
        <div
          v-for="(item, i) in renderData.data"
          :key="i"
          :style="styleItem"
          :data-index="i + 1"
          class="slider-item"
        >
          <slot :item="item"> </slot>
        </div>
      </div>
    </div>
    <div class="slider-dot">
      <div
        class="dot"
        v-for="(item, i) in lengthData"
        :key="i"
        :class="isActiveDot(i)"
        @click="dotGoToSlide(i)"
      ></div>
    </div>
    <div class="slider-btn">
      <span class="btn btn-prev" @click="prevSlide(false)">Prev</span>
      <span class="btn btn-next" @click="nextSlide(false)">Next</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: center;
  user-select: none;

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
      &.active {
        background: tomato;
      }
    }
  }
  .slider-container {
    width: 100%;
    display: flex;
    overflow: hidden;
    .slider-wrap {
      display: flex;
      -webkit-tap-highlight-color: transparent;
      touch-action: pan-y;
      .slider-item {
        width: 100%;
        overflow: hidden;
      }
    }
  }
}
</style>
