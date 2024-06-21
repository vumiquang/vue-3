<script setup>
import { ref } from 'vue'
import ComA from '@/components/keep-alive/ComA.vue'
import ComB from '@/components/keep-alive/ComB.vue'

const current = ref(ComA)
</script>

<template>
  <div>
    <div class="demo">
      <div class="mb-24">
        <label class="mr-16"><input type="radio" v-model="current" :value="ComA" /> A</label>
        <label><input type="radio" v-model="current" :value="ComB" /> B</label>
      </div>
      <KeepAlive>
        <component :is="current"></component>
      </KeepAlive>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
