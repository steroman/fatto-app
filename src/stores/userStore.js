import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createAccount } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  // State
  const email = ref('')
  const password = ref('')
  const firstName = ref('')
  const user = ref(null)
  // Getters

  // Actions
  async function createNewAccount(email, password) {
    try {
      user.value = await createAccount(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    user,
    // Getters
    createNewAccount
    // Actions
  }
})
