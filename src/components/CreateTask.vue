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
  <div>
    <label>
      Task title:
      <input type="text" v-model="taskTitle" />
    </label>
    <button @click="_createTask()">Add task</button>
  </div>
</template>

<style scoped></style>
