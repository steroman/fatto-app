import { ref } from 'vue'
import { defineStore } from 'pinia'
import { createAccount, login, seeCurrentUser, logout } from '@/api/userApi'

export const useUserStore = defineStore('user', {
  state: () => {
    // State
    const user = ref(null)
    // Getters

    // Actions
    async function createUser(email, password, displayName) {
      try {
        await createAccount(email, password, displayName)
      } catch (error) {
        console.error(error)
      }
    }

    async function signIn(email, password) {
      try {
        user.value = await login(email, password)
        console.log('User info retrieved:', user.value)
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
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage
      }
    ]
  }
})
