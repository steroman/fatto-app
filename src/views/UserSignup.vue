<script setup>
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

const userStore = useUserStore()

// const signIn = () => {
//   userStore.signIn(form.email, form.password)
// }

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

const signUp = async () => {
  await userStore.createUser(form.email, form.password)
  // router.push('/tasks')
}

async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('The form has errors')
  } else {
    signUp()
  }
  // If the form is valid, perform some action with the form data
}

</script>
<template>
    <div class="container mx-auto">
        <h1 class="text-2xl font-semibold mt-8">Sign Up for to TooDoo</h1>
        <form class="mt-4" @submit.prevent="handleSubmit">
        <div class="mb-4">
            <label for="name" class="block">Name</label>
            <input type="text" id="name" v-model="form.name" class="w-full border p-2">
        </div>
        <div class="mb-4">
            <label for="email" class="block">Email</label>
            <input type="text" id="email" v-model="form.email" class="w-full border p-2">
            <span v-if="v$.email.$error">{{ v$.email.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
            <label for="password" class="block">Password</label>
            <input type="password" id="password" v-model="form.password" class="w-full border p-2">
            <span v-if="v$.password.$error">{{ v$.password.$errors[0].$message }}</span>
        </div>
        <div class="mb-4">
            <label for="confirm-password" class="block">Repeat password</label>
            <input type="password" id="confirm-password" v-model="form.confirmPassword" class="w-full border p-2">
            <span v-if="v$.confirmPassword.$error">{{ v$.confirmPassword.$errors[0].$message }}</span>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Sign up</button>
        </form>
        <p class="mt-4">Already have an account?<router-link to="/login" class="text-blue-500">Log in</router-link></p>
    </div>
</template>

<style scoped>
</style>