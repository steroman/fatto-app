<script setup>
import { onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import { storeToRefs } from 'pinia'
import CreateTask from '@/components/CreateTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import SortTasks from '@/components/SortTasks.vue'

const router = useRouter()
const tasksStore = useTasksStore()
const { taskSortered } = storeToRefs(tasksStore)
const userStore = useUserStore()
const { user } = storeToRefs(userStore)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

onMounted(async () => {
  await tasksStore.fetchAllTasks()
  await userStore.fetchUserSortingPreference()
})
</script>

<template>
  <main class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">Your tasks</h1>
    <template v-if="user">
      <CreateTask />
    </template>
    <template v-if="taskSortered && taskSortered.length">
      <p class="mb-2">Total tasks: {{ taskSortered.length }}</p>
      <div class="sorting-tools flex justify-between">
        <SortTasks />
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <TaskCard v-for="task in taskSortered" :key="task.id" :task="task" />
      </div>
    </template>
    <template v-else>
      <p v-if="!user">Loading account information...</p>
      <p v-else-if="!taskSortered">Loading tasks...</p>
      <p v-else>No tasks available.</p>
    </template>
    <button @click="logOut()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
  </main>
</template>


<style scoped>

</style>
