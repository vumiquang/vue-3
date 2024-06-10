<script setup>
import SectionComponent from '@/components/section/SectionComponent.vue'
import SliderAuto from '@/components/slider/SliderAuto.vue'
import { logoImage } from '@/constant'
import { reactive } from 'vue'

const dataSrcImage = reactive([
  {
    src: logoImage.img1
  },
  {
    src: logoImage.img2
  },
  {
    src: logoImage.img3
  },
  {
    src: logoImage.img4
  },
  {
    src: logoImage.img5
  },
  {
    src: logoImage.img6
  },
  {
    src: logoImage.img7
  },
  {
    src: logoImage.img8
  },
  {
    src: logoImage.img9
  },
  {
    src: logoImage.img10
  }
])
</script>

<template>
  <div class="container">
    <SectionComponent title="Auto slider">
      <SliderAuto :dataSrc="dataSrcImage" />
    </SectionComponent>
  </div>
</template>

<style scoped lang="scss">
.slider-page {
  padding-top: 50px;
}
</style>
