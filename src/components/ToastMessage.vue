<!-- Your template remains unchanged -->
<template>
  <div class="fixed w-screen h-0 top-0 left-0 z-50 flex justify-center">
    <transition name="fade" mode="out-in">
      <div
        @click="toastStore.closeToast()"
        v-if="show"
        :class="[
          success ? 'bg-green-300' : 'bg-red-300',
          'rounded-md py-3 px-6 my-2 absolute top-10 mx-auto toast z-50'
        ]"
      >
        <span :class="[success ? 'text-green-600' : 'text-red-600', 'font-semibold']">{{
          message
        }}</span>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { useToastStore } from '@/stores/toastStore'
import { storeToRefs } from 'pinia'

const toastStore = useToastStore()

const { show, success, message } = storeToRefs(toastStore)
</script>

<style scoped>
/* Styling for the toast animation */
.toast {
  animation: toast;
  animation-duration: 0.5s;
}

@keyframes toast {
  0% {
    top: -80px; /* Initial position off the screen */
  }

  100% {
    top: 40px; /* Final position on the screen */
  }
}

/* Styling for the fade transition effect */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 300ms ease-out; /* Setting transition properties for opacity change */
}

.fade-enter,
.fade-leave-to {
  opacity: 0; /* Hiding the element when entering/leaving */
}
</style>
