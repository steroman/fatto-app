import { ref } from 'vue'
import { defineStore } from 'pinia'
import {
  createAccount,
  login,
  seeCurrentUser,
  logout,
  updateUser,
  resetPassWithEmail
  // changePass
} from '@/api/userApi'
import {
  fetchSortingPreference,
  updateSortingPreference,
  fetchHideCompletedSetting,
  updateHideCompletedSetting,
  fetchDarkModeSetting,
  updateDarkModeSetting
} from '@/api/settingsApi'

export const useUserStore = defineStore('user', {
  state: () => {
    // State
    const user = ref(null)
    const sortingPreference = ref('')
    const hideCompletedSetting = ref(false)
    const displayName = ref('')
    const isDarkMode = ref(false)
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
      } catch (error) {
        console.error(error)
        throw error // Propagate the error to the component
      }
    }

    async function seeUser() {
      try {
        user.value = await seeCurrentUser()
        displayName.value = user.value?.user_metadata?.display_name || ''
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

    async function updateUserData(userData) {
      try {
        const response = await updateUser(userData)
        user.value = response.user
        displayName.value = user.value?.user_metadata?.display_name || ''
      } catch (error) {
        console.error(error)
        throw new Error(error.message)
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
        const updatedHideCompletedSetting = await updateHideCompletedSetting(
          user.value.id,
          newHideCompletedSetting
        )
        hideCompletedSetting.value = updatedHideCompletedSetting
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchDarkMode() {
      try {
        const darkMode = await fetchDarkModeSetting(user.value.id)
        isDarkMode.value = darkMode
      } catch (error) {
        console.error(error)
      }
    }

    async function updateDarkMode(newDarkMode) {
      try {
        const updatedDarkMode = await updateDarkModeSetting(user.value.id, newDarkMode)
        isDarkMode.value = updatedDarkMode
      } catch (error) {
        console.error(error)
      }
    }

    // async function changePassword(oldPass, newPass) {
    //   await changePass(oldPass, newPass, user.value.id)
    // }

    return {
      // State
      user,
      sortingPreference,
      hideCompletedSetting,
      displayName,
      isDarkMode,
      // Getters

      // Actions
      createUser,
      signIn,
      seeUser,
      signOut,
      updateUserData,
      resetPassword,
      fetchUserSortingPreference,
      updateUserSortingPreference,
      fetchUserHideCompletedSetting,
      updateUserHideCompletedSetting,
      fetchDarkMode,
      updateDarkMode
      // changePassword
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
