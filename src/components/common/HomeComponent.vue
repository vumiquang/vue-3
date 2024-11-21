<script setup>
import { ref, reactive, computed } from 'vue'
import Multiselect from '@vueform/multiselect'
import '@vueform/multiselect/themes/default.css'
const props = defineProps(['valueProps'])
const emit = defineEmits(['update'])

const valueA = computed({
  get() {
    return props.valueProps
  },
  set(value) {
    // console.log('==>'.value)
    // emit('update', value)
  }
})

const options = ['a', 'b', 'c']
</script>

<template>
  <div>
    <Multiselect v-model="valueA.id" :options="options" class="multiselect-blue" />
  </div>
</template>

<style scoped></style>
