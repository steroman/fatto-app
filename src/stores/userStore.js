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
    const sortingPreference = ref('')
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

    async function fetchUserSortingPreference() {
      try {
        const sortingPrefFetched = await fetchSortingPreference(user.value.id)
        sortingPreference.value = sortingPrefFetched 
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserSortingPreference(newSortingPref) {
      try {
        const updatedSortingPref = await updateSortingPreference(user.value.id, newSortingPref)
        sortingPreference.value = updatedSortingPref
      } catch (error) {
        console.error(error)
      }
    }

    return {
      // State
      user,
      sortingPreference,
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
