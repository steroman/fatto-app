import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  // State
  const count = ref(0)
  
  // Getters
  const doubleCount = computed(() => count.value * 2)

  //Actions
  function increment() {
    count.value++
  }

  return {
    // State
    count,
    // Getters
    doubleCount,
    // Actions
    increment }
})
