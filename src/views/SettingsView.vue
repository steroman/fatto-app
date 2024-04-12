<script setup>
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/stores/userStore'
import { useRouter } from 'vue-router'

const router = useRouter()

const userStore = useUserStore()


const { hideCompletedSetting } = storeToRefs(userStore)

const newHideCompletedSetting = ref(hideCompletedSetting.value)

const logOut = async () => {
  await userStore.signOut()
  router.push('/login')
}

</script>


<template>
  <main class="container mx-auto">
    <h1 class="text-3xl font-semibold mb-4">Settings</h1>
    <button><router-link to="/tasks" class="mt-4 bg-blue-500 text-white px-4 py-2 rounded">Back to Tasks</router-link></button>
    <button @click="logOut()" class="mt-4 bg-red-500 text-white px-4 py-2 rounded">Logout</button>
    <div class="mt-8">
      <div class="flex items-center mb-4">
        <input type="checkbox" class="toggle toggle-accent mr-2" id="hideCompleted" v-model="newHideCompletedSetting" @change="userStore.updateUserHideCompletedSetting(newHideCompletedSetting)">
        <label for="hideCompleted" class="text-lg cursor-pointer">Hide completed tasks</label>
      </div>
      <!-- Add more settings elements here -->
    </div>
  </main>
</template>

<style scoped>

</style>