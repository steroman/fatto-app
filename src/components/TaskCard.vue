<template>
  <div
    :class="[
      'bg-white dark:bg-gray-600 dark:hover:shadow-gray-400 dark:shadow-sm rounded-md shadow-md hover:shadow-xl px-4 py-5 h-fit',
      task.is_complete ? 'line-through opacity-50' : ''
    ]"
  >
    <div class="flex flex-row justify-between">
      <div
        class="text-primary font-semibold text-lg text-left max-w-taskWrap1 break-words hyphens-auto"
      >
        {{ formatTitle(task.title) }}
      </div>
      <div class="space-x-1 min-w-20">
        <button
          @click="openEditModal"
          :class="[
            'bg-transparent hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-1',
            task.is_complete ? 'text-gray-500' : 'text-primary hover:text-hover'
          ]"
        >
          <i class="material-icons">edit</i>
        </button>
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
        Created On : {{ formatTimestamp(task.inserted_at) }}
      </div>
      <div class="flex items-end">
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

<script setup>
import { useTasksStore } from '@/stores/tasksStore'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const formatTitle = (title) => {
  return title.length > 15 ? `${title.substring(0, 15)} ...` : title
}

const emit = defineEmits(['edit'])

const tasksStore = useTasksStore()

const handleTaskCompletion = async () => {
  const taskToUpdate = {
    ...props.task,
    is_complete: !props.task.is_complete
  }
  await tasksStore.updateExistingTask(taskToUpdate)
}

const deleteTask = async () => {
  await tasksStore.deleteExistingTask(props.task)
  tasksStore.fetchAllTasks()
}

const formatTimestamp = (timestamp) => {
  return new Date(timestamp).toLocaleString()
}

const openEditModal = () => {
  emit('edit', props.task)
}
</script>
