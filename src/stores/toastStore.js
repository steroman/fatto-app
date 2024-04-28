import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useToastStore = defineStore('toast', {
  state: () => {
    // State
    const show = ref(false)
    const success = ref(false)
    const message = ref('')
    const timerId = ref(-1)
    // Getters

    // Actions
    function showToast(isSuccess, msg) {
      success.value = isSuccess
      message.value = msg
      show.value = true
      clearTimeout(timerId.value)
      timerId.value = setTimeout(() => {
        show.value = false
      }, 5000)
    }

    clearTimeout(timerId.value)

    function closeToast() {
      show.value = false
    }

    return {
      // State
      success,
      message,
      show,
      timerId,
      showToast,
      closeToast
      // changePassword
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'toast',
        storage: localStorage
      }
    ]
  }
})
