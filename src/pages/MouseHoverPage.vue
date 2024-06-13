<script setup>
import SectionComponent from '@/components/section/SectionComponent.vue'
import MouseHoverEffect1 from '@/components/mouse/MouseHoverEffect1.vue'
</script>

<template>
  <div>
    <SectionComponent title="Mouse hover cursor">
      <MouseHoverEffect1>
        <div class="content"></div>
      </MouseHoverEffect1>
    </SectionComponent>
  </div>
</template>

<style scoped lang="scss">
.content {
  width: 100%;
  height: 500px;
  border: 1px solid rgba(0, 0, 0, 0.5);
}
</style>
