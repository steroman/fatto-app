<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import CreateTask from '@/components/CreateTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()

// const account = ref(null)
const tasksStore = useTasksStore()
const { tasks } = storeToRefs(tasksStore)
const userStore = useUserStore()

const { user } = storeToRefs(userStore)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

onMounted(() => {
  tasksStore.fetchAllTasks()
})
</script>

<template>
  <main>
    <h1>Tasks view</h1>
    <template v-if="user">
      <CreateTask />
    </template>
    <template v-if="tasks && tasks.length">
      <span>Total tasks: {{ tasks.length }}</span>
      <div clas="tasks-container">
        <TaskCard v-for="task in tasks" :key="task.id" :task="task" />
      </div>
    </template>
    <template v-else>
      <p v-if="!user">Loading account information...</p>
      <p v-else-if="!tasks">Loading tasks...</p>
      <p v-else>No tasks available.</p>
    </template>
    <button @click="logOut()">Logout</button>
  </main>
</template>

<style scoped></style>
