<script setup>
import SidebarMenu from '@/components/sidebar/SidebarMenu.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="main-layout">
    <div class="left">
      <SidebarMenu />
    </div>
    <div class="right container">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  .left {
    width: 270px;
    height: 100vh;
    overflow: auto;
    box-shadow: -2px 3px 9px 1px rgba(0, 0, 0, 0.5);
    padding-top: 40px;
    transition: all 0.3s;
    z-index: 999;
    background: white;
  }
  .right {
    width: calc(100% - 270px);
    transition: all 0.3s;
    &.active {
      margin-left: 250px;
    }
  }
  .icon {
    cursor: pointer;
    transition: all 0.5s;
    svg {
      color: #333333;
      &:hover {
        color: #000000;
      }
    }
  }
  .icon-bar {
    position: fixed;
    z-index: 100;
    top: 10px;
    left: 10px;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(0, 0, 0, 0.5);
    transform: translateX(-50px);
    background: white;
    &.active {
      transform: translateX(0px);
    }
    &:hover {
      border-color: #000000;
    }
  }
  .icon-close {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
