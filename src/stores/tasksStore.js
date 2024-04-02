import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions

  async function fetchAllTasks() {
    try {
      // Aquí nacho ha hecho un const data = await fetchAllTasks(). Por si no funciona
      tasks.value = await fetchTasks()
    } catch (error) {
      console.error(error)
    }
  }

  async function createNewTask(task) {
    const userStore = useUserStore()
    const id = userStore.user.id

    try {
      await createTask({ ...task, user_id: id })
    } catch (error) {
      console.error(error)
    }
  }

  async function updateExistingTask(task) {
    try {
      await updateTask(task)
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
    // Getters
    // Actions
    fetchAllTasks,
    createNewTask,
    updateExistingTask,
    deleteExistingTask
  }
})
