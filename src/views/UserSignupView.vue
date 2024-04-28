<script setup>
import { useUserStore } from '@/stores/userStore'
import { useVuelidate } from '@vuelidate/core'
import { required, email, sameAs, minLength } from '@vuelidate/validators'
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'

const userStore = useUserStore()
const router = useRouter()

const form = reactive({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
})

// Define form validation rules
const rules = computed(() => {
  return {
    email: { required, email }, // Email is required and must be a valid email address
    password: { required, minLength: minLength(6) }, // Password is required
    confirmPassword: { required, sameAsPassword: sameAs(form.password) } // Password confirmation is required
  }
})

// Initialize vuelidate with form and rules
const v$ = useVuelidate(rules, form)

// Initialize confirmationSent flag
const confirmationSent = ref(false)

const formIsValid = ref(true) // Track the form validity
// Function to handle sign-up submission
async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  formIsValid.value = result // Update form validity
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    formIsValid.value = false
  } else {
    // If the form is valid, perform some action with the form data
    await signUp()
  }
}

// Function to sign up the user
async function signUp() {
  await userStore.createUser(form.email, form.password, form.name)
  confirmationSent.value = true
}

// Function to redirect to the home page
function redirectToHome() {
  router.push('/')
}
</script>

<template>
  <div class="container mx-auto">
    <!-- Sign-up form -->
    <div v-if="!confirmationSent">
      <h1 class="text-2xl font-semibold mt-8">Sign up for to DoToo</h1>
      <form class="mt-4" @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label for="name" class="block">Name (Optional)</label>
          <input type="text" id="name" v-model="form.name" class="w-full border p-2" />
        </div>
        <div class="mb-4">
          <label for="email" class="block">Email *</label>
          <input type="text" id="email" v-model="form.email" class="w-full border p-2" />
          <span v-if="v$.email.$error" class="text-red-500 text-sm">
            {{ v$.email.$errors[0].$message }}
          </span>
        </div>
        <div class="mb-4">
          <label for="password" class="block">Password *</label>
          <input type="password" id="password" v-model="form.password" class="w-full border p-2" />
          <span v-if="!v$.password.$error && !v$.password.$errors.length" class="text-gray-500 text-sm"
>Minimum 6 characters</span
          >
          <span v-if="v$.password.$error" class="block text-red-500 text-sm"
            >{{ v$.password.$errors[0].$message }}</span
          >
        </div>
        <div class="mb-4">
          <label for="confirm-password" class="block">Repeat password *</label>
          <input
            type="password"
            id="confirm-password"
            v-model="form.confirmPassword"
            class="w-full border p-2"
          />
          <span v-if="v$.confirmPassword.$error" class="block text-red-500 text-sm"
            >{{ v$.confirmPassword.$errors[0].$message }}</span
          >
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2">Sign up</button>
        <span v-if="!formIsValid" class="block text-red-500 text-sm">Fix the errors and try again</span>
      </form>
      <span class="block mt-4">
        Already have an account?<router-link to="/login" class="text-blue-500">Log in</router-link>
      </span>
    </div>

    <!-- Success message -->
    <div v-if="confirmationSent" class="mt-8">
      <h2 class="text-xl font-semibold">Check your inbox</h2>
      <p class="text-sm mt-2">
        We sent an email to {{ form.email }}. Open the link in the email to verify your account and
        start using DoToo.
      </p>
      <button @click="redirectToHome" class="bg-blue-500 text-white px-4 py-2 mt-4">
        Go back home
      </button>
    </div>
  </div>
</template>

<style scoped></style>