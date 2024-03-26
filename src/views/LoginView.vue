<script setup>
import { useUserStore } from '@/stores/userStore'
import { ref } from 'vue'

const userStore = useUserStore()

// const { createUser, login, logout } = userStore
const email = ref('')
const password = ref('')
// const firstName = ref('')

const createUser = () => {
  userStore.createUser(email.value, password.value)
}

const signIn = () => {
  userStore.signIn(email.value, password.value)
}

const seeUser = () => {
  userStore.seeUser()
}

const signOut = () => {
  userStore.signOut()
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
    <button @click="createUser()">Create account</button>
    <button @click="signIn()">Login</button>
    <button @click="signOut()">Logout</button>
    <button @click="seeUser()">See user</button>
  </div>
</template>

<style scoped></style>
