import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([]);
  // operations should happen on a different array like "sortedTasks"
  const sortingOptions = [
    { label: 'Active first (Default)', value: 'id' },
    { label: 'Completed first', value: 'completed' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Newest', value: 'newest' },
    { label: 'Name A to Z', value: 'a-first' },
    { label: 'Name Z to A', value: 'z-first' }
  ];
  const sortingPreference = ref(localStorage.getItem('sortingPreference') || 'activeFirst');

  // Shared reactive reference for sorting preference
  const sharedSortingPreference = sortingPreference;

  // Getters

  // Actions

  async function fetchAllTasks() {
    try {
      const userStore = useUserStore()
      const userId = userStore.user.id
      const fetchedTasks = await fetchTasks(userId); // Pass userId to the fetchTasks function
      sortTasksByOption(fetchedTasks);
      tasks.value = fetchedTasks;
    } catch (error) {
      console.error(error);
    }
  }

  async function createNewTask(task) { // Accept userId as a parameter
    try {
      const userStore = useUserStore()
      const userId = userStore.user.id
      await createTask({ ...task, user_id: userId });
    } catch (error) {
      console.error(error);
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

  function sortTasksByOption(tasks) {
    switch (sortingPreference.value) {
      case 'id':
        tasks.sort((a, b) => a.id - b.id);
        break;
      case 'completed':
        tasks.sort((a, b) => b.is_complete - a.is_complete);
        break;
      case 'oldest':
        tasks.sort((a, b) => new Date(a.inserted_at) - new Date(b.inserted_at));
        break;
      case 'newest':
        tasks.sort((a, b) => new Date(b.inserted_at) - new Date(a.inserted_at));
        break;
      case 'a-first':
        tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'z-first':
        tasks.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        break;
    }
  }

  return {
    // State
    tasks,
    sortingOptions,
    sortingPreference,
    sharedSortingPreference, // Export the shared reactive reference
    // Getters
    // Actions
    fetchAllTasks,
    createNewTask,
    updateExistingTask,
    deleteExistingTask
  }
})
