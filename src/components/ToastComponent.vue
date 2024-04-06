<template>
    <transition name="fade">
      <div class="toast-container" v-if="errorMessage">
        <div class="alert alert-error">
          <span>{{ errorMessage }}</span>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup>

  const props = defineProps({
    errorMessage: String
  })
  </script>
  
  <style scoped>
  .toast-container {
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 50; /* Ensure the toast appears above other content */
  }
  
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.5s; /* Smooth transition for opacity change */
  }
  
  .fade-enter, .fade-leave-to {
    opacity: 0; /* Start with 0 opacity during enter and leave transitions */
  }
  </style>