<script setup>
// Importing the useTasksStore from the tasksStore file
import { useTasksStore } from '@/stores/tasksStore'

// Defining props, in this case, a single prop called 'task'
const props = defineProps({
  task: {
    // The task prop is of Object type and is required
    type: Object,
    required: true
  }
})

// Function to format the title of the task for display
const formatTitle = (title) => {
  return title.length > 12 ? `${title.substring(0, 12)} …` : title
}

// Defining custom events to be emitted by the component, in this case, an 'edit' event
const emit = defineEmits(['edit'])

// Using the useTasksStore function to create a tasksStore object
const tasksStore = useTasksStore()

// Function to handle the completion of a task
const handleTaskCompletion = async () => {
  // Creating a new task object with the is_complete property toggled
  const taskToUpdate = {
    ...props.task,
    is_complete: !props.task.is_complete
  }
  // Updating the existing task in the tasks store
  await tasksStore.updateExistingTask(taskToUpdate)
}

// Function to delete the task
const deleteTask = async () => {
  // Deleting the existing task from the tasks store
  await tasksStore.deleteExistingTask(props.task)
  // Fetching all tasks again to update the task list
  tasksStore.fetchAllTasks()
}

// Function to format the timestamp of the task for display
// Parsing the timestamp into a human-readable date and time format
// (month, day, year, hour, minute, AM/PM)
// Example output: "Sep 28, 2021 at 3:45 pm"
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp)
  const monthShort = date.toLocaleString('en-US', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const amPm = hour < 12 ? 'am' : 'pm'
  const formattedHour = hour % 12 === 0 ? 12 : hour % 12
  const formattedMinute = String(minute).padStart(2, '0')
  return `${monthShort} ${day}, ${year} at ${formattedHour}:${formattedMinute} ${amPm}`
}
// Function to open the edit modal for the task
const openEditModal = () => {
  // Emitting the 'edit' event with the task as the payload
  emit('edit', props.task)
}
</script>

<template>
  <div
    :class="[
      // Conditional class based on whether the task is complete or not
      'bg-white dark:bg-gray-600 dark:hover:shadow-gray-400 dark:shadow-sm rounded-md shadow-md hover:shadow-xl px-4 py-5 h-fit',
      task.is_complete ? 'line-through opacity-50' : ''
    ]"
  >
    <div class="flex flex-row justify-between">
      <div
        class="text-primary font-semibold text-lg text-left max-w-taskWrap1 break-words hyphens-auto"
      >
        {{ formatTitle(task.title) }}
        <!-- Displaying the formatted title of the task -->
      </div>
      <div class="space-x-1 min-w-20">
        <!-- Button to open the edit modal for the task -->
        <button
          @click="openEditModal"
          :class="[
            'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-1',
            task.is_complete ? 'text-gray-500' : 'text-primary hover:text-hover'
          ]"
        >
          <i class="material-icons">edit</i>
        </button>
        <!-- Button to mark the task as complete or incomplete -->
        <button
          @click="handleTaskCompletion"
          :class="[
            'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-1',
            task.is_complete ? 'text-gray-500' : 'text-primary hover:text-hover'
          ]"
        >
          <i class="material-icons">task_alt</i>
        </button>
      </div>
    </div>
    <div class="flex flex-row justify-between">
      <div class="font-medium text-sm self-end w-10/12 text-wrap break-words text-left">
        <!-- Displaying the formatted creation timestamp of the task -->
        Created on {{ formatTimestamp(task.inserted_at) }}
      </div>
      <div class="flex items-end">
        <!-- Button to delete the task -->
        <button
          @click="deleteTask"
          :class="[
            'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-1 mr-1',
            task.is_complete ? 'text-gray-500' : 'text-primary hover:text-hover'
          ]"
        >
          <i class="material-icons">delete</i>
        </button>
      </div>
    </div>
  </div>
</template>
