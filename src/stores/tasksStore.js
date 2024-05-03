// Importing necessary functions and variables from Pinia and Vue
import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi' // Importing API functions to interact with the tasks
import { useUserStore } from '@/stores/userStore' // Importing user store for user-related operations

// Definition of sort options for tasks
export const SORT_OPTIONS = [
  { label: 'Internal ID (default)', value: 'id' },
  { label: 'Completed first', value: 'completed' },
  { label: 'Oldest', value: 'old' },
  { label: 'Newest', value: 'new' },
  { label: 'Name A to Z', value: 'a-first' },
  { label: 'Name Z to A', value: 'z-first' }
]

// Defining the tasks store
export const useTasksStore = defineStore('tasks', () => {
  const userStore = useUserStore() // Accessing the user store for user-related operations
  const { sortingPreference, hideCompletedSetting } = storeToRefs(userStore) // Retrieving sorting and visibility preferences from the user store

  // State
  const tasks = ref([]) // Initializing an empty array for tasks

  // Getters
  const tasksVisible = computed(() => { // Computed property to determine visible tasks based on completion setting
    if (hideCompletedSetting === undefined) {
      return tasks.value
    }

    if (hideCompletedSetting.value === true) {
      return tasks.value.filter((task) => !task.is_complete)
    } else {
      return tasks.value
    }
  })

  const taskSortered = computed(() => { // Computed property to sort tasks based on the selected sorting preference
    const tasksSorted = [...tasksVisible.value]
    switch (sortingPreference.value) { // Sorting based on the selected preference
      case 'id':
        return tasksSorted.sort((a, b) => a.id - b.id) // Sort by ID
      case 'completed':
        return tasksSorted.sort((a, b) => b.is_complete - a.is_complete) // Sort by completion status
      case 'old':
        return tasksSorted.sort((a, b) => new Date(a.inserted_at) - new Date(b.inserted_at)) // Sort by oldest first
      case 'new':
        return tasksSorted.sort((a, b) => new Date(b.inserted_at) - new Date(a.inserted_at)) // Sort by newest first
      case 'a-first':
        return tasksSorted.sort((a, b) => a.title.localeCompare(b.title)) // Sort alphabetically A to Z
      case 'z-first':
        return tasksSorted.sort((a, b) => b.title.localeCompare(a.title)) // Sort alphabetically Z to A
      default:
        return tasksSorted // Default sorting
    }
  })

  // Actions

  async function fetchAllTasks() { // Function to fetch all tasks for the user
    try {
      const userStore = useUserStore() // Accessing the user store
      const userId = userStore.user.id // Getting the user ID
      const fetchedTasks = await fetchTasks(userId) // Fetching tasks using the API
      tasks.value = fetchedTasks // Storing the fetched tasks in the state
    } catch (error) {
      console.error(error) // Handling fetch error
    }
  }

  async function createNewTask(task) { // Function to create a new task
    try {
      const userStore = useUserStore() // Accessing the user store
      const userId = userStore.user.id // Getting the user ID
      await createTask({ ...task, user_id: userId }) // Creating a new task using the API
    } catch (error) {
      console.error(error) // Handling creation error
    }
  }

  async function updateExistingTask(task) { // Function to update an existing task
    try {
      const updatedTask = await updateTask(task) // Updating the task using the API
      const index = tasks.value.findIndex((t) => t.id === updatedTask.id) // Finding the index of the updated task
      if (index !== -1) {
        tasks.value[index] = updatedTask // Updating the task in the state
      }
    } catch (error) {
      console.error(error) // Handling update error
    }
  }

  async function deleteExistingTask(task) { // Function to delete an existing task
    try {
      await deleteTask(task) // Deleting the task using the API
    }