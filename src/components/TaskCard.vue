<script setup>
import { defineProps } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const _handleTaskCompletion = async () => {
  task.is_complete = !task.is_complete
  tasksStore.updateExistingTask(task)
}

const { task } = props

const _deleteTask = async () => {
  await tasksStore.deleteExistingTask(task)
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
      <input type="checkbox" v-model="task.is_complete" @change="_handleTaskCompletion" class="form-checkbox h-5 w-5 text-blue-500">
    </div>
    <div class="flex justify-between">
      <div class="text-sm text-gray-700">Created on: {{ formatTimestamp(task.inserted_at) }}</div>
      <button @click="_deleteTask()" class="text-red-500">Delete</button>
    </div>
  </div>
</template>

<style scoped>

/* .card-container {
  width: 100%;
  display: flex;
  overflow: auto;
  align-items: center;
  flex-direction: column;
}
.card-card {
  gap: 12px;
  width: 392px;
  height: auto;
  display: flex;
  padding: 16px;
  overflow: hidden;
  box-shadow: 0px 4px 6px -4px rgba(0, 0, 0, 0.10000000149011612);
  align-items: flex-start;
  border-radius: 8px;
  flex-direction: column;
  background-color: rgb(110, 178, 245);
}
.card-heading {
  gap: 207px;
  width: 352px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  justify-content: space-between;
}
.card-title {
  gap: 10px;
  width: 125px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  justify-content: space-between;
}
.card-text {
  color: rgba(17, 24, 39, 1);
  width: 125px;
  height: auto;
  font-size: 18px;
  font-style: SemiBold;
  text-align: left;
  font-family: Roboto;
  font-weight: 600;
  line-height: 28px;
  font-stretch: normal;
  text-decoration: none;
}
.card-completedcheckbox {
  gap: 10px;
  height: 20px;
  display: flex;
  align-items: flex-start;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
}
.card-text2 {
  color: rgba(37, 99, 235, 1);
  width: 20px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
}
.card-body {
  display: flex;
  align-items: center;
}
.card-text4 {
  color: rgba(55, 65, 81, 1);
  width: 89px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
}
.card-timestamp {
  gap: 10px;
  display: flex;
  align-items: center;
}
.card-text6 {
  color: rgba(55, 65, 81, 1);
  width: 184px;
  height: auto;
  font-size: 16px;
  font-style: Regular;
  text-align: left;
  font-family: Roboto;
  font-weight: 400;
  line-height: 24px;
  font-stretch: normal;
  text-decoration: none;
} */
</style>
