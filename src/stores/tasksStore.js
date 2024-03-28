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
