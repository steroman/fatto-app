import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTask, deleteTask, fetchAllTasks, updateTask } from '@/api/tasksApi'

const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])
  // Getters

  // Actions

  async function fetchTasks() {
    try {
      // Aquí nacho ha hecho un const data = await fetchAllTasks(). Por si no funciona
      tasks.value = await fetchAllTasks()
      console.log(tasks.value)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks
  }
})
