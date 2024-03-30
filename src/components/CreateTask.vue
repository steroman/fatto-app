<script setup>
// import { supabase } from '@/lib/supabaseClient'
import { ref } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'

const tasksStore = useTasksStore()

const props = defineProps(['account'])
const userId = props.account.data.session.user.id
const taskTitle = ref('')
const date = new Date()
const formattedDate = date.toISOString().split('.')[0].replace('T', ' ')

const _createTask = async () => {
  const task = {
    title: taskTitle.value,
    inserted_at: formattedDate,
    user_id: userId
  }

  await tasksStore.createNewTask(task)
  tasksStore.fetchTasks()
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
