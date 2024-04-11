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
  updateSortingPreference,
  fetchHideCompletedSetting,
  updateHideCompletedSetting
 } from '@/api/settingsApi'


export const useUserStore = defineStore('user', {
  state: () => {
    // State
    const user = ref(null)
    const sortingPreference = ref('')
    const hideCompletedSetting = ref(null)
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

    async function fetchUserHideCompletedSetting() {
      try {
        const hideCompletedSettingFetched = await fetchHideCompletedSetting(user.value.id)
        hideCompletedSetting.value = hideCompletedSettingFetched
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserHideCompletedSetting(newHideCompletedSetting) {
      try {
        const updatedHideCompletedSetting = await updateHideCompletedSetting(user.value.id, newHideCompletedSetting)
        hideCompletedSetting.value = updatedHideCompletedSetting
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
      updateUserSortingPreference,
      fetchUserHideCompletedSetting,
      updateUserHideCompletedSetting
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
