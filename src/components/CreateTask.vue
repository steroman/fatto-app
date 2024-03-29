<script setup>
// import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const taskTitle = ref('')

const _createTask = () => {
  const task = {
    title: taskTitle.value,
    inserted_at: Date.now()
  }

  tasksStore.createNewTask(task)
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
