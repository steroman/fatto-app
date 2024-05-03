<script setup>
// Importing necessary functions and variables from other files
import { SORT_OPTIONS, useTasksStore } from '@/stores/tasksStore'
import { useUserStore } from '@/stores/userStore'
import { onMounted, ref, watch } from 'vue'

// Using the imported functions and variables
const userStore = useUserStore()
const tasksStore = useTasksStore()
const selectedSort = ref(userStore.sortingPreference) // Creating a reactive reference for the selected sorting option
const label = ref('') // Creating a reactive reference for the label to be displayed
const show = ref(false) // Creating a reactive reference for the visibility of the sorting options menu

// Function to toggle the visibility of the sorting options menu
const showMenu = (value) => {
  show.value = value
}

// Storing the available sorting options in a constant
const options = SORT_OPTIONS

// Function to apply the selected sorting option
const applySorting = (value) => {
  selectedSort.value = value // Setting the selected sorting option
  show.value = false // Hiding the sorting options menu
  userStore.updateUserSortingPreference(selectedSort.value) // Updating the user's sorting preference
}

// Watching for changes in the selected sorting option
watch(
  () => selectedSort.value,
  (newValue) => {
    SORT_OPTIONS.map((option) => {
      if (option.value === newValue) {
        label.value = option.label // Updating the label based on the selected sorting option
      }
    })
  }
)

// Executing the following code when the component is mounted
onMounted(() => {
  // Setting the initial label based on the selected sorting option
  SORT_OPTIONS.map((option) => {
    if (option.value === selectedSort.value) {
      label.value = option.label
    }
  })
  const userId = userStore.user.id
  tasksStore.fetchAllTasks(userId) // Fetching all tasks for the user
  selectedSort.value = userStore.sortingPreference // Initializing the selected sorting option based on the user's preference
})
</script>

<template>
  <!-- Sorting options dropdown menu -->
  <div class="sm:block relative w-full hidden">
    <div
      @click="showMenu(!show)"
      class="block appearance-none w-full bg-white dark:bg-gray-700 border border-gray-400 hover:border-gray-500 px-4 py-3 text-left text-lg pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
    >
      {{ label }}
      <!-- Displaying the current label of the selected sorting option -->
    </div>

    <!-- Icon to indicate the dropdown functionality -->
    <div
      class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700 dark:text-gray-300"
    >
      <i class="material-icons">keyboard_arrow_down</i>
    </div>
    <!-- Dropdown menu for sorting options -->
    <div class="bg-white w-full absolute rounded-md z-40 shadow-md dark:bg-gray-700" v-if="show">
      <!-- Iterating over the sorting options and displaying them -->
      <div
        @click="applySorting(option.value)"
        :selected="option.value === selectedSort"
        v-for="option in options"
        :key="option.value"
        :value="option.value"
        :class="[
          'text-left py-3 px-4 hover:bg-gray-200 hover:text-black dark:hover:bg-gray-600 dark:hover:text-white',
          selectedSort === option.value ? 'bg-primary dark:bg-gray-900 text-white' : ''
        ]"
      >
        {{ option.label }}
        <!-- Displaying the label of each sorting option -->
      </div>
    </div>
  </div>
</template>
