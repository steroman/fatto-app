<script setup>
import { useUserStore } from '@/stores/userStore'
import { computed, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'

const userStore = useUserStore()

const createUser = () => {
  userStore.createUser(form.email, form.password)
}

const signIn = () => {
  userStore.signIn(form.email, form.password)
}

const seeUser = () => {
  userStore.seeUser()
}

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

const rules = computed(() => {
  return {
    // name: { required }, // Name is required
    email: {
      required, // Email is required
      email // Must be a valid email address
    },
    password: { required }, // Password is required
    confirmPassword: {
      required, // Password confirmation is required
      sameAs: sameAs(form.password) // Must match the value of the entered password
    }
  }
})

const v$ = useVuelidate(rules, form)

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
   }
  // If the form is valid, perform some action with the form data
  alert('Form submitted successfully')
}
// Form is valid. Proceed with your form submission.
</script>

<template>
  <h1>Welcome to IH Todo List</h1>
  <form @submit.prevent="handleSubmit">
    <div>
      <label for="name"
        >Name:
        <input type="text" id="name" v-model="form.name" placeholder="Your name…" />
      </label>
    </div>
    <div>
      <label for="email"
        >Email:
        <input type="email" id="email" v-model="form.email" />
      </label>
      <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="password"
        >Password: <input type="password" id="password" v-model="form.password"
      /></label>
      <span v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
    </div>
    <div>
      <label for="confirm-password"
        >Confirm password:
        <input type="password" id="confirm-password" v-model="form.confirmPassword"
      /></label>
      <span v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</span>
    </div>
    <div>
      <button @click="createUser()" type="submit">Create account</button>
      <button @click="signIn()">Login</button>
      <button @click="seeUser()">See user</button>
    </div>
  </form>
</template>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
