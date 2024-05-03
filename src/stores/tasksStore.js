// Importing necessary functions and variables from Vue and Vuelidate

import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'
// Constant defining sorting options for tasks

export const SORT_OPTIONS = [
  { label: 'Internal ID (default)', value: 'id' },
  { label: 'Completed first', value: 'completed' },
  { label: 'Oldest', value: 'old' },
  { label: 'Newest', value: 'new' },
  { label: 'Name A to Z', value: 'a-first' },
  { label: 'Name Z to A', value: 'z-first' }
]
// Define and export the tasks store

export const useTasksStore = defineStore('tasks', () => {
  // Access the user store

  const userStore = useUserStore()
  // Destructure necessary properties from the user store

  const { sortingPreference, hideCompletedSetting } = storeToRefs(userStore)

  // State: array to hold tasks
  const tasks = ref([])

  // Getter to filter visible tasks based on hideCompletedSetting
  const tasksVisible = computed(() => {
    if (hideCompletedSetting === undefined) {
      return tasks.value
    }

    if (hideCompletedSetting.value === true) {
      return tasks.value.filter((task) => !task.is_complete)
    } else {
      return tasks.value
    }
  })
  // Getter to sort tasks based on sortingPreference

  const taskSortered = computed(() => {
    const tasksSorted = [...tasksVisible.value]
    switch (sortingPreference.value) {
      case 'id':
        return tasksSorted.sort((a, b) => a.id - b.id)
      case 'completed':
        return tasksSorted.sort((a, b) => b.is_complete - a.is_complete)
      case 'old':
        return tasksSorted.sort((a, b) => new Date(a.inserted_at) - new Date(b.inserted_at))
      case 'new':
        return tasksSorted.sort((a, b) => new Date(b.inserted_at) - new Date(a.inserted_at))
      case 'a-first':
        return tasksSorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'z-first':
        return tasksSorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return tasksSorted
    }
  })

  // Action to fetch all tasks

  async function fetchAllTasks() {
    try {
      const userStore = useUserStore()
      const userId = userStore.user.id
      const fetchedTasks = await fetchTasks(userId)
      tasks.value = fetchedTasks
    } catch (error) {
      console.error(error)
    }
  }
  // Action to create a new task

  async function createNewTask(task) {
    try {
      const userStore = useUserStore()
      const userId = userStore.user.id
      await createTask({ ...task, user_id: userId })
    } catch (error) {
      console.error(error)
    }
  }
  // Action to update an existing task

  async function updateExistingTask(task) {
    try {
      const updatedTask = await updateTask(task)
      const index = tasks.value.findIndex((t) => t.id === updatedTask.id)
      if (index !== -1) {
        tasks.value[index] = updatedTask
      }
    } catch (error) {
      console.error(error)
    }
  }
  // Action to delete an existing task

  async function deleteExistingTask(task) {
    try {
      await deleteTask(task)
    } catch (error) {
      console.error(error)
    }
  }
  // Return state, getters, and actions to be used by components

  return {
    // State
    tasks,
    tasksVisible,
    taskSortered,
    // Getters
    // Actions
    fetchAllTasks,
    createNewTask,
    updateExistingTask,
    deleteExistingTask
  }
})
