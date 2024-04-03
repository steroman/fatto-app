<script setup>
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const taskTitle = ref('')

const _createTask = async () => {
  const task = {
    title: taskTitle.value
  }

  await tasksStore.createNewTask(task)
  tasksStore.fetchAllTasks()
  taskTitle.value = ''
}
</script>

<template>
  <div class="mb-4 flex flex-col md:flex-row md:items-center">
    <label for="taskTitle" class="mb-2 md:mb-0 md:mr-2">Task title:</label>
    <input type="text" id="taskTitle" v-model="taskTitle" class="border rounded px-2 py-1 w-full md:w-auto">
    <button @click="_createTask()" class="bg-blue-500 text-white px-4 py-2 mt-2 md:mt-0 md:ml-2 md:w-auto">Add Task</button>
  </div>
</template>

<style scoped></style>
