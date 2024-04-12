import { defineStore, storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'

export const SORT_OPTIONS = [
  { label: 'Active first (Default)', value: 'id' },
  { label: 'Completed first', value: 'completed' },
  { label: 'Oldest', value: 'old' },
  { label: 'Newest', value: 'new' },
  { label: 'Name A to Z', value: 'a-first' },
  { label: 'Name Z to A', value: 'z-first' }
]

export const useTasksStore = defineStore('tasks', () => {
  const userStore = useUserStore()
  const { sortingPreference, hideCompletedSetting } = storeToRefs(userStore)

  // State
  const tasks = ref([])

  // Getters
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

  // Actions

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

  async function createNewTask(task) {
    // Accept userId as a parameter
    try {
      const userStore = useUserStore()
      const userId = userStore.user.id
      await createTask({ ...task, user_id: userId })
    } catch (error) {
      console.error(error)
    }
  }

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

  async function deleteExistingTask(task) {
    try {
      await deleteTask(task)
    } catch (error) {
      console.error(error)
    }
  }

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
