<script setup>
import { defineProps, ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const task = ref(props.task)

const _handleTaskCompletion = async () => {
  task.value.is_complete = !task.value.is_complete
  await tasksStore.updateExistingTask(task.value)
}

const _deleteTask = async () => {
  await tasksStore.deleteExistingTask(task.value)
  tasksStore.fetchAllTasks()
}

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}
</script>

<template>
  <div class="bg-blue-200 rounded p-4 mb-4">
    <div class="flex justify-between items-center mb-2">
      <div class="font-semibold text-lg">{{ task.title }}</div>
      <input type="checkbox" :checked="task.is_complete" @change="_handleTaskCompletion" class="form-checkbox h-5 w-5 text-blue-500">
    </div>
    <div class="flex justify-between">
      <div class="text-sm text-gray-700">Created on: {{ formatTimestamp(task.inserted_at) }}</div>
      <button @click="_deleteTask()" class="text-red-500">Delete</button>
    </div>
  </div>
</template>

<style scoped>
</style>
