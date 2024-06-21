<script setup>
import { ref } from 'vue'
const show = ref(true)
const items = ref([])
let id = items.value.length + 1
function insert() {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 0, id++)
}

function remove() {
  const i = Math.round(Math.random() * items.value.length)
  items.value.splice(i, 1)
}

const docState = ref('saved')
</script>

<template>
  <div>
    <button @click="show = !show" class="btn">Toggle Modal</button>
    <Transition name="modal">
      <div v-if="show" class="modal">Modal content</div>
    </Transition>
    <div class="mt-24">
      <Transition name="bounce" appear>
        <p v-show="show" style="text-align: center" class="bounce">
          Hello here is some bouncy text!
        </p>
      </Transition>
    </div>
    <div class="mt-24">
      <button @click="insert">Add at random index</button>
      <button @click="remove">Remove at random index</button>
      <TransitionGroup name="list" tag="ul">
        <li v-for="item in items" :key="item">
          {{ item }}
        </li>
      </TransitionGroup>
    </div>
    <div class="mt-24">
      <Transition name="slide-up" mode="out-in" appear>
        <button v-if="docState === 'saved'" @click="docState = 'edited'">Edit</button>
        <button v-else-if="docState === 'edited'" @click="docState = 'editing'">Save</button>
        <button v-else-if="docState === 'editing'" @click="docState = 'saved'">Cancel</button>
      </Transition>
    </div>
  </div>
</template>

<style scoped lang="scss">
.modal {
  position: fixed;
  top: 50%;
  left: 50%;
  translate: -50% 0;
  width: 600px;
  border-radius: 4px;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.3);
  transition: all 0.5s;
  transform-origin: top left;
  height: 300px;
  display: grid;
  place-items: center;
  font-size: 1.6rem;
}

.modal-enter-from,
.modal-leave-to {
  translate: -60% -20px;
  opacity: 0;
  scale: 0;
}
.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.25s ease-out;
}

.slide-up-enter-from {
  opacity: 0;
  transform: translateY(30px);
}

.slide-up-leave-to {
  opacity: 0;
  transform: translateY(-30px);
}
</style>
