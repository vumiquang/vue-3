<script setup>
const props = defineProps({
  title: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div>
    <div class="title mb-16" v-if="props.title">{{ props.title }}</div>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.title {
  padding: 10px 5px;
  background: rgb(234, 234, 234);
  font-size: 1.6rem;
  font-weight: 500;
}
</style>
