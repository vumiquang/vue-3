<script setup>
import { ref, reactive, computed } from 'vue'

import HomeComponent from '../components/common/HomeComponent.vue'

const actionPlan = reactive({ id: 'a' })

const update = (val) => {
  console.log('-->', val)
}
</script>

<template>
  <div>
    home page
    <div>
      aaa
      <HomeComponent :valueProps="actionPlan" @update="update" />
    </div>
  </div>
</template>

<style scoped></style>
