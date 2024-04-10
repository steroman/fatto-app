import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  createAccount,
  login,
  seeCurrentUser,
  logout,
  updateUser,
  resetPassWithEmail
} from '@/api/userApi'
import {
  fetchSortingPreference,
  updateSortingPreference
 } from '@/api/settingsApi'

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
        throw error  // Propagate the error to the component
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

    async function updateUserPassword(password) {
      try {
        user.value = await updateUser({ password })
      } catch (error) {
        console.error(error)
      }
    }

    async function resetPassword(email) {
      try {
        user.value = await resetPassWithEmail(email)
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchUserSortingPreference(userId) {
      try {
        const sortingPreference = await fetchSortingPreference(userId)
        console.log(sortingPreference)
        // tasksStore.sortingPreference = sortingPreference 
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserSortingPreference(userId, sortingPreference) {
      try {
        await updateSortingPreference(userId, sortingPreference)
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
      signOut,
      updateUserPassword,
      resetPassword,
      fetchUserSortingPreference,
      updateUserSortingPreference
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
