<script setup>
import { RouterLink } from 'vue-router'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { ref } from 'vue'
const emit = defineEmits(['onChangePage'])

const props = defineProps({
  item: {
    type: String,
    default: ''
  }
})
const isOpenSubMenu = ref(true)
</script>

<template>
  <div class="menu-item">
    <div class="item" v-if="item.dropdown" @click="isOpenSubMenu = !isOpenSubMenu">
      <FontAwesomeIcon :icon="faCaretDown" class="icon-dropdown" />
      <div class="icon" v-if="item.icon">
        <FontAwesomeIcon :icon="props.item.icon" size="xl" />
      </div>
      <div class="text">{{ props.item.text }}</div>
    </div>
    <RouterLink class="item" :to="`/${props.item.path}`" @click="emit('onChangePage')" v-else>
      <div class="icon" v-if="item.icon">
        <FontAwesomeIcon :icon="props.item.icon" size="xl" />
      </div>
      <div class="text">{{ props.item.text }}</div>
    </RouterLink>
    <div class="sub-menu" v-show="isOpenSubMenu" v-if="item.dropdown">
      <RouterLink
        class="item"
        v-for="_item in item.dropdown"
        :key="_item.text"
        :to="`/${item.path}/${_item.path}`"
        @click="emit('onChangePage')"
      >
        <div class="icon" v-if="item.icon">
          <FontAwesomeIcon :icon="_item.icon" size="xl" />
        </div>
        <div class="text">{{ _item.text }}</div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped lang="scss">
.menu-item {
  position: relative;
  .icon-dropdown {
    position: absolute;
    right: 10px;
    top: calc(50% - 5px);
  }
  .item {
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
    position: relative;
    display: flex;
    align-items: center;
    padding: 10px 20px;
    gap: 20px;
    .text {
      flex: 1 1 0;
      word-break: break-all;
      font-size: 1.4rem;
      user-select: none;
    }
    svg,
    .text {
      color: rgb(126, 126, 126);
    }
    &:hover {
      svg,
      .text {
        color: rgb(27, 27, 27);
      }
    }
  }
  .sub-menu .item {
    padding-left: 35px;
  }
}
</style>
