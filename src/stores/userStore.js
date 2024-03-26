import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createAccount, login, seeCurrentUser, logout } from '@/api/userApi'

export const useUserStore = defineStore('user', () => {
  // State
  //   const email = ref('')
  //   const password = ref('')
  //   const firstName = ref('')
  const user = ref(null)
  // Getters

  // Actions
  async function createUser(email, password) {
    try {
      user.value = await createAccount(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  async function signIn(email, password) {
    try {
      user.value = await login(email, password)
    } catch (error) {
      console.error(error)
    }
  }

  async function seeUser() {
    try {
      user.value = await seeCurrentUser()
    } catch (error) {
      console.error(error)
    }
  }

  async function signOut() {
    try {
      user.value = await logout()
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    user,
    // Getters

    // Actions
    createUser,
    signIn,
    seeUser,
    signOut
  }
})
