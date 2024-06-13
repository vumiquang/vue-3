<script setup>
import SectionComponent from '@/components/section/SectionComponent.vue'
import SliderAuto from '@/components/slider/SliderAuto.vue'
import SliderAuto2 from '@/components/slider/SliderAuto2.vue'
import CarouselInfinity from '@/components/slider/CarouselInfinity.vue'

import { logoImage, imageBg } from '@/constant'
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

const dataSrcImageBG = reactive([
  {
    src: imageBg.img1
  },
  {
    src: imageBg.img2
  },
  {
    src: imageBg.img3
  },
  {
    src: imageBg.img4
  },
  {
    src: imageBg.img5
  },
  {
    src: imageBg.img6
  },
  {
    src: imageBg.img7
  },
  {
    src: imageBg.img8
  },
  {
    src: imageBg.img9
  },
  {
    src: imageBg.img10
  }
])
</script>

<template>
  <divi>
    <SectionComponent title="Auto slider">
      <SliderAuto :dataSrc="dataSrcImage" />
      <SliderAuto2 :dataSrc="dataSrcImage" class="mt-24" />
    </SectionComponent>
    <SectionComponent title="Carousel infinity" class="mt-24">
      <CarouselInfinity :dataSrc="dataSrcImageBG" v-slot="{ item }" :gap="0">
        <img :src="item.src" alt="" />
      </CarouselInfinity>
    </SectionComponent>
  </divi>
</template>

<style scoped lang="scss">
img {
  width: 100%;
  height: 400px;
  object-fit: cover;
  object-position: center center;
}
.slider-page {
  padding-top: 50px;
}
</style>
