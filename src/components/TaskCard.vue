<template>
  <div :class="['bg-blue-200', task.is_complete ? 'bg-opacity-50 line-through' : '', 'rounded p-4 mb-4']">
    <div class="flex justify-between items-center mb-2">
      <div :class="['font-semibold', task.is_complete ? 'text-gray-500' : 'text-lg']">{{ task.title }}</div>
      <div class="flex items-center">
        <!-- Edit button -->
        <button @click="openEditModal" class="focus:outline-none mr-2">
          <img src="@/assets/icons/pencil-solid.svg" alt="Edit Task" class="w-4">
        </button>

        <!-- Completed button -->
        <button @click="_handleTaskCompletion" class="focus:outline-none">
          <i class="fa-solid" :class="getIconClass()"></i>
        </button>
      </div>
    </div>
    <div class="flex justify-between align-items-end">
      <div :class="['text-xs', task.is_complete ? 'text-gray-500' : 'text-gray-700']">Created on:<br/>{{ formatTimestamp(task.inserted_at) }}</div>
      <button @click="_deleteTask" class="text-red-500"><i class="fa-solid fa-trash-can"></i></button>
    </div>
  </div>
</template>

<script setup>
import { defineEmits } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const emit = defineEmits(['editTask'])

// Define props for the component
const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

// Initialize tasks store
const tasksStore = useTasksStore()

// Function to toggle task completion status
const _handleTaskCompletion = async () => {
  const taskToUpdate = {
    ...props.task,
    is_complete: !props.task.is_complete
  }
  await tasksStore.updateExistingTask(taskToUpdate)
}

// Function to delete the task
const _deleteTask = async () => {
  await tasksStore.deleteExistingTask(props.task)
  tasksStore.fetchAllTasks()
}

// Function to format timestamp
const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const getIconClass = () => {
  if (props.task.is_complete) {
    return 'fa-check-circle text-green-500'
  } else {
    return 'fa-check-circle text-gray-500'
  }
}

// Emit event to open edit modal
const openEditModal = () => {
  // Emit event with the task data
  emit('editTask', props.task)
}
</script>

<style scoped>
</style>
