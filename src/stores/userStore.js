// Importing necessary functions and variables from Vue and Pinia, as well as various API functions
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
} from '@/api/userApi' // Importing user-related API functions
import {
  fetchSortingPreference,
  updateSortingPreference,
  fetchHideCompletedSetting,
  updateHideCompletedSetting,
  fetchDarkModeSetting,
  updateDarkModeSetting
} from '@/api/settingsApi' // Importing settings-related API functions

// Defining the user store
export const useUserStore = defineStore('user', {
  state: () => {
    // State
    const user = ref(null) // A reference to hold the current user information
    const sortingPreference = ref('') // A reference to hold the user's sorting preference
    const hideCompletedSetting = ref(false) // A reference to hold the hide completed tasks setting
    const displayName = ref('') // A reference to hold the user's display name
    const isDarkMode = ref(false) // A reference to hold the user's dark mode setting

    // Getters (none at the moment)

    // Actions
    async function createUser(email, password, displayName) {
      // Function to create a new user account
      try {
        await createAccount(email, password, displayName)
      } catch (error) {
        console.error(error)
      }
    }

    async function signIn(email, password) {
      // Function to sign in using the provided credentials
      try {
        user.value = await login(email, password)
      } catch (error) {
        console.error(error)
        throw error // Propagate the error to the component
      }
    }

    async function seeUser() {
      // Function to retrieve current user information
      try {
        user.value = await seeCurrentUser()
        displayName.value = user.value?.user_metadata?.display_name || ''
      } catch (error) {
        console.error(error)
      }
    }

    async function signOut() {
      // Function to sign out the current user
      try {
        user.value = await logout()
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserData(userData) {
      // Function to update user data
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
      // Function to initiate a password reset
      try {
        user.value = await resetPassWithEmail(email)
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchUserSortingPreference() {
      // Function to fetch the user's sorting preference
      try {
        const sortingPrefFetched = await fetchSortingPreference(user.value.id)
        sortingPreference.value = sortingPrefFetched
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserSortingPreference(newSortingPref) {
      // Function to update the user's sorting preference
      try {
        const updatedSortingPref = await updateSortingPreference(user.value.id, newSortingPref)
        sortingPreference.value = updatedSortingPref
      } catch (error) {
        console.error(error)
      }
    }

    async function fetchUserHideCompletedSetting() {
      // Function to fetch the user's hide completed tasks setting
      try {
        const hideCompletedSettingFetched = await fetchHideCompletedSetting(user.value.id)
        hideCompletedSetting.value = hideCompletedSettingFetched
      } catch (error) {
        console.error(error)
      }
    }

    async function updateUserHideCompletedSetting(newHideCompletedSetting) {
      // Function to update the user's hide completed tasks setting
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
      // Function to fetch the user's dark mode setting
      try {
        const darkMode = await fetchDarkModeSetting(user.value.id)
        isDarkMode.value = darkMode
      } catch (error) {
        console.error(error)
      }
    }

    async function updateDarkMode(newDarkMode) {
      // Function to update the user's dark mode setting
      try {
        const updatedDarkMode = await updateDarkModeSetting(user.value.id, newDarkMode)
        isDarkMode.value = updatedDarkMode
      } catch (error) {
        console.error(error)
      }
    }

    return {
      // State
      user, // Exposing the user state
      sortingPreference, // Exposing the sorting preference state
      hideCompletedSetting, // Exposing the hide completed tasks setting state
      displayName, // Exposing the display name state
      isDarkMode, // Exposing the dark mode setting state

      // Getters (none at the moment)

      // Actions
      createUser, // Exposing the createUser function
      signIn, // Exposing the signIn function
      seeUser, // Exposing the seeUser function
      signOut, // Exposing the signOut function
      updateUserData, // Exposing the updateUserData function
      resetPassword, // Exposing the resetPassword function
      fetchUserSortingPreference, // Exposing the fetchUserSortingPreference function
      updateUserSortingPreference, // Exposing the updateUserSortingPreference function
      fetchUserHideCompletedSetting, // Exposing the fetchUserHideCompletedSetting function
      updateUserHideCompletedSetting, // Exposing the updateUserHideCompletedSetting function
      fetchDarkMode, // Exposing the fetchDarkMode function
      updateDarkMode // Exposing the updateDarkMode function
    }
  },
  persist: {
    // Persisting the state using local storage
    enabled: true, // Enabling persistence
    strategies: [
      {
        key: 'user', // Key for local storage persistence
        storage: localStorage // Using local storage for persistence
      }
    ]
  }
})
