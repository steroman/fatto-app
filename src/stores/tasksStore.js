import { defineStore } from 'pinia'
import { ref } from 'vue'
import { createTask, deleteTask, fetchTasks, updateTask } from '@/api/tasksApi'
import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([]);
  const sortingOptions = [
    { label: 'Active first (Default)', value: 'activeFirst' },
    { label: 'Completed first', value: 'completedFirst' },
    { label: 'Oldest', value: 'oldest' },
    { label: 'Newest', value: 'newest' },
    { label: 'Name A to Z', value: 'nameAToZ' },
    { label: 'Name Z to A', value: 'nameZToA' }
  ];
  const sortingPreference = ref(localStorage.getItem('sortingPreference') || 'activeFirst');
  // Getters

  // Actions

  async function fetchAllTasks() {
    try {
      const fetchedTasks = await fetchTasks();
      sortTasksByOption(fetchedTasks);
      tasks.value = fetchedTasks;
    } catch (error) {
      console.error(error);
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

  function sortTasksByOption(tasks) {
    switch (sortingPreference.value) {
      case 'activeFirst':
        tasks.sort((a, b) => a.is_complete - b.is_complete);
        break;
      case 'completedFirst':
        tasks.sort((a, b) => b.is_complete - a.is_complete);
        break;
      case 'oldest':
        tasks.sort((a, b) => new Date(a.inserted_at) - new Date(b.inserted_at));
        break;
      case 'newest':
        tasks.sort((a, b) => new Date(b.inserted_at) - new Date(a.inserted_at));
        break;
      case 'nameAToZ':
        tasks.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'nameZToA':
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
    // Getters
    // Actions
    fetchAllTasks,
    createNewTask,
    updateExistingTask,
    deleteExistingTask
  }
})
