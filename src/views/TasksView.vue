<script setup>
import { ref, onMounted } from 'vue'
import { useTasksStore } from '@/stores/tasksStore'
import CreateTask from '@/components/CreateTask.vue'
import TaskCard from '@/components/TaskCard.vue'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'
import SortTasks from '@/components/SortTasks.vue'
import { storeToRefs } from 'pinia'

const router = useRouter()
const tasksStore = useTasksStore()
const userStore = useUserStore()

const { taskSortered } = storeToRefs(tasksStore)
const { user, hideCompletedSetting } = storeToRefs(userStore)

const newHideCompletedSetting = ref(hideCompletedSetting.value)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

onMounted(async () => {
  await userStore.fetchUserHideCompletedSetting()
  await userStore.fetchUserSortingPreference()
  await tasksStore.fetchAllTasks()
  console.log('tasks ----> ', taskSortered)
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
    <button><router-link to="/settings" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Settings</router-link></button>
    <div class="flex flex-col">
      <div class="form-control w-52">
        <label class="cursor-pointer label">
          <span class="label-text">Hide completed tasks</span> 
          <input type="checkbox" class="toggle toggle-accent" v-model="newHideCompletedSetting" @change="userStore.updateUserHideCompletedSetting(newHideCompletedSetting)" />
        </label>
      </div>
    </div>
  </main>
</template>

<style scoped>

</style>
