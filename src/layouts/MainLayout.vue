<script setup>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars, faXmark } from '@fortawesome/free-solid-svg-icons'
import SidebarMenu from '@/components/sidebar/SidebarMenu.vue'
import { RouterView } from 'vue-router'
import { ref } from 'vue'

const isOpenSidebar = ref(false)
</script>

<template>
  <div class="main-layout">
    <div class="icon-bar icon" :class="[!isOpenSidebar && 'active']" @click="isOpenSidebar = true">
      <FontAwesomeIcon :icon="faBars" size="2x" />
    </div>
    <div class="left" :class="[isOpenSidebar && 'active']">
      <div class="icon-close icon" @click="isOpenSidebar = false">
        <FontAwesomeIcon :icon="faXmark" size="2x" />
      </div>
      <SidebarMenu @onChangePage="isOpenSidebar = false" />
    </div>
    <div class="right container" :class="[isOpenSidebar && 'active']">
      <RouterView />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-layout {
  display: flex;
  .left {
    position: fixed;
    top: 0;
    left: 0;
    width: 250px;
    height: 100vh;
    overflow: auto;
    box-shadow: -2px 3px 9px 1px rgba(0, 0, 0, 0.5);
    padding-top: 40px;
    transition: all 0.3s;
    z-index: 999;
    background: white;
    transform: translateX(-100%);
    &.active {
      transform: translateX(0px);
    }
  }
  .right {
    width: 100%;
    transition: all 0.3s;
    &.active {
      margin-left: 250px;
      width: calc(100% - 250px);
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
