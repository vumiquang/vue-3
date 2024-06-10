<script setup>
const props = defineProps(['dataSrc'])
</script>

<template>
  <div class="slider">
    <div class="slider-wrap">
      <div class="slider-item" v-for="(item, i) in props.dataSrc" :key="i">
        <img :src="item.src" />
      </div>
    </div>
    <div class="slider-wrap">
      <div class="slider-item" v-for="(item, i) in props.dataSrc" :key="i">
        <img :src="item.src" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.slider {
  width: 100%;
  display: inline-block;
  .slider-wrap {
    display: flex;
    gap: 10px;
  }
  .slider-item {
    img {
    }
  }
}
</style>
