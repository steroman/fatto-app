<script setup>
import { useUserStore } from '@/stores/userStore'
import { SORT_OPTIONS } from '@/stores/tasksStore'
import { useRouter } from 'vue-router'
import { computed, ref } from 'vue'

// Define reactive variables
const isOpen = ref(false)
const isSubOpen = ref(false)
const userStore = useUserStore()
const router = useRouter()
const options = SORT_OPTIONS
const selectedSort = ref(userStore.sortingPreference)

// Check if the current route is the settings page. Used to evaluate whether to show the kebab icon when in Settings.
const isSettings = computed(() => router.currentRoute.value.path.includes('settings'))

// Function to close the menu
const closeMenu = () => {
  isOpen.value = false
  isSubOpen.value = false
}

// Function to apply sorting option
const applySorting = () => {
  userStore.updateUserSortingPreference(selectedSort.value)
  isOpen.value = false
}

// Function to handle click on "Sort by" button
const onSorybyClick = () => {
  isSubOpen.value = !isSubOpen.value
  isOpen.value = false
}

// Function to handle click on "Settings" button
const onSettingsClick = () => {
  router.push('/settings')
  isOpen.value = false
}

// Function to handle click on "Log out" button
const onLogoutClick = async () => {
  await userStore.signOut()
  isOpen.value = false
  router.push('/login')
}

// Function to handle click on the menu button
const onMenuClick = () => {
  isOpen.value = !isOpen.value
}
</script>

<template>
  <!-- Navigation bar -->
  <nav class="flex items-center justify-between flex-wrap fixed w-full px-6 pt-4 pb-2 z-30">
    <!-- Logo and app name -->
    <div class="flex items-center w-full pb-2 justify-between h-12">
      <div class="flex items-center space-x-4">
        <img src="@/assets/logo.svg" class="w-10 h-10 sm:mx-auto" />
        <span class="font-semibold text-xl tracking-tight hidden sm:block">Fatto</span>
      </div>
      <!-- Menu button -->
      <button
        @click="onMenuClick"
        v-if="!isSettings"
        class="bg-transparent hover:text-gray-100 hover:bg-hover dark:hover:bg-gray-800 rounded-full w-10 h-10 p-2"
      >
        <i class="material-icons"> more_vert </i>
      </button>
      <!-- Log out button -->
      <button
        @click="onLogoutClick"
        :class="[
          isSettings ? 'sm:block md:block lg:block' : '',
          'hidden w-auto h-10 bg-primary text-white dark:text-white hover:bg-gray-200 hover:text-white dark:bg-gray-700 dark:hover:bg-gray-600 rounded-lg text-md font-semibold text-center px-3 hover:shadow-md'
        ]"
      >
        Log out
      </button>
    </div>
    <!-- Submenu for sorting options -->
    <div
      :class="[
        'bg-white dark:bg-gray-800 dark:shadow-gray-600 w-28 block fixed right-6 top-16 shadow-md p-2 rounded-md z-50'
      ]"
      v-show="isOpen"
    >
      <div class="w-full">
        <!-- Sort by button -->
        <button
          @click="onSorybyClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md block sm:hidden md:hidden lg:hidden"
        >
          Sort by
        </button>
        <!-- Settings button -->
        <button
          @click="onSettingsClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        >
          Settings
        </button>
        <!-- Log out button -->
        <button
          @click="onLogoutClick"
          class="w-full px-4 text-left h-10 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md"
        >
          Log out
        </button>
      </div>
    </div>
  </nav>

  <!-- Submenu for sorting options on small screens -->
  <div class="block sm:hidden">
    <div
      class="w-screen h-screen fixed bg-gray-500 bg-opacity-75 top-0 left-0 z-50"
      v-if="isSubOpen"
    >
      <div class="w-screen h-min p-6 fixed bottom-0 bg-white dark:bg-gray-700 rounded-t-md">
        <!-- Display sorting options -->
        <div v-for="option in options" :key="option.value">
          <label
            :class="[
              'cursor-pointer flex justify-between mx-auto p-2 rounded-md dark:hover:bg-gray-600 hover:bg-gray-100',
              selectedSort === option.value ? 'dark:bg-gray-800 bg-gray-200' : ''
            ]"
          >
            <span class="">{{ option.label }}</span>
            <input
              type="radio"
              name="sortingOption"
              class="radio"
              :value="option.value"
              v-model="selectedSort"
              @change="applySorting"
            />
          </label>
        </div>
        <!-- Close button -->
        <button
          @click="closeMenu"
          class="w-full h-14 my-4 bg-primary dark:bg-gray-600 hover:bg-hover dark:hover:bg-gray-800 text-white hover:text-white rounded-lg text-center font-semibold text-xl p-3 hover:shadow-md"
        >
          Close
        </button>
      </div>
    </div>
  </div>
  <!-- Background overlay to close the menu -->
  <div v-if="isOpen" class="w-full h-dvh fixed left-0 z-20" @click="closeMenu" />
</template>
