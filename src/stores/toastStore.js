// Importing necessary functions and variables from Vue and Pinia
import { ref } from 'vue'
import { defineStore } from 'pinia'

// Defining the toast store
export const useToastStore = defineStore('toast', {
  state: () => {
    // State
    const show = ref(false) // Reactive reference for the visibility of the toast
    const success = ref(false) // Reactive reference for the success state of the toast
    const message = ref('') // Reactive reference for the message to be displayed in the toast
    const timerId = ref(-1) // Reactive reference for the timer ID used to control the display duration of the toast

    // Getters (currently empty)

    // Actions
    function showToast(isSuccess, msg) {
      // Function to show the toast with a success state and message
      success.value = isSuccess // Updating the success state of the toast
      message.value = msg // Updating the message to be displayed
      show.value = true // Showing the toast
      clearTimeout(timerId.value) // Clearing any existing timer
      timerId.value = setTimeout(() => {
        // Setting a timer to hide the toast after 5000ms (5 seconds)
        show.value = false // Hiding the toast after the specified duration
      }, 5000)
    }

    function closeToast() {
      // Function to close the toast
      show.value = false // Hiding the toast
    }

    return {
      // State
      show, // Exposing the show state
      success, // Exposing the success state
      message, // Exposing the message
      timerId, // Exposing the timer ID
      // Actions
      showToast, // Exposing the showToast function
      closeToast // Exposing the closeToast function
      // Getters and additional actions can be added here if needed
    }
  },
  persist: {
    // Persisting the state using local storage
    enabled: true, // Enabling persistence
    strategies: [
      {
        key: 'toast', // Key for local storage persistence
        storage: localStorage // Using local storage for persistence
      }
    ]
  }
})
