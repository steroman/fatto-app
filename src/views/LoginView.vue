<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

// const { createUser, login, logout } = userStore
const email = ref('')
const password = ref('')
// const firstName = ref('')

const createUser = () => {
  userStore.createNewAccount(email.value, password.value)
}
</script>

<template>
  <h1>Welcome to IH Todo List</h1>
  <div class="inputContainer">
    <label for="email">Email:</label>
    <input type="email" id="email" v-model="email" />
  </div>

  <div class="inputContainer">
    <label for="password">Password:</label>
    <input type="password" id="password" v-model="password" />
  </div>
  <!-- 
  <div class="inputContainer">
    <label for="firstName">First name</label>
    <input type="firstName" id="firstName" v-model="firstName" />
  </div> -->

  <div class="buttonContainer">
    <button @click="createUser()">Create</button>
    <button @click="login">Login</button>
    <button @click="logout">Logout</button>
  </div>
</template>

<style scoped></style>
