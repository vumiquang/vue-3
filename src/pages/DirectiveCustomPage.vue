<script setup>
import SectionComponent from '@/components/section/SectionComponent.vue'
import ChildrenComponent from '@/components/common/ChildrenComponent.vue'
import { ref } from 'vue'

const showDropdown = ref(false)

const handleCloseDropdown = () => {
  showDropdown.value = false
}
</script>

<template>
  <div>
    <SectionComponent title="v-click-outside">
      <div class="select mt-16 mb-16" v-click-outside="handleCloseDropdown">
        <div class="value" @click="showDropdown = !showDropdown">Select value</div>
        <div class="dropdown" v-show="showDropdown">
          <div class="dropdown-item">Item 1</div>
          <div class="dropdown-item">Item 1</div>
        </div>
      </div>
    </SectionComponent>
  </div>
</template>

<style scoped lang="scss">
.item-relative {
  position: relative;
  width: 200px;
  height: 70px;
  background: tomato;
  .child {
    width: 100px;
    height: 50px;
    background: dodgerblue;
  }
}
.select {
  width: 160px;
  font-size: 1.4rem;
  position: relative;
  .value {
    border: 1px solid rgba(0, 0, 0, 0.4);
    padding: 10px 20px;
  }
  .dropdown {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    border: 1px solid rgba(0, 0, 0, 0.4);
    .dropdown-item {
      padding: 10px 20px;
    }
  }
}
</style>
